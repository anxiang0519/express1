//sql.js
// SQL语句封裝
var address = {
    insert:'INSERT INTO address(id, name, age ,phone) VALUES(?,?,?,?)',
    update:'UPDATE address SET name=?, age=?,phone=? WHERE id=?',
    delete: 'DELETE FROM address WHERE id=?',
    queryById: 'SELECT * FROM address WHERE id=?',
    queryAll: 'SELECT * FROM address'
};
module.exports = address;