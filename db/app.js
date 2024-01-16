const express = require("express");
const  {getAllTopics, 
        getDescriptionAllEndpoints, 
        getArticleById, 
        getAllArticles} = require("./controllers/controller");
const { handleCustomErrors, 
        handleNoApiError,
        handleBadRequestError, 
        handleInternalServerErrors } = require("../errors/index");


const app = express();


app.get("/api/topics", getAllTopics); 
app.get("/api", getDescriptionAllEndpoints);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles", getAllArticles);

app.use(handleCustomErrors)
app.all("/*", handleNoApiError)
app.use(handleBadRequestError)
app.use(handleInternalServerErrors)



module.exports = app;

