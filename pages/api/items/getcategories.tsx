import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
import authenticateUser from "../../../lib/authenticate";

export default async function getCategories(req : NextApiRequest,res : NextApiResponse){

    //check authentication status
    let data = authenticateUser(req,res);
    if(!data["props"]["isauthenticated"]){
        console.log("inside");
        res.status(400).json({status : "Not Authenticated"})
        return;
    }
    else{

        const user = data.props;

        let client = await clientPromise;

        const db = client.db("commerce");
    
        const collection  = await db.collection("categories");

        let result = await collection.find({}).toArray();

        res.status(200).json({status : "success" , categories : result})
        return 
    }



}