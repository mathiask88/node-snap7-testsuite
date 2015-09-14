/*
 * Copyright (c) 2015, Mathias Küsel
 * MIT License <https://github.com/mathiask88/node-snap7-testsuite/blob/master/LICENSE>
 */

/**
 * Module dependencies.
 */
    // Node core
var m_http = require('http');
var m_path = require('path');
    // Express + middleware
var m_express = require('express');
var m_compress = require('compression')();
    // Socket.IO
var m_socketio = require('socket.io');
    // Custom
var m_socketEvents = require('./socketEvents.js');
var m_routes = require('./routes.js');


/**
 * Config/Constants
 */
var HTTP_PORT = process.env.PORT || 8080;

/**
 * Initialize variables
 */
var app = m_express();
var server = m_http.createServer(app);
var io = m_socketio(server);

/**
 * Express config
 */
app.set('view engine', 'jade');
app.set('views', m_path.join(__dirname, 'views'));

app.use(m_compress);
app.use('/inc', m_express.static(m_path.join(__dirname, 'inc')));

/**
 * Implement Routing
 */
app.get('/', m_routes.index);
app.get('/systemInfo', m_routes.systemInfo);
app.get('/dataRW', m_routes.dataRW);
app.get('/scanDevices', m_routes.scanDevices);

/**
 * Socket.io event handling
 */
io.on('connection', m_socketEvents.onConnect);

/**
 * Start HTTP server on specific port
 */
server.listen(HTTP_PORT, function() {
  console.log('Webserver running on port ' + HTTP_PORT);
});
