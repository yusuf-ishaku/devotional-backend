const http = require('http');
require('dotenv').config();
const app = require('./app');
const mongoConnect = require('./services/mongo').mongoConnect;
const job = require('./models/devotional.model')
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
async function startServer(){
    mongoConnect();
    job;
    server.listen(PORT,
        () => console.log(`Port started at ${PORT}`)
    );
};

startServer();