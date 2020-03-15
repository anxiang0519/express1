//sql.js
// SQL语句封裝
var shopcar = {
    insert: 'INSERT INTO shopcar(userid, productid ,num,updatetime) VALUES(?,?,?,?)',
    update: 'UPDATE shopcar SET name=?, age=?,phone=? WHERE id=?',
    delete: 'DELETE FROM shopcar WHERE id=?',
    queryById: 'SELECT * FROM shopcar WHERE id=?',
    wxqueryAll: 'SELECT a.id,a.num,b.id as productid,b.price,b.description,b.productname,b.preimgurl  FROM shopcar as a left join product b on a.productid = b.id where a.userid=?',
    queryAll: 'SELECT a.id,a.num,b.id as productid,b.price,b.description,b.productname,b.preimgurl  FROM shopcar as a left join product b on a.productid = b.id'
};
module.exports = shopcar;