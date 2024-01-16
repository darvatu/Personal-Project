const express = require("express");
const  {getAllTopics, getDescriptionAllEndpoints} = require("./controllers/controller");
const { handleCustomErrors } = require("../errors/index");


const app = express();


app.get("/api/topics", getAllTopics); 
app.get("/api", getDescriptionAllEndpoints)


app.use(handleCustomErrors)


module.exports = app;

