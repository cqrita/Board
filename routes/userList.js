var express = require('express');
var connection =require('../db/mysql');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/list', function(req, res, next) {
  connection.query('select *, date_format(cdate, \'%Y-%m-%d %H:%i:%s\') as cdate from t_user',function(err,rows){
      if(err){
          res.render('userList',{'status':'Error'});
      }else{
          res.render('userList',{'status':'OK', 'data':rows});
      }
  });
});

router.get('/list/logout', function(req, res, next) {
  console.log('in logout..');
  req.session.destroy();
  console.log('session distroye...');
  res.redirect('/');
});
module.exports = router;

router.get('/update', function(req, res, next) {
  console.log(req.query.uid,"somthing")
  connection.query('select * from t_user where uid= ?',[req.query.uid],function(err,rows){
      if(err){
          console.log(err);
          res.render('user', {'status':'Error'});
      }else{
          console.log(rows[0]);
          res.render('user', {'status':'OK', 'data':rows[0]});
      }
  });
});

router.post('/update/process', function(req,res,next){
  connection.query('update t_user set user_name=?, email=? where uid=?',[req.body.user_name,req.body.email,req.body.uid],function(err,result){
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
  connection.query('delete from t_user where uid=?',[req.body.uid],function(err,result){
      if(err){
          console.log(err)
          res.json({'status':'Error'});
      }else{
          if(result.affectedRows !=0){
              console.log(result.affectedRows);
              req.session.destroy();
              res.json({'status':'OK'});
          }else{
              res.json({'status':'Error'});
          }
      }
  });
});