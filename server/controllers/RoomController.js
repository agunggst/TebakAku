const {
    Room
} = require('../models');
const roomCoder = require('../helpers/roomCoder');

class RoomController {
    static createRoom(roomData, callback) {
        let data_room = {
            name: roomData.name,
            player: {
                [`1-${roomData.roomMaster}`]: 0
            },
            room_code: roomCoder(8)
        };

        Room.create(data_room)
            .then(result => {
                callback(null, result.dataValues);
            })
            .catch(err => {
                callback({
                        status_code: 400,
                        message: 'Failed Creating Room'
                    },
                    null
                );
            });
    }

    static deleteRoom(room_code, callback) {
        Room.destroy({
                where: {
                    room_code
                }
            })
            .then(result => {
                callback(null, {
                    message: 'Success Deleting Room'
                });
            })
            .catch(err => {
                callback({
                        status_code: 400,
                        message: 'Failed Deleting Room'
                    },
                    null
                );
            });
    }

    static joinRoom(payload, callback) {

        let playerKey;
        Room.findOne({
                where: {
                    room_code: payload.room_code
                }
            })
            .then(result => {
                if (result) {
                    let idx = Object.keys(result.player).length;
                    playerKey = `${idx + 1}-${payload.playerName}`;
                    result.player[playerKey] = 0;
                    result.changed('player', true);

                    return result.save();
                } else {
                    throw {
                        status_code: 404,
                        message: 'Room Not Found'
                    };
                }
            })
            .then(result => {
                let data_result = result.dataValues
                callback(null, {
                    ...data_result,
                    playerKey
                });
            })
            .catch(err => {
                callback(err, null);
            });
    }

    static leaveRoom(payload, callback) {
        let room_code = payload.room_code;
        let playerKey = payload.playerKey;
        Room.findOne({
                where: {
                    room_code
                }
            })
            .then(result => {
                if (result) {
                    delete result.player[playerKey];
                    result.changed('player', true);

                    return result.save();
                } else {
                    throw {
                        status_code: 404,
                        message: 'Room Not Found'
                    };
                }
            })
            .then(result => {
                callback(null, result.dataValues);
            })
            .catch(err => {
                callback({
                        status_code: 400,
                        message: 'Failed Leaving Room'
                    },
                    null
                );
            });
    }
}

module.exports = RoomController;