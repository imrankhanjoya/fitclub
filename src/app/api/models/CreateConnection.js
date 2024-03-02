import mongoose from 'mongoose'

mongoose.set("strictQuery", false);

function CreateConnection(){
    mongoose.connect(process.env.MG_DB).then((item)=>{
        console.log("connected");
    })
}

export default CreateConnection;