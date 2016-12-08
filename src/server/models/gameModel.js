// jshint esversion: 6
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

module.exports = mongoose.model('Game', new Schema({
    playerOneName: String,
    playerTwoName: String,
    createdOn: {type: Date, default: Date.now},
    lastModified: Date
}));

// let gameSchema = new Schema({
//     playerOneName: String,
//     playerTwoName: String,
//     createdOn: {type: Date, default: Date.now},
//     lastModified: Date
// });
//
// module.exports = mongoose.model('Game', gameSchema);