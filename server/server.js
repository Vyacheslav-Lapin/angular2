const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();

const {Db, Server, ObjectID} = require('mongodb');

const db = new Db('tutor',
    new Server('localhost', 27017, {safe: true},
        {auto_reconnect: true}, {}));

db.open(() => {
    console.log("mongo db is opened!");
    db.collection('notes', function (error, notes) {
        db.notes = notes;
    });
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const notes_init = [
    {text: "First note"},
    {text: "Second note"},
    {text: "Third note"}
];

app.get("/notes", (req, res) =>
    db.notes.find(req.query)
        .sort({text: 1})
        .toArray((err, items) => res.send(items)));

app.post("/notes", (req, res) =>
    res.send(db.notes.insert(req.body)));

app.delete("/notes", (req, res) => {
    const id = new ObjectID(req.query.id);
    console.log(id);
    db.notes.remove({_id: id}, err => {
        if (err) {
            console.log(err);
            res.send("Failed");
        } else {
            res.send("Success");
        }
    })
});

app.use(express.static(path.join(__dirname, '..')));

app.listen(8080);
