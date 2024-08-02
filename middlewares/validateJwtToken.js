
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || "test@123";
const { db } = require("../models/index");
module.exports =
{
    async generatejwttoken(data,res) {
        return new Promise((resolve, reject) => {
          jwt.sign(
            {
              data,
            },
            JWT_SECRET,
            { expiresIn: "1h" },
            (err, token) => {
              if (err) {
                console.log(err)
                return resolve(
                  res
                    .status(200)
                    .json({status:400,data:{},Message:"Error in generating the token"})
                );
              }
              
              console.log(token)
              return resolve(token);
            }
          );
        });
      },
      async validateToken(req, res, next) {
        try {
    
          const secret = process.env.JWT_SECRET;
        const token = req.headers.authorization;
        const tokenArray=token.split(" ");
        const actualToken=tokenArray[1];
        
    
          jwt.verify(actualToken, secret, (err, data) => {
            if (err) {
                return res
                .status(200)
                .json({status:400,data:{},Message:"Error in verifying the token"})
            
              
            } else {
             console.log("Token verified data =====>>>> ",data);
              req.user = data.data;
              next();
            }
          });
        } catch (error) {
            return res
            .status(402)
            .json({status:400,data:{},Message:"Wrong Bearer Token"})
        }
      }
    
}
