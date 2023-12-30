import ErrorHandler from "../utils/errorhandler.js";
import catchasyncerror from "../middleware/asyncerrormiddleware.js";
import User from "../models/userModel.js";
import express from "express";
import validator from "validator";
import sendToken from "../utils/JwtToken.js";
import sendEmail from '../utils/sendEmail.js';
import crypto from 'crypto';
import isAuthenticatedUser from "../middleware/authentication.js";
import authorizeRoles from "../middleware/authorizeroles.js";
import { v2 as cloudinary } from "cloudinary";
import upload from '../middleware/uploadmiddleware.js';

const router = express.Router();



//Registering a user
router.post('/register', upload.single('avatar'),catchasyncerror(async (req, res, next)=>{
    try{

        const {name, email, password} = req.body;
        const {avatar} = req.body;

        const result = await cloudinary.uploader.upload(avatar, {
            folder: 'avatars'
        });

        const user = await User.create({
            name,
            email,
            password,
            avatar: {
                public_id: result.public_id,
                url: result.secure_url
            }
        });

        sendToken(user, 201, res);
    }
    catch(error){
        console.log("Error during registration", error);
        next(new ErrorHandler(error.message,500));
    }
}));


router.post('/login',catchasyncerror(async (req, res, next)=>{
    const {email, password} = req.body;
    if(!email || !password){
        next(new ErrorHandler("Please enter email and password",400));
    }
    else if(!validator.isEmail(email)){
        next(new ErrorHandler("Invalid credentials.",401));
    }
    else{
        const user = await User.findOne({email}).select("+password");
        if(!user){
            next(new ErrorHandler("Invalid credentials",401));
        }
        else{
            const isPasswordMatched = await user.comparePassword(password);
            if(!isPasswordMatched){
                next(new ErrorHandler("Invalid credentials", 401));
            }
            else{
                sendToken(user, 200, res);
            }
        }
    }
}));

router.get('/logout',catchasyncerror(async (req, res, next)=>{
    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly: true,
        secure: true
    });
    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });
}));

router.post('/forgot-password',catchasyncerror(async (req, res, next)=>{
    const user = await User.findOne({email: req.body.email});
    if(!user){
        next(new ErrorHandler("User not found", 404));
    }
    else{
        const resetToken = user.getResetPasswordToken();

        await user.save();

        //req.protocol : http or https
        //req.get("host") : localhost or any other remote host
        const resetPasswordURL = `${req.protocol}://127.0.0.1:5173/resetpassword/${resetToken}`;

        const message = `Your reset password link is: \n\n ${resetPasswordURL} \n\nIt is valid for 15 minutes only.`;

        //Mailing the user
        try{
            await sendEmail({
                email: user.email,
                subject: "SKomm password recovery",
                message
            });
            res.status(200).json({
                success: true,
                message: "Email sent successfully."
            })
        }catch(error){
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();
            return next(new ErrorHandler(error.message, 500));
        }
    }

}));


router.put('/password/reset/:token',catchasyncerror(async (req, res, next)=>{

    const token = req.params.token;
    const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");
    console.log(token, req.body);
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    if(!user){
        next(new ErrorHandler("Reset Password token is invalid or has been expired.",400)); 
    }
    else if (password !== confirmPassword){
        next(new ErrorHandler("Passwords does not match.",400));
    }
    else if (password.length<8){
        next(new ErrorHandler("Password must be of at least 8 characters", 400));
    }
    else if(req.body.password === user.password){
        next(new ErrorHandler("Password cannot be same as the previous password",400));
    }
    else{
        user.password = req.body.password;
        user.resetPasswordExpire = undefined;
        user.resetPasswordToken = undefined;
        await user.save();
        sendToken(user, 200, res);
    }
}));

//GET PROFILE ROUTE
router.get('/profile',isAuthenticatedUser,catchasyncerror((req, res, next)=>{
    const user = req.user;
    res.status(200).json({
        success: true,
        user
    });
}));


