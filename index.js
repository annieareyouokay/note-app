const yargs = require('yargs');
const pkg = require('./package.json');
const { addNote, printNotes, remove } = require('./notes.controller');

yargs.version(pkg.version);

yargs.command({
    command: 'add',
    describe: 'add new note to list',
    builder: {
        title: {
            type: 'string',
            describe: 'Note title',
            demandOption: true
        }
    },
    async handler({ title }) {
        await addNote(title);
    }
});

yargs.command({
    command: 'list',
    describe: 'print all notes',
    async handler() {
        await printNotes();
    }
});

yargs.command({
    command: 'remove',
    describe: 'remove note by id',
    builder: {
        id: {
            type: 'string',
            describe: 'note id',
            demandOption: true
        }
    },
    async handler({ id }) {
        await remove(id);
    }
});

yargs.parse();
