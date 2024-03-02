// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest,  NextResponse } from 'next/server';

import CreateConnection from "../../models/CreateConnection"
import User from '../../models/User'
const md5 =  require("md5");
import registerShema from "../../../lib/schema/registerShema"

//const User = require("../models/User")
CreateConnection()

type Data = {
  data: string,
  message: string
}

export async function POST(req:NextRequest,res:NextResponse<Data>) {

  if (true) {

    const postvalue = await req.json()
    const data = postvalue
    console.log(data)
    
    const validationRule =  await registerShema.safeParseAsync(data)
    if(validationRule.success == false){
      return NextResponse.json({ data:validationRule.error.issues[0].message, message: "Error in post request" })
      
    }
    let user_data = await User.findOne({ email: data.email }).select({email:1,_id:0})
    if(!user_data){
      let date = new Date();
      const token = md5(data.email + date.getMilliseconds());
      const stoken = md5(data.email + date.getMilliseconds());
      data.username = token
      data.token = token
      data.type = data.type
      data.stoken = stoken
      data.password = token.substr(0,5)
      data.image = '/weimage/user.png'
      data.name = data.name
      data.phone = ""
      data.bio = ""
      let user_create = await User.create(data);
      user_data = await User.findOne({ email: data.email })
      console.log(user_create)
      return NextResponse.json({ data: user_data, message: "User has been created" })
    }else{
      return NextResponse.json({ data: user_data, message: "Exist in system" })
    }
    
  } else {
    return NextResponse.json({ data:"", message: "Method Not Allowed" })
  }


}
