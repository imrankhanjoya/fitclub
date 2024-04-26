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
  const data = postvalue.data
         
  let selectData = await Location.create(data)
  if(!selectData){
    return NextResponse.json({ data: false, message: "Website not found" })
  }else{
    return NextResponse.json({ data: selectData, message: "Website Exist in system" })
  }
  

}
