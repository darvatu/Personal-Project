const { forEach } = require("../data/test-data/articles.js");
const { fetchAllTopics, 
        fetchAllEndpoints, 
        fetchArticleById, 
        fetchAllArticles,
        fetchAllCommentsByArticleId,
        updateArticleIdWithVotes,
        insertCommentByArticleId } = require("../model/model.js");
const {checkArticleExists}=require("../seeds/utils.js")

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

exports.getAllCommentsByArticleId=(req, res, next) => {
	const { article_id } = req.params;
    const checkIfArticle= checkArticleExists(article_id)
    const commentsByArticle=fetchAllCommentsByArticleId(article_id)
    Promise.all([commentsByArticle, checkIfArticle,])
		    .then((response) => {
                const comments=response[0]
                res.status(200).send({ comments })
            }) 
               
            .catch((err) => {
		    	next(err);
		    })
    
}

exports.postCommentByArticleId= (req, res, next) => {
	const { article_id } = req.params;
	const newComment = req.body;
   	insertCommentByArticleId(article_id, newComment)
		.then((comment) => {
			res.status(201).send({ comment });
		})
		.catch((err) => {
			next(err);
		})
}

exports.patchArticleIdWithVotes= (req, res, next) => {
	const { article_id } = req.params;
	const newVote = req.body.inc_votes;
	updateArticleIdWithVotes(article_id, newVote)
		.then((article) => {
			return res.status(201).send({ article });
		})
		.catch((err) => {
			next(err);
		})
}