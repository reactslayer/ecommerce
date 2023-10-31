import jwt from "jsonwebtoken";

export function generateKey(user ) {

    const secret_key = process.env.json_key;
    const payload = {
        userId: user.id,
        username: user.username,
        isMerchant : user.isMerchant
      };
    const options = {
        expiresIn: '1h', // Token expiration time
      };
      return jwt.sign(payload, secret_key, options);


}