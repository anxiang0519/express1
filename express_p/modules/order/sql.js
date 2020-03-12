//sql.js
// SQL语句封裝
var order = {
    insert:'INSERT INTO orders(userid, productid ,num,type) VALUES(?,?,?,?)',
    update:'UPDATE orders SET name=?, age=?,phone=? WHERE id=?',
    delete: 'DELETE FROM orders WHERE id=?',
    queryById: 'SELECT * FROM orders WHERE id=?',
    queryAll: 'SELECT * FROM orders'
};
module.exports = order;