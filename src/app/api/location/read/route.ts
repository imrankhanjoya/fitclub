// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextRequest,  NextResponse } from 'next/server';
import CreateConnection from "../../models/CreateConnection"
import Location from '../../models/Location';
const md5 =  require("md5");

//const User = require("../models/User")
CreateConnection()

type Data = {
  data: string,
  message: string
}

export async function POST(req:NextRequest,res:NextResponse<Data>) {

  const postvalue = await req.json()
  const query = postvalue.query
  const select = postvalue.select || {}
  const limit = postvalue.limit || 100        
  let selectData = await Location.findOne(query).select(select).limit(limit)
  if(!selectData){
    return NextResponse.json({ data: false, message: "Website not found" })
  }else{
    return NextResponse.json({ data: selectData, message: "Website Exist in system" })
  }
  

}
