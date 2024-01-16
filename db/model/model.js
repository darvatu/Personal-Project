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