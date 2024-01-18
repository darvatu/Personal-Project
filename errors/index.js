exports.handleNoApiError =(req, res, next) => {
	res.status(404).send({
		msg: `Route not found. ${req.originalUrl} is not a valid endpoint as doesn't contain /api` })
}


exports.handleCustomErrors = (err, req, res, next) =>{
    if (err.msg === "not found the endpoints.json file" ||
		err.msg === "requested article not available" ||
		err.msg === "comment not found") {
        res.status(404).send({msg: "Not Found"})
    } else {
        next(err)
    }
}


exports.handleBadRequestError=(err, req, res, next) => {
	if (err.code === "22P02" || err.code === "23502") {
		res.status(400).send({ msg: "Bad Request" })
	} else if (err.code === "23503") {
		res.status(404).send({ msg: "Not Found" });
	} else {
		next(err)
	}
}


exports.handleInternalServerErrors=(err, req, res, next) => {
	res.status(500).send({ message: "500 error: Internal Server Error"})
}

