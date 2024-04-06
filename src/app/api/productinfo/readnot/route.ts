// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest,  NextResponse } from 'next/server';
import CreateConnection from "../../models/CreateConnection"
import Productinfo from '../../models/Productinfo'
import Product from '../../models/Product';
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

    
    let pinfo = await Productinfo.find({}).select({product_token:1,_id:0})
    console.log(JSON.stringify(pinfo))
    if(!pinfo){
      let processIds = await Product.find({}).select({source:1,website:1,token:1,_id:0}).limit(10000)
      return NextResponse.json({ data:processIds, message: "Product Exist in system" })
    }else{
      let pin:any = []
      pinfo.map((item)=>{
        pin.push(item.product_token)
      })
      let processIds = await Product.find({token:{"$nin":pin}}).select({source:1,website:1,token:1,_id:0}).limit(1000)
      return NextResponse.json({ data:processIds, message: "Product Exist in system" })
    }
    
  } else {
    return NextResponse.json({ data:"", message: "Method Not Allowed" })
  }


}
