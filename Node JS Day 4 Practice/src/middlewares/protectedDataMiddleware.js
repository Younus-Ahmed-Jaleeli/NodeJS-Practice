const authenticateMiddleware = (req,res,next) => {

    if (req.headers["secret-key"] == "abcd123" ) {
        next();
    } else {
        res.json ( {
            msg: "Error 403: Forbidden"
        });
    }
};

export default authenticateMiddleware;