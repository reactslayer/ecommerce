import clientPromise from "../mongodb";
import bcrypt from "bcrypt"
export default async function getUser(username:string , password:string){
    let client = await clientPromise;

    const db = client.db("commerce");
    
    const collection  = db.collection("users");


    let result = await collection.findOne({username : username });

    if(result!=null){
        const hash_pass = result.password;
        let data = await  bcrypt.compare(password ,hash_pass);
        if(data){
            return {
                _id : result._id,
                username : result.username,
                isMerchant : result.isMerchant
            }
        }
        else{
            return null
        }
    }
    
    return null;    
}