const jwt = require("jsonwebtoken");

const secret = "secretkey";

function createToken(username) {
    // payload.rtiem = new Date();
    // payload.exp = 60 * 60 * 2 *1000;
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
    return new Promise((resolve, reject) => {
        var info = jwt.verify(token, secret, (err, decoded) => {
            // if (!err) {
            //     resolve(res)
            // } else {
            //     reject("token验证失败");
            // }
            console.log(err)
            if(err){
                console.log(err.message);
                return;
            }
            console.log(decoded);
        })
        resolve(info);
    })
}
module.exports = {
    createToken, checkToken
}