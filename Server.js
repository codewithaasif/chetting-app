const { Socket } = require('dgram')
const express = require('express')
const app = express()
const http = require('http').createServer(app)


app.use(express.static(__dirname + '/public'))

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html')
})

//socket
const io = require('socket.io')(http)

io.on('connection', (Socket)=>{
    console.log('connected.....')
    
    Socket.on('message',(msg)=>{
        Socket.broadcast.emit('message',msg)
    })
})

const port = process.env.port || 4000;
http.listen(port,()=>console.log(`the server is started on port ${port}`))