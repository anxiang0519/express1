//sql.js
// SQL语句封裝
var user = {
    insert:'INSERT INTO user(username,password,type) VALUES(?,?,?)',
    update:'UPDATE user SET wxname=?, wxid=?,logintime=? WHERE id=?',
    delete: 'DELETE FROM user WHERE id=?',
    queryById: 'SELECT * FROM user WHERE id=?',
    queryAll: 'SELECT * FROM user',
    login:'SELECT * FROM user where username=? and password=?',
    wxlogin:'INSERT INTO userinfo(nickname,avatarurl,city,country,gender,language,province,logintime) VALUES(?,?,?,?,?,?,?,?)'
};
module.exports = user;