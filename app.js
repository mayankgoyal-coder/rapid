//File system allow us to store's data
// Command line arguments are gonna allow us to take input from the user
// Note taking application--

const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes")
// const msg = getNotes()
// console.log(chalk.blue.inverse.bold(msg))




// Create add command
yargs.command({
    command: 'add',
    describe: 'add a new note',
    builder: {
        title: {
            describe: "To add a note",
            demandOption: true,
            type: "string"
        },
        body: {
            describe: "its a body",
            demandOption: true,
            type: "string"
        }
    },
    handler: function (argv) {
        //  console.log("Title" , argv.title)
        // console.log("body" , argv.body)
        notes.addNotes(argv.title, argv.body)
    }
})

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'remove a  note',
    buider: {
        title: {
            describe: "note title",
            demandOption: true,
            type: "String"
        }
    },
    handler: function (argv) {
        notes.removeNotes(argv.title)
    }
})


// Create list command
yargs.command({
    command: 'list',
    describe: 'list your  note',
    handler: function () {
        notes.listNotes()

    }
})


// Create read command
yargs.command({
    command: 'read',
    describe: 'read a  note',
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: "String"
        }
    },
    handler: function (argv) {
        notes.readNote(argv.title)
    }
})
// console.log(process.argv)
yargs.argv







