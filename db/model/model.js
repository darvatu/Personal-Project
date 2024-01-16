    const db = require("../connection.js");
    const fs = require("fs/promises")
    
  
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
        
    }

    exports.fetchArticleById = (article_id) => {
        return db
            .query( `SELECT * FROM articles WHERE article_id = $1`, [article_id])
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

    exports.fetchAllArticles = () => {
        return db
            .query(
                `SELECT
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
                    comments ON comments.article_id = articles.article_id
                GROUP BY
                    articles.article_id
                ORDER BY
                    articles.created_at DESC;`
                )
            .then((results) => {
                 return results.rows;
            })
            .catch((err) => {
                console.error("Model error=>>>>>>>>>>>>>>>>>>>>>>:", err);
                throw err; // Rethrow the error to be caught by the controller
            });

    }
