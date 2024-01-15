    const db = require("../connection.js");
  
    exports.fetchAllTopics =() =>{
        console.log("hello from model")
        const queryString = `SELECT * FROM topics;`
        return db.query(queryString).then(({rows})=>{ return rows; })
        }