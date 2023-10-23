const http = require('http');
const app = require('./app');
const mongoConnect = require('./services/mongo').mongoConnect;
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
async function startServer(){
    mongoConnect();
    server.listen(PORT,
        () => console.log(`Port started at ${PORT}`)
    );
};

startServer();