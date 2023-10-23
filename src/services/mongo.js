const mongoose = require('mongoose');
// require('dotenv').config();

// Update below to match your own MongoDB connection string.
const MONGO_URL = "mongodb+srv://kingshakzy:Dfsuw2oDl1XjkOJa@devotionals.g2jvmwo.mongodb.net/?retryWrites=true&w=majority";

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (err) => {
  console.error(err);
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
}