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

    // const postvalue = await req.json()
    // const data = postvalue
    // console.log(data)
        
    let products = await Product.find({})
    if(!products){
      return NextResponse.json({ data: false, message: "Website not found" })
    }else{
      return NextResponse.json({ data: products, message: "Website Exist in system" })
    }
    
  } else {
    return NextResponse.json({ data:"", message: "Method Not Allowed" })
  }


}
