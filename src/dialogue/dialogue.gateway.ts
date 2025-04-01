import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets'
  import { Server, Socket } from 'socket.io'
  import { DialogueService } from './dialogue.service'
  
  @WebSocketGateway({ cors: true })
  export class DialogueGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private onlineUsers = new Map<string, Socket>()
  
    constructor(private readonly dialogueService: DialogueService) {}
  
    handleConnection(client: Socket) {
      const userId = client.handshake.query.userId as string
      if (userId) {
        this.onlineUsers.set(userId, client)
      }
    }
  
    handleDisconnect(client: Socket) {
      const userId = [...this.onlineUsers.entries()].find(([, sock]) => sock === client)?.[0]
      if (userId) this.onlineUsers.delete(userId)
    }
  
    @SubscribeMessage('sendMessage')
    async handleSendMessage(
      @MessageBody()
      payload: {
        dialogueId: string
        senderId: string
        content: string
      },
      @ConnectedSocket() client: Socket,
    ) {
      const message = await this.dialogueService.sendMessage(
        payload.dialogueId,
        payload.senderId,
        payload.content,
      )
  
      client.broadcast.emit('newMessage', message)
      client.emit('newMessage', message)
      const dialogues = await this.dialogueService.getUserDialogues(payload.senderId)
      client.emit('dialoguesList', dialogues)
      
      const dialogue = await this.dialogueService.getDialogueById(payload.dialogueId)

      if (!dialogue) {
        console.warn('Диалог не найден')
        return
      }
      // client.broadcast.emit('dialoguesList', dialogues)
      const recipientId =
        dialogue.user1Id === payload.senderId ? dialogue.user2Id : dialogue.user1Id 
  
        
      const recipientSocket = this.onlineUsers.get(recipientId)
      //console.log(recipientSocket)
      if (recipientSocket) {
        recipientSocket.emit('newMessage', message)
       // console.log(message)
        const dialogues = await this.dialogueService.getUserDialogues(recipientId)
        recipientSocket.emit('dialoguesList', dialogues)
      }
  
      client.emit('message_sent', message)
    }
    @SubscribeMessage('getUserDialogues')
    async handleGetDialogues(@MessageBody() data: { userId: string }, @ConnectedSocket() client: Socket) {
    const dialogues = await this.dialogueService.getUserDialogues(data.userId)
    client.emit('dialoguesList', dialogues)
    }

  
    @SubscribeMessage('mark_read')
    async handleMarkAsRead(
      @MessageBody()
      payload: {
        dialogueId: string
        readerId: string
      },
    ) {
      await this.dialogueService.markMessagesAsRead(payload.dialogueId, payload.readerId)
      const dialogue = await this.dialogueService.getDialogueById(payload.dialogueId)
      if (!dialogue) return
    
      const senderId = dialogue.user1Id === payload.readerId ? dialogue.user2Id : dialogue.user1Id
      const senderSocket = this.onlineUsers.get(senderId)
    
      if (senderSocket) {
        senderSocket.emit('messageRead', {
          dialogueId: payload.dialogueId,
        })
      }
    }

    @SubscribeMessage('getMessages')
async handleGetMessages(
  @MessageBody() data: { dialogueId: string },
  @ConnectedSocket() client: Socket,
) {
  try {
    const messages = await this.dialogueService.getDialogueMessages(data.dialogueId)
    client.emit('messagesList', messages)
  } catch (e) {
    console.error('Ошибка при получении сообщений:', e)
    client.emit('messagesList', [])
  }
}
  }
  