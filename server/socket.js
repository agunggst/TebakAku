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
                console.log('masuktidakerr')
                socket.emit('gotoRoom', {
                    ...result,
                    playerKey: `1-${data_room.roomMaster}`,
                    isCreator: true
                })
            } else {
                // console.log('masukerr')
                // socket.emit('shootError', err)
            }
        })
    })

    socket.on('joinRoom', (payload) => {
        RoomController.joinRoom(payload, (err, result) => {
            if (!err) {
                socket.join(result.data.name)
                // io.to(result.data.name).emit('new-player', result.data.player)
                socket.emit('gotoRoom', result.data)
            } else {
                socket.emit('shootError', err)
            }
        })
    })
})