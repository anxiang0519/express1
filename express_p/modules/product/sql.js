//sql.js
// SQL语句封裝
var product = {
    insert:'INSERT INTO product(id, name, age ,phone) VALUES(?,?,?,?)',
    update:'UPDATE product SET name=?, age=?,phone=? WHERE id=?',
    delete: 'DELETE FROM product WHERE id=?',
    queryById: 'SELECT * FROM product WHERE id=?',
    queryAll: 'SELECT * FROM product'
};
module.exports = product;