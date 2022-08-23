const fs = require("fs")

const { json } = require("express")

const book = {
    title: "narendra modi",
    author:"sanjay mishra"
}
const BOOKJSON = JSON.stringify(book)


//fs.writeFileSync("myjson.json",BOOKJSON)
const data =JSON.parse(fs.readFileSync("myjson.json").toString()).title 
console.log(data)