const { default: users } = require('./fakeDB/users')

const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const port = 8000

const usersDB = require('./fakeDB/users')()
const Message = require('./models/messages')

io.on('connection', (socket) => {
  console.log(`> New connection ${socket.id}`)

  socket.on('createUser', (user) => {
    console.log(`> Create user: ${user.name}`)
    usersDB.addUser({
      ...user,
      id: socket.id,
    })

    return { id: socket.id }
  })

  socket.on('joinRoom', ({ name, room }) => {
    console.log(`> ${socket.id}:${name} join to ${room}`)
    socket.join(room)
    io.to(room).emit('updateUsers', usersDB.getUsersByRoom(room))
    socket.emit('newMessage', new Message('admin', `Bem-vindo, ${name}`))
    socket.broadcast
      .to(room)
      .emit('newMessage', new Message('admin', `${name} entrou no chat`))
  })

  socket.on('createMessage', ({ id, msg }) => {
    console.log(`> Create message ${socket.id}`)
    const user = usersDB.getUser(id)
    if (user) {
      io.to(user.room).emit('newMessage', new Message(user.name, msg, id))
    }
  })

  socket.on('setTypingStatus', ({ room, typingStatus, id }) => {
    usersDB.setTypingStatus(id, typingStatus)
    io.to(room).emit('updateUsers', usersDB.getUsersByRoom(room))
  })

  const exitEvents = ['leftChat', 'disconnect']

  exitEvents.forEach((event) => {
    socket.on(event, () => {
      console.log(`> Disconnect: ${socket.id}`)
      const id = socket.id
      const user = usersDB.getUser(id)
      if (!user) return
      const { room, name } = user
      usersDB.removeUser(id)
      socket.leave(room)
      io.to(room).emit('updateUsers', usersDB.getUsersByRoom(room))
      io.to(room).emit('newMessage', new Message('admin', `${name} saiu.`))
    })
  })

  socket.on('updateWarzone', ({ text, room }) => {
    console.log(`Warzone: ${room}: ${text}`)
    socket.broadcast.to(room).emit('warzoneUpdated', text)
  })

  socket.on('stream', function ({ data, room }) {
    socket.broadcast.to(room).emit('stream', data)
  })
})

server.listen(port, () => {
  console.info(
    `\x1b[40m`,
    `\x1b[32m`,
    `
    ]======[ Server Started at port ${port} ]======[
      
     __   __   _______   _______   _______   ___   _______   ______ 
    |  |_|  | |   _   | |   _   | |   _   | |   | |       | |      \\
    |       | |  |_|  | |  |_|  | |  |_|  | |   | |    ___| |   _   |
    |       | |       | |     __| |     __| |   | |   |___  |  |_|  |
    |       | |       | |    |__  |    |__  |   | |    ___| |       |
    | ||_|| | |   _   | |   _   | |   _   | |   | |   |___  |       |
    |_|   |_| |__| |__| |__| |__| |__| |__| |___| |_______| |______/
     _______  _______  __   __   _______   _______   
    |       ||   _   ||  |_|  | |       | |       | 
    |    ___||  |_|  ||       | |    ___| |    ___|  
    |   | __ |       ||       | |   |___  |   |___  
    |   ||  ||       ||       | |    ___| |___    | 
    |   |_| ||   _   || ||_|| | |   |___   ___|   | 
    |_______||__| |__||_|   |_| |_______| |_______| 

    `,
  )
})
