const fs = require("fs")
const chalk = require("chalk")

const getNotes = function () {
    return "Hi this is mayank"
}


const addNotes = function (title, body) {
    const notes = loadNotes()
    const duplicateNotes = notes.filter(function (note) {
        console.log(note)
        return note.title === title
    })
    console.log(duplicateNotes)
    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
    } else {
        console.log("duplicate notes title not allowed")
    }
}


const saveNotes = function (notes) {
    const dataJson = JSON.stringify(notes)
    fs.writeFileSync("notes.json", dataJson)
}


const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync("notes.json")
        const dataString = dataBuffer.toString()
        const notes = JSON.parse(dataString)
        return notes
    } catch (err) {
        console.log(err)
        return []
    }
}

const removeNotes = function (title) {
    const notes = loadNotes()
    const notesToKeep = notes.filter(function (note) {
        return note.title !== title
    })
    if (notes.length === notesToKeep.length) {
        console.log(chalk.red.inverse("note doesn't exists"))

        saveNotes(notesToKeep)
    } else {
        console.log(chalk.green.inverse("note removed"))
        console.log("note removed " + title)
    }
}


const listNotes = function () {
    const notes = loadNotes()
    console.log(chalk.inverse("your Notes"))
    notes.forEach(function (note) {
        console.log(note.title)
    })
}

const readNote = function (title) {
    const notes = loadNotes()
    const note = notes.find(function (note) {
        note.title === title
    })
    if (note) {
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.inverse("Note not found"))
    }
}
module.exports = {
    getNotes: getNotes,
    addNotes: addNotes,
    removeNotes: removeNotes.apply,
    listNotes: listNotes,
    readNote: readNote
};