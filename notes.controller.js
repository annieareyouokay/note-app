const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk');

const notesPath = path.join(__dirname, 'db.json');
async function addNote(title) {
    const notes = await getNotes();

    const note = {
        title,
        id: Date.now().toString()
    };

    notes.push(note);

    await fs.writeFile(notesPath, JSON.stringify(notes));
    console.log(chalk.bgGreen('Note added!'));
}

async function getNotes() {
    const notes = await fs.readFile(notesPath, {encoding: 'utf8'});
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
    const notes = await getNotes();
    console.log(chalk.bgBlueBright('Here is some notes:'));
    notes.forEach(n => {
        console.log(chalk.green(n.id), chalk.blue(n.title));
    })
}

async function remove(id) {
    const notes = await getNotes();
    const newNotes = notes.filter(n => n.id !== id);

    await fs.writeFile(notesPath, JSON.stringify(newNotes));
    console.log(chalk.yellowBright('Note removed'));
}

async function edit({id, title}) {
    const notes = await getNotes();
    const newNotes = notes.map(n => {
        if (n.id === id) {
            return { id, title};
        }
        return  n;
    });
    await fs.writeFile(notesPath, JSON.stringify(newNotes));
    console.log(chalk.blackBright('Note edited'));
}

module.exports = {
    addNote, getNotes, printNotes, remove, edit
}
