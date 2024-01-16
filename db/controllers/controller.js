const { fetchAllTopics, fetchAllEndpoints} = require("../model/model.js");

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

