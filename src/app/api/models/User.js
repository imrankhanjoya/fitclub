import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
    },
    bio:{
        type:String,
    },
    image:{
        type:String,
    },
    type:{
        type:String,
        default:"user"
    },
    active:{
        type:String,
        default:"false"
    },
    code:{
        type:String,
    },
    token:{
        type:String,
        required:true,
        unique:true
    },
    stoken:{
        type:String,
        required:true,
        unique:true
    },

},{timestamps:true})


export default mongoose.models.User || mongoose.model("User", userSchema)
