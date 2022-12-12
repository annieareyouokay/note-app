const chalk = require("chalk");
const path = require('path');
const {addNote, getNotes} = require("./notes.controller");
const express = require('express');

const basePath = path.join(__dirname, 'pages');
const port = 3000;
const app = express();

app.use(express.static(path.resolve(__dirname, 'public')));
app.set('views', 'pages');
app.set('view engine', 'ejs')
app.use(express.urlencoded({
    extended: true
}));

app.get('/', async (req, res) => {
    res.render('index', {
        title: 'Note app',
        notes: await getNotes()
    });
});

app.post('/', async (req, res) => {
    await addNote(req.body?.title);
    res.render('index', {
        title: 'Note app',
        notes: await getNotes()
    });
})
app.listen(port, () => {
    console.log(chalk.green(`Server has been started on port ${port}`));
})