//UPDATE PASSWORD ROUTE
router.put('/update-password', isAuthenticatedUser, catchasyncerror(async (req, res, next)=>{
    const user = await User.findOne({_id: req.user._id}).select("+password");

    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const confirmPassword = req.body.confirmPassword;

    const isPasswordMatched = await user.comparePassword(oldPassword);

    if(!isPasswordMatched){
        next(new ErrorHandler("Old Password is incorrect.", 400));
    }
    else if(newPassword.length < 8){
        next(new ErrorHandler("Password must be at least 8 characters long.", 400));
    }
    else if(oldPassword === newPassword){
        next(new ErrorHandler("Passwords cannot be same.",400));
    }
    else if(newPassword !== confirmPassword){
        next(new ErrorHandler("Passwords do not match", 400));
    }
    else{
        user.password = newPassword;
        await user.save();
        sendToken(user, 200, res);
    }
}));


//UPDATE PROFILE ROUTE
router.put('/update-profile', isAuthenticatedUser, upload.single('avatar'), catchasyncerror(async (req, res, next)=>{
    const userId = req.user._id;
    // const updatedProfile = {...req.body};

    const { name, email, avatar }  = req.body;

    const existingUser = await User.findOne({_id: userId});

    const avatarId = existingUser.avatar.public_id;

    await cloudinary.uploader.destroy(avatarId);

    const result = await cloudinary.uploader.upload(avatar, {
        folder: 'avatars'
    });
    const updatedProfile = {
        name: name,
        email: email,
        avatar: {
            public_id: result.public_id,
            url: result.secure_url
        }
    };

    console.log(updatedProfile);

    

    updatedProfile.password = req.user.password;
    
    const user = await User.findOneAndUpdate(
        { _id: userId },
        { $set: updatedProfile },
        { new: true, runValidators: true }
    );
    sendToken(user, 200, res);
}));


//GET ALL USERS ROUTE(ADMIN ONLY)
router.get('/admin/get-all-users', isAuthenticatedUser, authorizeRoles('admin'), catchasyncerror(async(req, res, next)=>{
    const users = await User.find();
    res.status(200).json({
        success: true,
        users
    });
}));


//GET SINGLE USER(ADMIN ONLY)
router.get('/admin/get-user/:id', isAuthenticatedUser, authorizeRoles('admin'), catchasyncerror(async(req, res, next)=>{
    const id = req.params.id;
    const user = await User.findOne({_id : id});
    if(!user){
        next(new ErrorHandler("User not found with the given id", 404));
    }
    else{
        res.status(200).json({
            success: true,
            user
        });
    }
}));


//UPDATE USER ROLE(ADMIN ONLY)
router.put('/admin/update-role/:id', isAuthenticatedUser, authorizeRoles('admin'), catchasyncerror(async (req, res, next) => {
    const userId = req.params.id;
    
    const oldUser = await User.findOne({_id: userId});
    console.log(oldUser);
    if(!oldUser){
        return next(new ErrorHandler("User not found with the given id", 404));
    }
    else{
        const updatedProfile = { ...req.body };
        updatedProfile.avatar = {
            public_id: "This is a sample public id",
            url: "This is a profile picture url"
        };
        updatedProfile.password = oldUser.password;
        const user = await User.findOneAndUpdate(
            { _id: userId },
            { $set: updatedProfile },
            { new: true, runValidators: true }
        );
        return res.status(200).json({
            success: true,
            message:"Role updated successfully"
        });
    }
}));


//DELETE A USER(ADMIN ONLY)
router.delete('/admin/delete-user/:id', isAuthenticatedUser, authorizeRoles('admin'), catchasyncerror(async (req, res, next)=>{
    const userId = req.params.id;

    const user = await User.findById(userId);
    if(!user){
        return next(new ErrorHandler("User does not exist with the given id", 404));
    }
    else{
        await user.deleteOne();
        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    }
}));
export default router;
