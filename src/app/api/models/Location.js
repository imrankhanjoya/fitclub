import mongoose from "mongoose";

const locationSchema = mongoose.Schema({
    country:{
        type:String,
        required:true,
    },
    state:{
        type:String,
    },
    lat:{
        type:String,
    },
    lang:{
        type:String,
    },
    token:{
        type:String,
        required:true,
        unique:true
    }
},{timestamps:true})
export default mongoose.models.Location || mongoose.model("Location", locationSchema)
