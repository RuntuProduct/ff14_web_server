var express = require('express');
var router = express.Router();
var Admin = require('../models/admin.js');
var Sup = require('../models/sup.js');
var Med = require('../models/med.js');
var dealRes = require('../utils/dealRes.js');

/* 获取管理员信息 */
router.get('/a', function(req, res, next) {
  let {uid} = req.query;
  if(!uid){return dealRes(res, 1, 'need uid')}
  Admin.findById(uid, function(err, suc){
    if(err){return console.log(err)}
    if(!suc || suc == null){
      return dealRes(res, 1, 'user not exist!');
    }else{
      return dealRes(res, 0, {name: suc.name})
    }
  });
});

/*管理员登录*/
router.post('/a', function(req, res, next) {
  let {account, pwd} = req.query;
  if(!account){return dealRes(res, 1, 'need account')}
  if(!pwd){return dealRes(res, 1, 'need pwd')}
  Admin.find({account : account}, function(err, suc){
    if(err){return console.log(err)}
    if(!suc || suc == null || !suc.length){
      return dealRes(res, 1, 'user not exist!');
    }else{
      let admin = suc[0];
      if(admin.pwd != pwd){
        return dealRes(res, 1, 'pwd error!')
      }else{
        // 设置30分钟的uid-cookies
        res.cookie('admin_id', admin._id.toString(), { maxAge: 18000000 });  // 300分钟
        return dealRes(res, 0, {name: admin.name})
      }
    }
  });
});

/* 获取供应商信息 */
router.get('/s', function(req, res, next) {
  let {uid} = req.query;
  if(!uid){return dealRes(res, 1, 'need uid')}
  Sup.findById(uid, function(err, suc){
    if(err){return console.log(err)}
    if(!suc || suc == null){
      return dealRes(res, 1, 'user not exist!');
    }else{
      return dealRes(res, 0, suc)
    }
  });
});

/*供应商登录*/
router.post('/s', function(req, res, next) {
  let {account, pwd} = req.query;
  if(!account){return dealRes(res, 1, 'need account')}
  if(!pwd){return dealRes(res, 1, 'need pwd')}
  Sup.find({account : account}, function(err, suc){
    if(err){return console.log(err)}
    if(!suc || suc == null || !suc.length){
      return dealRes(res, 1, 'user not exist!');
    }else{
      let sup = suc[0];
      if(sup.pwd != pwd){
        return dealRes(res, 1, 'pwd error!')
      }else if(sup.disabled){
        return dealRes(res, 1, 'you do not have permission to log in!')
      }else{
        // 设置300分钟的uid-cookies
        res.cookie('sup_id', sup._id.toString(), { maxAge: 18000000 });  // 300分钟
        return dealRes(res, 0, sup)
      }
    }
  });
});

/* 获取医疗机构信息 */
router.get('/m', function(req, res, next) {
  let {uid} = req.query;
  if(!uid){return dealRes(res, 1, 'need uid')}
  Med.findById(uid, function(err, suc){
    if(err){return console.log(err)}
    if(!suc || suc == null){
      return dealRes(res, 1, 'user not exist!');
    }else{
      return dealRes(res, 0, suc)
    }
  });
});

/*医疗机构登录*/
router.post('/m', function(req, res, next) {
  let {account, pwd} = req.query;
  if(!account){return dealRes(res, 1, 'need account')}
  if(!pwd){return dealRes(res, 1, 'need pwd')}
  Med.find({account : account}, function(err, suc){
    if(err){return console.log(err)}
    if(!suc || suc == null || !suc.length){
      return dealRes(res, 1, 'user not exist!');
    }else{
      let sup = suc[0];
      if(sup.pwd != pwd){
        return dealRes(res, 1, 'pwd error!')
      }else if(sup.disabled){
        return dealRes(res, 1, 'you do not have permission to log in!')
      }else{
        // 设置300分钟的uid-cookies
        res.cookie('med_id', sup._id.toString(), { maxAge: 18000000 });  // 300分钟
        return dealRes(res, 0, sup)
      }
    }
  });
});

module.exports = router;