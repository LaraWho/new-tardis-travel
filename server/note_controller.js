const axios = require('axios');
const quotes = require('./quotes');
// const allquotes = quotes.quotes

module.exports = {
    

getQuotes: (req, res) => {
        res.status(200).send(quotes.quotes)
},

create: (req, res) => {
    const dbInstance = req.app.get('db')
    const { user_id } = req.session.user
    const { country, location, content } = req.body;

    dbInstance.add_note([ country, location, content, user_id ])
    .then((note) => res.status(200).send(note) )
    .catch( err => {
        res.sendStatus(401)
        console.log(err)
    })
},

read: (req, res) => {
    const dbInstance = req.app.get('db')
    let {user_id} = req.session.user

        dbInstance.view_all([user_id])
        .then(notes => {
            res.status(200).send(notes)
        }).catch( err => {
            res.sendStatus(500)
            console.log(err)
        })
    
},

addphoto: (req, res) => {
    const dbInstance = req.app.get('db')
    const { user_id } = req.session.user
    const { title, country, location, photo } = req.body;

    dbInstance.add_photo([ title, country, location, photo, user_id ])
    .then((note) => res.status(200).send(note) )
    .catch( err => {
        res.sendStatus(401)
        console.log(err)
    })
},

update: (req, res) => {
    const dbInstance = req.app.get('db');
    const { note_id } = req.params;
    const { title, country, location, content } = req.body;

    dbInstance.edit_note([ title, country, location, content, note_id ])
    .then( (note) => {
        res.status(200).send(note) 
        })
    .catch( err => {
        res.sendStatus(400)
        console.log(err)
    }) 
},

delete: (req, res) => {
    const dbInstance = req.app.get('db');
    const { note_id } = req.params;
    const { user_id } = req.session.user;

    dbInstance.delete( [note_id, user_id] )
    .then( (notes) => {
        res.status(200).send(notes) 
    })
    .catch( err => {
        res.sendStatus(500)
        console.log(err)
    } )
}

}