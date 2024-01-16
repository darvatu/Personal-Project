const { forEach } = require("../data/test-data/articles.js");
const { fetchAllTopics, fetchAllEndpoints, fetchArticleById, fetchAllArticles } = require("../model/model.js");

exports.getAllTopics=(req, res, next) =>{
    fetchAllTopics()
    .then ((topics)=>{
        res.status(200).send(topics)
    })
    .catch((err)=>{
        next(err)
    })
}

exports.getDescriptionAllEndpoints=(req, res, next) =>{
    fetchAllEndpoints()
    .then ((endpoints)=>{
        res.status(200).send(endpoints)
    })
    .catch((err)=>{
        next(err)
    })
}

exports.getArticleById = (req, res, next) => {
	const { article_id } = req.params;
	fetchArticleById(article_id)
	.then((article) => {
		res.status(200).send({ article })
	})
	.catch((err) => {
		next(err)
	})
}


exports.getAllArticles = (req, res, next) => {
    fetchAllArticles()
    .then((articles) => {
        res.status(200).send({ articles });
    })
    .catch((err) => {
        next(err)
    })
}