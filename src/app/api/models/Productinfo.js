import mongoose from "mongoose";

const productinfoSchema = mongoose.Schema({
    
    description:{
        type:String,
    },
    faq:{
        type:[],
    },
    pros:{
        type:[],
    },
    cons:{
        type:[],
    },
    website:{
        type:String,
    },
    active:{
        type:String,
        default:"false"
    },
    product_token:{
        type:String,
        required:true,
        unique:true
    },
    token:{
        type:String,
        required:true,
        unique:true
    }

},{timestamps:true})


export default mongoose.models.Productinfo || mongoose.model("Productinfo", productinfoSchema)
