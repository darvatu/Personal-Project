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
        .catch((err) => Promise.reject({msg: "error reading the endpoints.json file"}))     
    }