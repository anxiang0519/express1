//sql.js
// SQL语句封裝
var address = {
    insert:'INSERT INTO userinfo(id, name, age ,phone) VALUES(?,?,?,?)',
    update:'UPDATE userinfo SET name=?, age=?,phone=? WHERE id=?',
    delete: 'DELETE FROM userinfo WHERE id=?',
    queryById: 'SELECT * FROM userinfo WHERE id=?',
    queryAll: 'SELECT * FROM userinfo'
};
module.exports = address;