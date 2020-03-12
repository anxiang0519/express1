//sql.js
// SQL语句封裝
var userinfo = {
    insert:'INSERT INTO userinfo(nickname,avatarurl,city,country,gender,language,province,logintime) VALUES(?,?,?,?,?,?,?,?)',
    update:'UPDATE userinfo SET wxname=?, wxid=?,logintime=? WHERE id=?',
    delete: 'DELETE FROM userinfo WHERE id=?',
    queryById: 'SELECT * FROM userinfo WHERE id=?',
    queryAll: 'SELECT * FROM userinfo'
};
module.exports = userinfo;