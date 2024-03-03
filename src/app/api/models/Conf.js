import mongoose from "mongoose";

const confSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    val:{
        type:String,
        required:true
    },
    token:{
        type:String,
        required:true,
        unique:true
    }
},{timestamps:true})
export default mongoose.models.Conf || mongoose.model("Conf", confSchema)
