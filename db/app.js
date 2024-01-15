const express = require("express");
const  {getAllTopics} = require("./controllers/controller");
const { handleCustomErrors } = require("../errors/index");

const app = express();


app.get("/api/topics", getAllTopics); 

console.log("Hello from app.js")

app.use(handleCustomErrors)


module.exports = app;

