const express = require('express');
const app = express();

const session = require('express-session');
const MongoStore = require('connect-mongo/es5')(session);
app.use(session({
    store: new MongoStore({
        url: 'mongodb://localhost:27017/angular_session'
    }),
    secret: 'angular_tutorial',
    resave: true,
    saveUninitialized: true
}));

const path = require('path');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const notes_init = [
    {text: "First note"},
    {text: "Second note"},
    {text: "Third note"}
];

app.get("/notes", (req, res) => {
    console.log("reading notes", req.session.notes);
    if (!req.session.notes)
        req.session.notes = notes_init;
    res.send(req.session.notes);
});

app.post("/notes", (req, res) => {
    const note = req.body;
    console.log("adding note", req.session.notes);
    req.session.notes.push(note);
    res.end();
});


app.use(express.static(path.join(__dirname, '..')));

app.listen(8080);

/*

FOLDER STRUCTURE:

root
  app 
  server
     server.js
	 package.json
  index.html
  package.json
*/
