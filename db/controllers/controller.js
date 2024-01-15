const { fetchAllTopics} = require("../model/model.js");

exports.getAllTopics=(req, res, next) =>{
    console.log("Hello from controller");
    fetchAllTopics()
    .then ((topics)=>{

        res.status(200).send(topics)
    })
    .catch((err)=>{
        next(err)
    })
}

