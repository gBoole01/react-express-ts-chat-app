import express from 'express'
import { createServer, Server as HttpServer } from 'http'
import { Server } from 'socket.io'

export default class App {
  public app: express.Application
  private port: number
  private server: HttpServer
  private io: Server

  constructor(port: number) {
    this.app = express()
    this.server = createServer(this.app)
    this.io = new Server(this.server, {
      cors: { origin: 'http://localhost:5173', credentials: true },
    })
    this.port = port
  }

  public listenWebsocket() {
    console.log(`⌛ Initializing Websocket Listeners..`)

    this.io.on('connection', (socket) => {
      const id = socket.handshake.auth.id as string
      socket.join(id)
      console.log(`👤 User #${id} is connected`)

      socket.on(
        'send-message',
        ({ recipients, text }: { recipients: string[]; text: string }) => {
          recipients.forEach((recipient) => {
            const newRecipients = recipients.filter((r) => r != recipient)
            newRecipients.push(id)
            socket.broadcast.to(recipient).emit('receive-message', {
              recipients: newRecipients,
              sender: id,
              text,
            })
          })
          console.log(`👤 User #${id} sent a message`)
        },
      )
    })
  }

  public listen() {
    this.server.listen(this.port, () => {
      console.log(`✅ App listening on the port ${this.port}`)
    })
  }
}
