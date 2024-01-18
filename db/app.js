const express = require("express");
const  {getAllTopics, 
        getDescriptionAllEndpoints, 
        getArticleById, 
        getAllArticles,
        getAllCommentsByArticleId,
        postCommentByArticleId,
        patchArticleIdWithVotes,
        deleteCommentById} = require("./controllers/controller");

const { handleNoApiError,
        handleCustomErrors, 
        handleBadRequestError, 
        handleInternalServerErrors} = require("../errors/index");


const app = express();
app.use(express.json());

app.get("/api/topics", getAllTopics); 
app.get("/api", getDescriptionAllEndpoints);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles", getAllArticles);
app.get("/api/articles/:article_id/comments", getAllCommentsByArticleId);

app.post("/api/articles/:article_id/comments", postCommentByArticleId);

app.patch("/api/articles/:article_id", patchArticleIdWithVotes);

app.delete("/api/comments/:comment_id", deleteCommentById);

app.all("/*", handleNoApiError)
app.use(handleCustomErrors)
app.use(handleBadRequestError)
app.use(handleInternalServerErrors)



module.exports = app;

