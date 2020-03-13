const jwt = require("jsonwebtoken");

const secret = "secretkey";

function createToken(username) {
    return new Promise((resolve,reject)=>{
        // const user = {
        //     "jti": 1,
        //     "iss": "gumt.top",
        //     "user": "goolge",
        // }
        const token = jwt.sign({username:username}, secret,{expiresIn:60*60*24*3});
        if(token){
            resolve(token);
        }else{
            reject('token error');
        }
    })
}

function checkToken(token) {
    // console.log(111,token)
    return new Promise((resolve, reject) => {
        var info = jwt.verify(token, secret, (err, decoded) => {
            // console.log(2222,err)
            if(err){
                console.log(err.message);
                return;
            }
            console.log(decoded);
        })
        // console.log(333,info)
        resolve(info);
    })
}
module.exports = {
    createToken, checkToken
}