// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest,  NextResponse } from 'next/server';

import CreateConnection from "../../models/CreateConnection"
import Product from '../../models/Product'
import Productinfo from '../../models/Productinfo';
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
    // const validationRule =  await productShema.safeParseAsync(data)
    // if(validationRule.success == false){
    //   console.log(validationRule?.error)
    //   return NextResponse.json({ data:validationRule?.error?.issues[0].message, message: "Error in post request" })
    // }
    let productval = await Product.findOne({ token: data.token })
    console.log(JSON.stringify(productval))
    console.log(data)
    if(productval){
      let productdetail = await Productinfo.findOne({ product_token: data.token })
      return NextResponse.json({ data: {'product':productval,'prodcutdetail':productdetail}, message: "Product Exist in system" })
    }else{
      return NextResponse.json({ data: productval, message: "Product been created" })
    }
    
  } else {
    return NextResponse.json({ data:"", message: "Method Not Allowed" })
  }


}
