import { counter, limit } from "../utils/globalVariables.js";

const rateLimitterMiddleware = (req,res,next) => {
    if (counter > limit) {
        res.json ( {
            msg: "The Limit has been exceeded...",
        });
    } else {
        next();
    }
};

export default rateLimitterMiddleware;