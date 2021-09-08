const express = require('express');
const app = express();
const server = require('http').createServer(app);
const ioServer = require("socket.io")(server);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(`${__dirname}/public`));

module.exports = {ioServer, app, server};