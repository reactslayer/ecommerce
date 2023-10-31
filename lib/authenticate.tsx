import jwt from "jsonwebtoken"
export default function authenticateUser(req,res){
    const cookies = req.cookies;

  const mycookie = cookies["session-cookie"]



  //console.log("cookie is ", mycookie)
  if(mycookie == undefined){
    return {props : {isauthenticated : false}}
  }

  try{
    const decoded = jwt.verify(mycookie, process.env["json_key"]);
    return {props : {isauthenticated : true , decoded : decoded}}
  }
  catch(e){
    return {props : {isauthenticated : false}}
  }
}