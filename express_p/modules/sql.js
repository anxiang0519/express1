//sql.js
// SQL语句封裝
var user = {
    insert:'INSERT INTO user(id, name, age ,phone) VALUES(?,?,?,?)',
    update:'UPDATE user SET name=?, age=?,phone=? WHERE id=?',
    delete: 'DELETE FROM user WHERE id=?',
    queryById: 'SELECT * FROM user WHERE id=?',
    queryAll: 'SELECT * FROM user',
    login:'SELECT * FROM loginuser WHERE username = ? and password= ?',
    register:'INSERT INTO loginuser(id, username, password ,1) VALUES(?,?,?)',
};
module.exports = user;