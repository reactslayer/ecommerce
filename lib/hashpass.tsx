import bcrypt from "bcrypt";
export default async function hashPass(password : string){
    try{
        const saltRounds = 10;

        const salt = await bcrypt.genSalt(saltRounds);

        let hash = await bcrypt.hash(password , salt);

        // return bcrypt.hash(password , 10 ).then(function(hash:string){
        //     return hash;
        // })

        return hash;
    }
    catch(e){
        return e;
    }
    

}