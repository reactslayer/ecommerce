import clientPromise from "./mongodb";
import type { NextRequest, NextResponse } from 'next/server'
import type { NextApiResponse ,NextApiRequest} from "next";
export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const client = await clientPromise;
    const db = client.db("commerce");
    switch (req.method) {
      case "POST":
        var body = JSON.parse(req.body);
        res.json({data : body})

        break;
      case "GET":
        const allPosts = await db.collection("users").find({}).toArray();
        res.json({data : allPosts});
        break;
    }
  }
 
  
  export async function checkAvailableUsername(username:String){

    
    try {
      const client = await clientPromise;
      
      const db = await client.db("commerce");

      const allPosts = await db.collection("users").find({"username" : username}).toArray();
      if(allPosts.length!=0){
        return false;
      }    
      return true;
  
    } catch (error) {
      console.log(error)
      return false;
    }
   
  }