//sql.js
// SQL语句封裝
var order = {
    insert:'INSERT INTO order(userid, productid ,num,type) VALUES(?,?,?,?)',
    update:'UPDATE order SET name=?, age=?,phone=? WHERE id=?',
    delete: 'DELETE FROM order WHERE id=?',
    queryById: 'SELECT * FROM order WHERE id=?',
    queryAll: 'SELECT * FROM order'
};
module.exports = order;