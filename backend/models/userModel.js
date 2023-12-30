import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"Please enter your name"],
        trim:true,
        minLength: [5,"Name must be of at least 5 characters."],
        maxLength: [30,"Name must not be more than 30 characters."]
    },
    email: {
        type: String,
        required: [true,"Please enter your email."],
        unique: true,
        validate: [validator.isEmail,"Please enter a valid email."]
    },
    password: {
        type: String,
        required:  [true,"Please enter a password"],
        minLength: [8,"Password must be of at least 8 characters."],
        select: false
    },
    createdAt: {
        type: String,
        default: Date.now
    },
    role: {
        type: String,
        default: "user",
        enum: ["user","admin"]
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

userSchema.pre("save", async function(next){
    //function run before save event

    if(!this.isModified("password")){
        //if password not updated, then continue
        next();
    }
    else{
        this.password = await bcrypt.hash(this.password, 10); 
    }
});

userSchema.methods.getJWTToken = function(){
    return jwt.sign({id: this._id},process.env.SECRET_KEY,{expiresIn: process.env.EXPIRE_TIME});
}

userSchema.methods.comparePassword  = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

userSchema.methods.getResetPasswordToken = function(){
    //Generating token
    const resetToken = crypto.randomBytes(20).toString("hex");
    
    //Hashing the token
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    
    //Saving it to the database
    this.resetPasswordToken = hashedToken;
    this.resetPasswordExpire = Date.now() + 15*60*1000;

    return resetToken;
}

const User = mongoose.model("user", userSchema);
export default User;