const jwt = require("jsonwebtoken");

const secret = "secretkey";

function createToken(payload) {
    // payload.rtiem = new Date();
    // payload.exp = 60 * 60 * 2 *1000;
    const user = {
        "jti": 1,
        "iss": "gumt.top",
        "user": "goolge",
    }
    return jwt.sign(user, secret,{expiresIn:'1day'});
}

function checkToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, res) => {
            if (!err) {
                resolve(res)
            } else {
                reject("token验证失败");
            }
        })
    })
}
module.exports = {
    createToken, checkToken
}