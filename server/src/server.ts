import App from './app'

const app = new App(5000)

app.listenWebsocket()
app.listen()
