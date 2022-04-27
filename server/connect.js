const mongoose = require('mongoose');
const URI = process.env.DATABASE;

function connect() {
  mongoose.connect(URI);
  mongoose.connection.once('open', () => {});
  mongoose.connection.on('error', () => {});
}

function close() {
  mongoose.connection.close()
}

module.exports = { connect, close }