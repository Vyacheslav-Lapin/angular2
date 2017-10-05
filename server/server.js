const express = require('express');
const app = express();

// const session = require('express-session');
// const MongoStore = require('connect-mongo/es5')(session);
// app.use(session({
//     store: new MongoStore({
//         url: 'mongodb://localhost:27017/angular_session'
//     }),
//     secret: 'angular_tutorial',
//     resave: true,
//     saveUninitialized: true
// }));

const path = require('path');

const fs = require('fs');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const notes_init = [
    {text: "First note"},
    {text: "Second note"},
    {text: "Third note"}
];

app.get("/notes", (req, res) => {
    fs.readFile("notes.json", (err, result) => {
        if (result) {
            result = "" + result; // convert Object to String
            //remove last \n in file
            result = result.substring(0, result.length - 1);
            result = "[" + result + "]";
            result = result.split("\n").join(",");
            res.send(result);
        } else
            res.end();
    });
});

app.post("/notes", function (req, res) {
    const note = req.body;
    const noteText = JSON.stringify(note) + "\n";
    fs.appendFile("notes.json", noteText, err => {
        if (err)
            console.log("something is wrong");
        res.end();
    });

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
