import type { NextApiRequest, NextApiResponse } from 'next'
import {checkAvailableUsername} from '../../lib/users';
import hashPass from '../../lib/hashpass';
import { addUser } from '../../lib/database/adduser';
import clientPromise from '../../lib/mongodb';
import { generateKey } from '../../lib/token/handle';
import { setCookie } from 'cookies-next';

export default async function(req: NextApiRequest,res:NextApiResponse){
    
    const body = req.body;

    const username = body['username'];
    const password = body['password'];
    const cpassword = body['cpassword'];
    const merchant = body['merchant'];
    //console.log(username,password,merchant,cpassword)
    if(username== undefined || password == undefined || cpassword==undefined
        || merchant == undefined){
            res.status(400).json({status : "Enter valid data"})
        }
    if(String(cpassword)!=String(password)){
        res.status(400).json({status : "Passwords dont match"})

    }
    
    if(!validate(username)||!validate(password)){
        res.status(400).json({status : "Invalid username or password. At least 5 alpha numeric characters long and less than 15"})
        return;

    }
    let v = await checkAvailableUsername(username);
    if(!v){
        res.status(400).json({status : "Username has already been taken!...lol"})
        return;
    }
    
    const hash_pass  = await hashPass(password);
    const data = await addUser(username,hash_pass, merchant=="true");
    if(data["status"]){

        const user=  {
            id : data["id"],
            username : username,
            isMerchant : merchant

        }

        const jwt_id = generateKey(user);

        const cookieName = 'session-cookie';
        const cookieValue = jwt_id;
        const maxAge = 100;
        const cookieOptions = {
          maxAge: 3600, // Cookie expires in 1 hour (in seconds)
          httpOnly: true, // Cookie is accessible only through HTTP(S) requests
          secure: false, // Set to 'true' if your site uses HTTPS
        };
        // res.setHeader('Set-Cookie',
        // `${cookieName}=${cookieValue}; Max-Age=${cookieOptions.maxAge}; HttpOnly; ${cookieOptions.secure ? 'Secure;' : ''}`)
        setCookie(
            cookieName,jwt_id,{
                req,
                res,
                maxAge: maxAge,
                path : "/"
            }
        )
        console.log("cookie!")
        res.status(200).json({status : "success" , redirect : "/dashboard"});
        return ;
    }
    else{
        res.status(500).json({message : "Something went wrong"})
        return;
    }
   





    //res.setHeader('Set-Cookie', 'session=example; HttpOnly; Path=/; SameSite=Strict');
    res.status(200).json({redirect : "/dashboard"})
}

function validate(username) {
    // Define your criteria for a valid username
    const minLength = 5; // Minimum length
    const maxLength = 15; // Maximum length
    const allowedCharacters = /^[a-zA-Z0-9_]+$/; // Only letters, numbers, and underscores
  
    // Check the length
    if (username.length < minLength || username.length > maxLength) {
      return false;
    }
  
    // Check if it contains only allowed characters
    if (!allowedCharacters.test(username)) {
      return false;
    }
  
    // If all checks pass, the username is valid
    return true;
  }
 
