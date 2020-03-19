'use strict';
module.exports = (sequelize, DataTypes) => {
  class Room extends sequelize.Sequelize.Model {}

  Room.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Nama Room Tidak Boleh Kosong"
        },
        len: {
          args: [4, 12],
          msg: "Nama Room Harus 4 Sampai 12 Character"
        }
      }
    },
    player: {
      type: DataTypes.JSON,
      validate: {
        maxSixPlayer: (player) => {
          if (Object.keys(player).length > 6) {
            throw new Error('Maksimum 6 Player')
          }
        }
      }
    }
  }, {
    sequelize
  })

  Room.associate = function (models) {
    // associations can be defined here
  };
  return Room;
};