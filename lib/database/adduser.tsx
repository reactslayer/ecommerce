import clientPromise from "../mongodb";

export async function addUser(username:string,  password:string,isMerchant:boolean ){
    console.log("inside addUser");
    try {
        const client = await clientPromise;
        const db = client.db("commerce");
    
        const collection  = db.collection("users");
    
       let result =  await collection.insertOne({username , password, isMerchant});
        return {status: true , id : result.insertedId};
    } catch (error) {
        console.log("inside error of Adduser");
        return {status : false,id:null};
    }


}