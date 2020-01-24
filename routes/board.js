var express = require('express');
var connection =require('../db/mysql');
var router = express.Router();

/* board list page */
router.get('/list', function(req, res, next) {
    connection.query('select *, date_format(cdate, \'%Y-%m-%d %H:%i:%s\') as cdate from t_board',function(err,rows){
        if(err){
            res.render('boardList',{'status':'Error'});
        }else{
            res.render('boardList',{'status':'OK', 'data':rows});
        }
    });
});

/* board Register page */
router.get('/register', function(req, res, next) {
    res.render('boardRegister');
});

router.post('/register/process', function(req,res,next){
    connection.query('insert into t_board (user_id, user_name, title, content)'
    + 'values(?,?,?,?)',[req.session.login_id,req.session.user_name,req.body.board_title,req.body.board_content],function(err,result){
        if(err){
            res.json({'status':'Error'});
        }else{
            if(result.affectedRows !=0){
                console.log(result.affectedRows);
                res.json({'status':'OK'});
            }else{
                res.json({'status':'Error'});
            }
        }
    });
});

router.get('/list/logout', function(req, res, next) {
    console.log('in logout..');
    req.session.destroy();
    console.log('session distroye...');
    res.redirect('/');
});
router.post('/list/search', function(req, res, next) {
    connection.query('select *, date_format(cdate, \'%Y-%m-%d %H:%i:%s\') as cdate from t_board where (title like ? or content like ?) ',['\%'+req.body.searchKeyword+'\%','\%'+req.body.searchKeyword+'\%'],function(err,rows){
        if(err){
            console.log(err);
            res.render('boardList',{'status':'Error'});
        }else{
            console.log(rows)
            res.render('boardList',{'status':'OK', 'data':rows, 'search':req.body.searchKeyword});
        }
    });
});


/* board Register page */
router.get('/update', function(req, res, next) {
    console.log(req.query.bid)
    connection.query('select * from t_board where bid= ?',[req.query.bid],function(err,rows){
        if(err){
            console.log(err)
            res.render('boardUpdate',{'status':'Error'});
        }else{
            console.log(rows)
            res.render('boardUpdate',{'status':'OK', 'data':rows[0]});
        }
    });
});

router.post('/update/process', function(req,res,next){
    connection.query('update t_board set title=?, content=? where bid=?',[req.body.board_title,req.body.board_content,req.body.bid],function(err,result){
        if(err){
            console.log(err)
            res.json({'status':'Error'});
        }else{
            if(result.affectedRows !=0){
                console.log(result.affectedRows);
                res.json({'status':'OK'});
            }else{
                res.json({'status':'Error'});
            }
        }
    });
});

router.post('/update/delete', function(req,res,next){
    connection.query('delete from t_board where bid=?',[req.body.bid],function(err,result){
        if(err){
            console.log(err)
            res.json({'status':'Error'});
        }else{
            if(result.affectedRows !=0){
                console.log(result.affectedRows);
                res.json({'status':'OK'});
            }else{
                res.json({'status':'Error'});
            }
        }
    });
});

module.exports = router;
