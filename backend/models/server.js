// Server express require
const express  = require('express');
const http     = require('http');
const socketio = require('socket.io');
const path     = require('path');
const cors     = require('cors');

const Sockets  = require('./sockets');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {

        this.app  = express();
        this.port = process.env.PORT;

        // connect Database
        dbConnection();

        // Http server
        this.server = http.createServer( this.app );
        
        // Config  sockets
        this.io = socketio( this.server, { /* configuraciones */ } );
    }

    middlewares() {
        // deployment directory public
        this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );

        // CORS
        this.app.use( cors() );

        
        // Pars body
        this.app.use( express.json() );

        // API End Points
        this.app.use( '/api/login', require('../router/auth') );
        this.app.use( '/api/mensajes', require('../router/mensajes') );
    }

  
    configurarSockets() {
        new Sockets( this.io );
    }

    execute() {

        // initialize -Middlewares
        this.middlewares();

        // initialize-sockets
        this.configurarSockets();

        // initialize- Server
        this.server.listen( this.port, () => {
            console.log('Server corriendo en puerto:', this.port );
        });
    }

}


module.exports = Server;