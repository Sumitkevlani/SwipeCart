class ErrorHandler extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
        //target-object, constructor
        Error.captureStackTrace(this,this.constructor);
    }
}

export default ErrorHandler;