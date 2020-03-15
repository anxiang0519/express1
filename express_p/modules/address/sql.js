//sql.js
// SQL语句封裝
var address = {
    insert: 'INSERT INTO address(userid, name,phone,areacode,areaname,location,type) VALUES(?,?,?,?,?,?,?)',
    update: 'UPDATE address SET name = ?,phone = ?,areacode = ?,areaname = ?,location = ?,type = ? WHERE userid=?',
    delete: 'DELETE FROM address WHERE id=?',
    queryById: 'SELECT * FROM address WHERE id=?',
    queryByUserId: 'SELECT * FROM address where userid = ?',
    queryAll: 'SELECT * FROM address',
};
module.exports = address;