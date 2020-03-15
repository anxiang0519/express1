//handel.js
/*
    数据增删改查模块封装
    req.query 解析GET请求中的参数 包含在路由中每个查询字符串参数属性的对象，如果没有则为{}
    req.params 包含映射到指定的路线“参数”属性的对象,如果有route/user/：name，那么“name”属性可作为req.params.name
    req.body通常用来解析POST请求中的数据
     +req.query.id 可以将id转为整数
     */
// 引入mysql
var mysql = require('mysql');
// 引入mysql连接配置
var mysqlconfig = require('../../config/mysql');
// 引入连接池配置
var poolextend = require('../poolextend');
// 引入SQL模块
var sql = require('./sql');
// 引入json模块
var json = require('../json');

var token = require('../../config/token')
// 使用连接池，提升性能
var pool = mysql.createPool(poolextend({}, mysqlconfig));
var user = {
    add: function(req, res, next) {
        var param = req.body;
        // if (param.age == null || param.name == null||param.phone == null) {
        //     json(res, undefined);
        //     return;
        // }
        pool.getConnection(function(err, connection) {
            connection.query(sql.insert, [param.nickName,param.avatarUrl,param.city,param.country,param.gender,param.language,param.province,param.logintime], function(err, result) {
                if (result) {
                 var _result = result;
                 result = {
                    code: 200 ,
                    data: _result
                }
            }
                // 以json形式，把操作结果返回给前台页面
                json(res, result);
                // 释放连接 
                connection.release();
            });
        });
    },
    delete: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            var id = +req.query.id;
            connection.query(sql.delete, id, function(err, result) {
                if (result.affectedRows > 0) {
                    var _result = result;
                    result = {
                        code: 200 ,
                        data: _result
                    }
                } else {
                    result = undefined;
                }
                json(res, result);
                connection.release();
            });
        });
    },
    update: function(req, res, next) {
        var param = req.body;
        // if (param.name == null || param.age == null || param.id == null||param.phone == null) {
        //     json(res, undefined);
        //     return;
        // }
        pool.getConnection(function(err, connection) {
            connection.query(sql.update, [param.wxname, param.wxid,param.logintime, +param.id], function(err, result) {
                if (result.affectedRows > 0) {
                    var _result = result;
                    result = {
                        code: 200 ,
                        data: _result
                    }
                } else {
                    result = undefined;
                }
                json(res, result);
                connection.release();
            });
        });
    },
    queryById: function(req, res, next) {
        var id = req.query.id;
        pool.getConnection(function(err, connection) {
            connection.query(sql.queryById, id, function(err, result) {
                if (result != '') {
                    var _result = result;
                    result = {
                        code: 200 ,
                        data: _result
                    }
                } else {
                    result = undefined;
                }
                json(res, result);
                connection.release();
            });
        });
    },
    queryAll: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query(sql.queryAll, function(err, result) {
                if (Object.prototype.toString.call(result)== '[object Array]') {
                    var _result = result;
                    result = {
                        code: 200 ,
                        data: _result
                    }
                } else {
                    result = undefined;
                }
                json(res, result);
                connection.release();
            });
        });
    },
    login: function(req, res, next) {
        var username = req.query.username;
        var password = req.query.password;
        pool.getConnection(function(err, connection) {
            connection.query(sql.login,[username,password], function(err, result) {
                console.log(123)
                if (Object.prototype.toString.call(result)== '[object Array]') {
                    token.createToken(username).then(token=>{
                        var _result = result;
                        result = {
                            code: 200,
                            data: _result,
                            token:token
                        }
                        json(res, result);
                        connection.release();
                    })
                } else {
                    result = undefined;
                    json(res, result);
                    connection.release();
                }
            });
        });
    },
    wxlogin: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query(sql.wxlogin,[req.body.nickName,req.body.avatarUrl,req.body.city,req.body.country,req.body.gender,req.body.language,req.body.province,req.body.logintime],function(err, result) {
                if (result) {
                    token.createToken(req.body.nickname).then(token=>{
                        var _result = result;
                        result = {
                            code: 200,
                            data: _result,
                            token:token
                        }
                        json(res, result);
                        connection.release();
                    })
                } else {
                    result = undefined;
                    json(res, result);
                    connection.release();
                }
            });
        });
    }
};
module.exports = user;