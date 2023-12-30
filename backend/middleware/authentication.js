import User from "../models/userModel.js";
import ErrorHandler from "../utils/errorhandler.js";
import catchasyncerror from "./asyncerrormiddleware.js";
import jwt from "jsonwebtoken";

const isAuthenticatedUser = catchasyncerror(async(req, res, next)=>{
    const {token} = req.cookies;
    if(!token){
        return next(new ErrorHandler("Please authenticate yourself.",401));
    }
    else{
        const decodedUser = jwt.verify(token, process.env.SECRET_KEY);
        req.user = await User.findOne({_id: decodedUser.id});
        next();
    }
});

export default isAuthenticatedUser;