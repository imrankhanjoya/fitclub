// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest,  NextResponse } from 'next/server';

import CreateConnection from "../../models/CreateConnection"
import Product from '../../models/Product'
const md5 =  require("md5");
import productShema from "../../../lib/schema/productShema"

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
    data.image = data.image == '' ?'./de.png':data.image
    data.title = data.title == '' ?data.category:data.title
    console.log(data)
    
    const validationRule =  await productShema.safeParseAsync(data)
    if(validationRule.success == false){
      console.log(validationRule?.error)
      return NextResponse.json({ data:validationRule?.error?.issues[0].message, message: "Error in post request" })
    }
    let user_data = await Product.findOne({ website: data.website }).select({website:1,_id:0})
    console.log(JSON.stringify(user_data))
    console.log(data)
    if(!user_data){
      let date = new Date();
      const token = md5(data.website + date.getMilliseconds());
      data.token = token
      let user_create = await Product.create(data);
      user_data = await Product.findOne({ website: data.website })
      console.log(user_create)
      return NextResponse.json({ data: user_data, message: "Product been created" })
    }else{
      return NextResponse.json({ data: user_data, message: "Product Exist in system" })
    }
    
  } else {
    return NextResponse.json({ data:"", message: "Method Not Allowed" })
  }


}
