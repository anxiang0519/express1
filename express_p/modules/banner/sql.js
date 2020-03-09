//sql.js
// SQL语句封裝
var banner = {
    insert:'INSERT INTO table2(id, name, age ,phone) VALUES(?,?,?,?)',
    update:'UPDATE table2 SET name=?, age=?,phone=? WHERE id=?',
    delete: 'DELETE FROM table2 WHERE id=?',
    queryById: 'SELECT * FROM table2 WHERE id=?',
    queryAll: 'SELECT * FROM table2',
    login:'SELECT * FROM table1 WHERE username = ? and password= ?',
    register:'INSERT INTO table1(id, username, password ,1) VALUES(?,?,?)',
};
module.exports = banner;