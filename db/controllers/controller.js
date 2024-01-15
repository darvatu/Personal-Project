const { fetchAllTopics} = require("../model/model.js");
const db = require("../connection.js");

// exports.getAllTopics= (request, response) => {
    // console.log("Hello from controller");
    // const { topic } = request.query;
    // const validRoutes = ['/api/topics'];
    // if (!isValidRoute(request.path)) {
    //     response.status(404).send({ error: "Route not found" });
    //     return;
    //   }
//     fetchAllTopics(topic).then((results) => {
//       response.status(200).send(results);
//     });
//   }

// function isValidRoute(path) {
//   // here compare it against a list of valid routes
//   const validRoutes = ['/api/topics', '/api/articles', '/api', '/api/users', '/api/comments'];
//   return validRoutes.includes(path);
// }

exports.getAllTopics=(req, res, next) =>{
    fetchAllTopics()
    .then ((topics)=>{
        res.status(200).send({topics})
    })
    .catch((err)=>{
        next(err)
    })
}

