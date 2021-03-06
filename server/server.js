const express = require('express'),
axios = require('axios'),
massive = require('massive'),
session = require('express-session'),
bodyParser = require('body-parser'),
bcrypt = require('bcryptjs'),
path = require('path');

require('dotenv').config();
const app = express();

let {
    SERVER_PORT,
    ENVIRONMENT,
    SESSION_SECRET,
    CONNECTION_STRING
} = process.env

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './../build')));

const login_cntrl = require('./login_controller');
const note_cntrl = require('./note_controller');

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 14
    }
}))

massive(CONNECTION_STRING).then(db => {
    console.log("database connected!");
    app.set('db', db);
}).catch( error => console.error('ERROR!', error))

// app.use((req, res, next) => {
//         if(ENVIRONMENT === 'dev') {
//             req.app.get('db').set_data().then(userData => {
//                 req.session.user = userData[0]
                
//                 next()
//             })    
//         } else {
//             next();
//         }    
//         })


// authorisation endpoints
app.post('/auth/login', login_cntrl.login);
app.post('/auth/register', login_cntrl.register);
app.delete('/auth/logout', login_cntrl.logout);

// note endpoints
app.get('/api/getQuote', note_cntrl.getQuotes);
app.post('/allnotes/new', note_cntrl.create);
app.post('/allnotes/addphoto', note_cntrl.addphoto);
app.get('/allnotes', note_cntrl.read);
app.patch('/allnotes/:note_id', note_cntrl.update);
app.delete('/allnotes/:note_id', note_cntrl.delete);

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(SERVER_PORT, ( ) => {
    console.log(`Listening on port: ${SERVER_PORT}`)
});