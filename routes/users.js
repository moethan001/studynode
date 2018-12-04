var express = require('express');
var router = express.Router();
var User=require('../model/User');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/data/:no',function(req, res, next) {
  res.send('Writing data is '+req.params.no);

});
router.get('/userdetail/:id',function (req,res,next) {
  User.findById(req.params.id,function (err,rtn) {
    if(err) throw err;
    console.log(req.session.user);
    res.render('user/userdetail',{user1:rtn,title:'Express'});
  });

});
router.get('/userupdate/:id',function (req,res,next) {
  User.findById(req.params.id,function (err,rtn) {
    if(err)throw err;
      res.render('user/userupdate',{title:'Express',user1:rtn});
  });

});
router.get('/list',function (req,res,next) {
  User.find({},function (err,rtn) {
    if(err)throw err;
    console.log(rtn);
    res.render('user/userlist',{user1:rtn});
  });
});
router.post('/userupdate',function (req,res) {
  var update= {
  name:req.body.username,
  email:req.body.useremail,
  password:req.body.userpassword
  }
  User.findByIdAndUpdate(req.body.id,{$set: update},function (err,rtn) {
    if(err) throw err;
    res.redirect('/users/userdetail/'+rtn._id);
  });
});
router.get('/delete/:id',function (req,res) {
  User.findByIdAndRemove(req.params.id,function (err,rtn) {
    if(err)throw err;
    res.redirect('/users/list');
  });
});

router.get('/userdetail1',function(req, res, next) {
  var user={}
  user.name=req.query.username;
  user.email=req.query.useremail;
  user.password=req.query.userpassword;
  res.render('user/userdetail1',{user2:user});

});

module.exports = router;
