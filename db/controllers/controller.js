const { fetchAllTopics, fetchAllEndpoints, fetchArticleById } = require("../model/model.js");

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