    const db = require("../connection.js");
    const fs = require("fs/promises");
const { checkIfTopic } = require("../seeds/utils.js");
    
  
    exports.fetchAllTopics = () =>{
        const queryString = `SELECT * FROM topics;`
        return db
        .query(queryString)
        .then(({rows})=>{ 
                    return rows; 
                })
    }

    
    exports.fetchAllEndpoints = () =>{
        return fs
        .readFile('endpoints.json', 'utf-8')
        .then((endpoints) => {
            return JSON.parse(endpoints)
            })
        
		.catch((err) => {
			return Promise.reject({ msg: "not found the endpoints.json file"});
		})
    }

    exports.fetchArticleById = (article_id) => {
        return db
            .query(`SELECT articles.*, COUNT(comments.comment_id) AS comment_count 
                    FROM articles 
                    LEFT OUTER JOIN comments ON comments.article_id = articles.article_id
                    WHERE articles.article_id = $1
                    GROUP BY articles.article_id;`,[article_id])  
            
                .then((results) => {
                if (results.rows.length === 0) {
                    return Promise.reject({
                        status: 404,
                        msg: "requested article not available",
                    });
                } else {
                    return results.rows[0];
                }
            })
    }

    exports.fetchAllArticles = (topic) => {
        let query = `SELECT
                        articles.article_id,
                        articles.title,
                        articles.topic,
                        articles.author,
                        articles.created_at,
                        articles.votes,
                        articles.article_img_url,
                        COUNT(comments.comment_id) AS comment_count
                    FROM
                        articles
                    LEFT JOIN
                        comments ON comments.article_id = articles.article_id`;
    
        const queryParams = [];
    
        if (topic) {
            query += ` WHERE articles.topic = $1`;
            queryParams.push(topic);
        }
    
        query += ` GROUP BY
                    articles.article_id
                ORDER BY
                    articles.created_at DESC;`;
    
        return db
            .query(query, queryParams)
            .then((results) => {
                if (topic) {
                    if (results.rows.length === 0) {
                        return checkIfTopic(topic)
                        .then (()=>{return []})
                        }
                    return results.rows;
                }

                if (results.rows.length === 0) {
                    return Promise.reject({ msg: "requested article not available" });
                }
                return results.rows;
            })
    }
    
    exports.fetchAllCommentsByArticleId = (article_id) => {
        return db
            .query(`SELECT * FROM comments
                    WHERE article_id = $1
                    ORDER BY created_at DESC;`, [article_id])
            .then((results) => {
               return results.rows;
            })

    }

    exports.insertCommentByArticleId= (article_id, newComment) => {
        return db
            .query(`INSERT INTO comments (author, body, article_id)
                    VALUES ($1, $2, $3)
                    RETURNING *;`,[newComment.author, newComment.body, article_id])
            .then((result) => {
                return result.rows[0];
            })
   
    }

    exports.updateArticleIdWithVotes = (article_id, newVote) => {
        return db
            .query(`UPDATE articles
                    SET votes = votes + $1
                    WHERE article_id = $2
                    RETURNING *;`, [newVote, article_id])
            .then((results) => {
                if (results.rows.length === 0) {
                    return Promise.reject({msg: "requested article not available"});
                } else {
                    return results.rows[0];
                }
            })
    }

    exports.deletingCommentById = (comment_id) => {
        return db
            .query(`DELETE FROM comments
                    WHERE comment_id = $1
                    RETURNING *;`, [comment_id])
            .then((result) => {
                if (result.rows.length === 0) {
                    return Promise.reject({ msg: "comment not found" });
                } 
            })
    }

    exports.fetchAllUsers= () => {
        return db
            .query(`SELECT * FROM users`)
            .then((results) => {
            return results.rows;
        })
    }

  