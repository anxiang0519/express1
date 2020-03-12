//json.js
//封装接送模块
var json = function(res, result) {
    console.log(result);
    if (typeof result === 'undefined') {
        res.json({
            code: 1,
            msg: '操作失败'
        });
    } else if (result.code === 200) {
        var resobj = {code:200,msg:"操作成功"}
        if(result.data){
            resobj['data'] = result.data;
        }
        if(result.token){
            resobj['token'] = result.token;
        }
        res.json(resobj);
    } else {
        res.json(result);
    }
};
module.exports = json;