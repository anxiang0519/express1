//sql.js
// SQL语句封裝
var shopcar = {
    insert:'INSERT INTO shopcar(id, userid, productid ,num,type,updatetime) VALUES(?,?,?,?)',
    update:'UPDATE shopcar SET name=?, age=?,phone=? WHERE id=?',
    delete: 'DELETE FROM shopcar WHERE id=?',
    queryById: 'SELECT * FROM shopcar WHERE id=?',
    queryAll: 'SELECT * FROM shopcar'
   
};
module.exports = shopcar;