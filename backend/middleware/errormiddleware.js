import ErrorHandler from "../utils/errorhandler.js";

const errormiddleware = (err, req, res, next)=>{
    //Mongo Cast Error(Wrong MongoDb Id)
    if(err.name === "CastError"){
        const msg = "Resource not found";
        err = new ErrorHandler(msg, 400); 
    }
    //Duplicate Email error
    else if(err.code === 11000){
        const msg = "An account with the provided email already exists.";
        err = new ErrorHandler(msg, 400);
    }
    //Wrong JWT Error
    else if(err.name === "JsonWebTokenError"){
        const msg = "Json Web Token is invalid, try again.";
        err = new ErrorHandler(msg, 400);
    }
    //JWT expire error
    else if(err.name === "TokenExpiredError"){
        const msg = "Json Web Token is expired, try again.";
        err = new ErrorHandler(msg, 400);
    }
    else{
        const statusCode = err.statusCode||500;
        const msg = err.message||"Internal Server Error";
        err = new ErrorHandler(msg, statusCode);
    }
    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
};

export default errormiddleware;