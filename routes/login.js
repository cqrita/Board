var express = require('express');
var connection = require('../db/mysql');
var router = express.Router();
var NodeCache = require( "node-cache" );


router.get('/checkid',function(req,res,next){
    console.log(req.query.login_id);
    var select = 'select uid from t_user where login_id=?';
    var selectValue = [req.query.login_id];
    connection.query(select,selectValue,function(err,row,field){
        if(err){
            res.send('ERROR');
        }else{
            if(row.length>0){
                res.send('DUPLICATED')
            }else{
            res.send('OK');
            }
        }
    });
});

router.post('/create', function(req, res, next) {
    var sql = 'INSERT INTO board_db.t_user ' +
            '(login_id, login_pwd, user_name, email) ' +
            'VALUES (?,?,?,?)';     
    var values = [req.body.login_id, req.body.login_pwd, 
                    req.body.user_name, req.body.email];           
    console.log(sql);
    connection.query('select * from t_user where login_id=?', [req.body.login_id],
            function(err, row, field){
                if(err) {
                    res.json({'status':'ERROR'});
                } else {
                    if(row.length > 0) {
                        res.json({'status':'ERROR'});
                    } else {
                        connection.query(sql, values, function(err, row, field) {
                            if(err) {
                                console.log(err);
                                res.json({'status':'ERROR'});
                            } else {
                                res.json({'status':'OK'});
                            }
                        });
                    }
                }
            });
});

/* signup page */
router.get('/signup', function(req, res, next) {
    res.render('signup');
});

/* login ajax process */
router.post('/process', function(req, res, next) {
    console.log(req.body);
    var sql = "select * from t_user where login_id=? and login_pwd=?";
    var values=[req.body.login_id,req.body.login_pwd];
    connection.query(sql,values,function(err,rows){
        if(err){
            res.json({'status':'Fail', 'err_msg':'error please retry.'});
        } else{
            if(rows.length ==1){
                req.session.logined=true;
                req.session.uid=rows[0].uid;
                req.session.login_id=req.body.login_id;
                req.session.user_name=rows[0].user_name;
                res.json({'status':'OK', 'login_id':req.body.login_id});
            } else{
                res.json({'status':'Fail', 'err_msg':'no user'});
            }
        }
    });
    
});

module.exports = router;
