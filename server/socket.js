const io = require('./app')
const RoomController = require('./controllers/RoomController')

io.on('connection', function (socket) {
    console.log('Connection start')

    socket.on('createRoom', (payload) => {
        let data_room = {
            name: payload.name,
            roomMaster: payload.creator
        }
        RoomController.createRoom(data_room, function (err, result) {
            if (!err) {
                socket.join(result.name)
                socket.emit('gotoRoom', {
                    ...result,
                    playerKey: `1-${data_room.roomMaster}`,
                    isCreator: true
                })
            } else {
                socket.emit('shootError', err)
            }
        })
    })

    socket.on('joinRoom', (payload) => {
        RoomController.joinRoom(payload, (err, result) => {
            if (!err) {
                socket.join(result.name)
                // io.to(result.data.name).emit('new-player', result.data.player)
                console.log(result, 'ini result dari socket')
                socket.emit('gotoRoom', result)
            } else {
                socket.emit('shootError', err)
            }
        })
    })

    socket.on('newClue', (clue) => {
        socket.broadcast.emit('newClue', clue)
    })
})