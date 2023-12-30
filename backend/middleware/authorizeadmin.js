import ErrorHandler from "../utils/errorhandler.js";

const authorizeroles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            next(new ErrorHandler(`Role: ${req.user.role} is not allowed.`,403));
        }
        else{
            next();
        }
    }
}

export default authorizeroles;