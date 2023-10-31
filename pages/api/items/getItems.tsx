import { NextApiRequest, NextApiResponse } from "next";
import getItems from "../../../lib/database/getItems";
export default async function(req:NextApiRequest,res:NextApiResponse){

    const category_items = Array.isArray(req.query["category"])?req.query["category"]:[req.query["category"]];
    
    const result = await getItems(category_items);
    
    res.status(200).json({"status":"success","data":result})

}