exports.handleCustomErrors = (err, req, res, next) =>{
    if (err.status && err.msg) {
        res.status(err.status).send({msg: err.msg})
    } else {
        next(err)
    }
}

exports.handleNoApiError =(req, res, next) => {
	res.status(404).send({
		msg: `Route not found. ${req.originalUrl} is not a valid endpoint as doesn't contain /api` })
}

exports.handleBadRequestError=(err, req, res, next) => {
	if (err.code === "22P02") {
		res.status(400).send({msg: "Bad Request"})
	} else {
		next(err)
	}
}

exports.handleInternalServerErrors=(err, req, res, next) => {
	res.status(500).send({ message: "500 error: Internal Server Error"})
}