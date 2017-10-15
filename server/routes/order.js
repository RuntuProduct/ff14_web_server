var express = require('express');
var router = express.Router();
var Sup = require('../models/sup.js');
var Med = require('../models/med.js');
var Good = require('../models/good.js');
var Order = require('../models/order.js');
var dealRes = require('../utils/dealRes.js');

/* 获取所有订单列表分页（后台管理端） */
router.get('/', function(req, res, next) {
  let {_page, _limit} = req.query;
  _page = parseInt(_page);
  _limit = parseInt(_limit);
  var sort = {'_id': -1};        //排序
  var skipnum = (_page - 1) * _limit;   //跳过数
  var total = 0;
  
  // 分页筛选
  Order.find({}).
  skip(skipnum).
  limit(_limit).
  sort(sort).
  exec(function (err, good) {
    if (err) {
      return console.log(err)
      // return res.redirect('/');
    }
    if (good) {
      Order.find({}, function(err, ress){
        if(err) console.log(err)
        total = ress.length;
        res.set({
          'x-total-count': total
        });
        fillDetail(good, res);
      })
    }
  });
});

/*获取供应商所关联的订单列表分页（供应商端）*/
router.get('/sup', function(req, res, next) {
  let {uid, _page, _limit} = req.query;
  _page = parseInt(_page);
  _limit = parseInt(_limit);
  var sort = {'_id': -1};        //排序
  var skipnum = (_page - 1) * _limit;   //跳过数
  var total = 0;
  
  if(!uid){return dealRes(res, 1, 'need uid!')}

  // 分页筛选
  Order.find({seller_id: uid}).
  skip(skipnum).
  limit(_limit).
  sort(sort).
  exec(function (err, good) {
    if (err) {
      return console.log(err)
      // return res.redirect('/');
    }
    if (good) {
      console.log(good)
      Order.find({seller_id: uid}, function(err, ress){
        if(err) console.log(err)
        total = ress.length;
        res.set({
          'x-total-count': total
        });
        fillDetail(good, res);
      })
    }
  });
});

/* 获取医疗机构所添加的订单列表分页（医疗机构端） */
router.get('/med', function(req, res, next) {
  let {uid, _page, _limit} = req.query;
  _page = parseInt(_page);
  _limit = parseInt(_limit);
  var sort = {'_id': -1};        //排序
  var skipnum = (_page - 1) * _limit;   //跳过数
  var total = 0;

  if(!uid){return dealRes(res, 1, 'need uid!')}
  
  // 分页筛选
  Order.find({buyer_id : uid}).
  skip(skipnum).
  limit(_limit).
  sort(sort).
  exec(function (err, good) {
    if (err) {
      return console.log(err)
      // return res.redirect('/');
    }
    if (good) {
      Order.find({}, function(err, ress){
        if(err) console.log(err)
        total = ress.length;
        res.set({
          'x-total-count': total
        });
        fillDetail(good, res);
      })
    }
  });
});

async function fillDetail(order, res){
  for(let i in order){
    order[i] = order[i].toObject();
    let buyer = await getBuyer(order[i]['buyer_id']);
    let seller = await getSeller(order[i]['seller_id']);
    let target = await getTarget(order[i]['target_id']);
    console.log('await', buyer)
    order[i].buyer = buyer;
    order[i].seller = seller;
    order[i].target = target;
  }
  console.log('getData', order);
  console.log('fin')
  dealRes(res, 0, order);
}

function getBuyer(_id){
  return new Promise(function(resolve, reject){
    Med.findById(_id, function(err, suc){
      if(err){reject(err);}
      if(!suc || suc == null){
        console.log('author not found');
        reject('author not found')
      }else{
        console.log(suc)
        resolve(suc);
      }
    })
  })
}

function getSeller(_id){
  return new Promise(function(resolve, reject){
    Sup.findById(_id, function(err, suc){
      if(err){reject(err);}
      if(!suc || suc == null){
        console.log('author not found');
        reject('author not found')
      }else{
        console.log(suc)
        resolve(suc);
      }
    })
  })
}

function getTarget(_id){
  return new Promise(function(resolve, reject){
    Good.findById(_id, function(err, suc){
      if(err){reject(err);}
      if(!suc || suc == null){
        console.log('author not found');
        reject('author not found')
      }else{
        console.log(suc)
        resolve(suc);
      }
    })
  })
}

/* 添加订单(医疗机构端) */
router.post('/add', function(req, res, next) {
  let getOrder = req.body;
  console.log(getOrder);
  if(!getOrder.buyer_id){return dealRes(res, 1, 'need buyer id!')}
  if(!getOrder.seller_id){return dealRes(res, 1, 'need seller id!')}
  if(!getOrder.target_id){return dealRes(res, 1, 'need target id!')}
  // 创建传值对象
  let newObj = {};
  newObj.buyer_id = getOrder.buyer_id;
  newObj.seller_id = getOrder.seller_id;
  newObj.target_id = getOrder.target_id;
  newObj.bNum = getOrder.bNum;
  newObj.price = getOrder.price;
  newObj.state = 'wait';
  newObj.create_date = new Date();
  let newOrder = Order(newObj);
  newOrder.save(function(err, suc){
    if(err){
      console.log(err)
    }
    return dealRes(res, 0, suc);
  })
});

/*取消订单(医疗机构端)*/
router.post('/med/:_id', function(req, res, next) {
  let _id = req.params._id;
  Order.findById(_id, function(err, fUser) {
    if(err) return console.log(err);
    if(fUser.state != 'wait'){
      return dealRes(res, 1, 'order had been confirm!')
    }else{
      delete fUser._id;   // 取出主键
      // 更新可配置属性
      fUser.state = 'fail';
      Order.update({_id: _id}, fUser, function(err, suc) {
        if(err) console.log(err);
        dealRes(res, 0, {_id: _id});
      })
    }
  })
})

/*更新订单状态(供应商端)*/
router.post('/sup/:_id', function(req, res, next) {
  let _id = req.params._id;
  let { state } = req.body;
  console.log(state)
  if(!_id){return dealRes(res, 1, 'need user id!')}
  if(!state || (state != 'confirm' && state != 'transport' && state != 'complete' && state != 'fail')){return dealRes(res, 1, 'state error!')}
  Order.findById(_id, function(err, fUser) {
    if(err) return console.log(err);
    let nowState = fUser.state;
    if(nowState == 'fail'){
      return dealRes(res, 1, 'order had been fail!');
    }else if(nowState == 'complete'){
      return dealRes(res, 1, 'order had been complete!');
    }else{
      if(nowState == 'transport' && state == 'confirm'){
        return dealRes(res, 1, 'you can not do this!');
      }
      delete fUser._id;   // 取出主键
      // 更新可配置属性
      fUser.state = state;
      Order.update({_id: _id}, fUser, function(err, suc) {
        if(err) console.log(err);
        dealRes(res, 0, {_id: _id});
      })
    }
  })
})

module.exports = router;