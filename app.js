const express = require("express");
const cors = require('cors');
const  {getAllTopics, 
        getDescriptionAllEndpoints, 
        getArticleById, 
        getAllArticles,
        getAllCommentsByArticleId,
        postCommentByArticleId,
        patchArticleIdWithVotes,
        deleteCommentById,
        getAllUsers} = require("./db/controllers/controller");

const { handlePSQLErrors,
        handleCustomErrors, 
        handleBadRequestError, 
        handleInternalServerErrors} = require("./errors/index");


const app = express();
app.use(express.json());
app.use(cors());
//"GET/api/topics returns an array of topic objects with 2 keys of description and slug"
//"GET/api/blabla if called with any other route excepting '/api/topics', '/api/articles', '/api', '/api/users', '/api/comments' to have the return code 404 and message Route not found "
app.get("/api/topics", getAllTopics); 

// "GET/api returns all endpoints "
app.get("/api", getDescriptionAllEndpoints);

//"GET/api/articles/1 to return an article as an object and specific properties"
// "GET/api/articles/bla return 400 error for no article id"
// "GET/api/articles/111 return 404 error message when passed valid article_id but not found"
app.get("/api/articles/:article_id", getArticleById);

// "GET/api/articles/ will receive 200 and an array of article objects with the defined properties"
// "GET/api/articles/ will respond with 200 and with articles and should include the comment count "
// "GET/api/articles/ will respond with 200 and with articles sorted descending(by date)"
// GET/api/articles/ will respond with 200 and with articles without a body property"
// "GET/api/articles?topic=mitch return 200, 12 articles in an array with topic: mitch"
// "GET/api/articles?topic=paper returns 200, empty array for a topic with no articles"
// "GET/api/articles?bla=mitch returns 200, all the articles as needs to ignore the invalid query"
// "GET/api/articles?topic=bla returns 404 , Not Found as there is not such topic bla"
app.get("/api/articles", getAllArticles);

// "GET/api/articles/1/comments will respond with an array of all the comments on that given article and will have the required properties",
// "GET/api/articles/1/comments will return comments with most recent first"
// "GET/api/articles/2/comments respond with an empty array as it is an article but no comments to it"
// "GET/api/articles/bla/comments will return  Bad Request"
// "GET/api/articles/111/comments respond with Not Found as no article with that id number"
app.get("/api/articles/:article_id/comments", getAllCommentsByArticleId);

// "GET/api/users returns 200, array of users objects with the user properties"
app.get("/api/users", getAllUsers);

// POST /api/articles/1/comments return 201, add the comment and respond with the new comment"
// "POST/api/articles/bla/comments to return 400, Bad Request"
// "POST/api/articles/111/comments should return 404, Not Found as there is no article"
// "POST/api/articles/1/comments should return 404, Not Found if invalid author bla"
// "POST/api/articles/1/comments should return 400, Bad Request if missing comment_body"
// "POST/api/articles/1/comments 400 /1/comments with missing author should return Bad Request"
// "POST/api/articles/1/comments return 400, should return Bad Request when missing comment completely to be send"
app.post("/api/articles/:article_id/comments", postCommentByArticleId);

// "PATCH/api/articles/1 return 200, votes increased by 1 at article_id=1 and tests the identifiers if remain the same at the end"
// "PATCH/api/articles/1 returns 201 and votes decreased by 10 to article_id=1 "
// "PATCH/api/articles/bla returns 400, Bad Request for the invalid article number"
// "PATCH/api/articles/1 returns 400, Bad Request if the votes are not a number"
// "PATCH/api/articles/111 returns 404, Not Found if article is not found"
// "PATCH/api/articles/1 returns 400, Bad Request if object with votes key and value is empty"
app.patch("/api/articles/:article_id", patchArticleIdWithVotes);

// "DELETE/api/comments/1 returns 204, empty object as no content after deletes the specified comment_id"
// "DELETE/api/comments/111 returns 404, Not Found when there is no comment with that number"
// "DELETE/api/comments/bla returns 400, Bad Request when not a number for the comment_id"
app.delete("/api/comments/:comment_id", deleteCommentById);

app.all("/*", handlePSQLErrors)
app.use(handleCustomErrors)
app.use(handleBadRequestError)
app.use(handleInternalServerErrors)

module.exports = app;

