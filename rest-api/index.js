//Connection Code

let express = require('express'),
    path = require('path'),
    mongoose = require('mongoose');
    cors = require('cors'),
    bodyParser = require('body-parser'),
    mongoDb = require('./database/db');
    createError = require('http-errors')

mongoose.Promise = global.Promise;

mongoose.connect( mongoDb.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    ()=>{
        console.log("Database Connected Successfull !!")
    },
    error=>{
        console.log("Database Connection Eror:" +error)
    }
)

// Make PORT and Server
const bookRoute = require("./node-backend/routes/book.routes");
const app = express();
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

// Now Create a Static Path
app.use( express.static(path.join( __dirname, 'dist/Bookstore')) );

// API Root
app.use( '/api', bookRoute );

// Port Create
const port = process.env.port || 8000;
app.listen( port, () => {
    console.log('Listening Port on: ' + port);
} );

// https://www.youtube.com/watch?v=68bGQaokSdY
// Minuto 52:12

// 404 Handler
app.use( ( req, res, next ) => {
    next( createError(404) );
});

//Base Route
app.get('/', ( req, res ) => {
    res.send('Invalid Endpoint');
});
app.get('*', ( req, res ) => {
    res.sendFile(path.join( __dirname, 'dist/Bookstore/index.html' ) );
});
app.use( function ( err, req, res, next ) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status( err.statusCode ).send( err.message );
});  