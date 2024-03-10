import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    logo:{
        type:String,
    },
    image:{
        type:String,
        required:true,
    },
    source:{
        type:String,
    },
    website:{
        type:String,
    },
    category:{
        type:String,
    },
    year:{
        type:String,
        default:"user"
    },
    seotitle:{
        type:String,
    },
    seodescription:{
        type:String,
    },
    active:{
        type:String,
        default:"false"
    },
    token:{
        type:String,
        required:true,
        unique:true
    }

},{timestamps:true})


export default mongoose.models.Product || mongoose.model("Product", productSchema)
