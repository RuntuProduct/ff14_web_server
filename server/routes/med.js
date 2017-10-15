var express = require('express');
var router = express.Router();
var Med = require('../models/med.js');
var multer  = require('multer');
var dealRes = require('../utils/dealRes.js');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    let nameNow = file.originalname.split('.');
    cb(null, nameNow[0] + '-' + Date.now() + '.' + nameNow[1])
  }
})
// var upload = multer({ dest: 'uploads/' });
var upload = multer({ storage: storage })

/* 获取供应商列表分页 */
router.get('/', function(req, res, next) {
  let {_page, _limit} = req.query;
  _page = parseInt(_page);
  _limit = parseInt(_limit);
  var sort = {'_id': -1};        //排序
  var skipnum = (_page - 1) * _limit;   //跳过数
  var total = 0;
  
  // 分页筛选
  Med.find({}).
  skip(skipnum).
  limit(_limit).
  sort(sort).
  exec(function (err, good) {
    if (err) {
      return console.log(err)
      // return res.redirect('/');
    }
    if (good) {
      Med.find({}, function(err, ress){
        if(err) console.log(err)
        total = ress.length;
        res.set({
          'x-total-count': total
        });
        return dealRes(res, 0, good);
      })
    }
  });
});

/*删除供应商*/
router.delete('/:_id', function(req, res, next) {
  let _id = req.params._id;
  Med.remove({_id: _id}, function(err, suc) {
    if(err) console.log(err);
    // console.log(suc.result);
    return dealRes(res, 0, {_id: _id});
  })
})

let buildGood = (form, obj) => {
  // 将传入的表单数据更新到目标对象
  if(form.name){obj.name = form.name}
  if(form.area){obj.area = form.area}
  if(form.info){obj.info = form.info}
  if(form.phone){obj.phone = form.phone}
  if(form.fax){obj.fax = form.fax}
  if(form.address){obj.address = form.address}
  if(form.website){obj.website = form.website}
  if(form.admins){obj.admins = form.admins}
}

/*编辑供应商(企业信息)*/
router.patch('/:_id', function(req, res, next) {
  let _id = req.params._id;
  let getUser = req.body;
  Med.findById(_id, function(err, fUser) {
    if(err) return console.log(err);
    delete fUser._id;   // 取出主键
    // 更新可配置属性
    buildGood(getUser, fUser);
    Med.update({_id: _id}, fUser, function(err, suc) {
      if(err) console.log(err);
      dealRes(res, 0, {_id: _id});
    })
  })
})

/*编辑供应商(登录信息)*/
router.patch('/pwd/:_id', function(req, res, next) {
  let _id = req.params._id;
  let getUser = req.body;
  Med.findById(_id, function(err, fUser) {
    if(err) return console.log(err);
    delete fUser._id;   // 取出主键
    // 更新可配置属性
    if(getUser.pwd){fUser.pwd = getUser.pwd}
    Med.update({_id: _id}, fUser, function(err, suc) {
      if(err) console.log(err);
      dealRes(res, 0, {_id: _id});
    })
  })
})

/* 添加供应商(登录信息) */
router.post('/add', function(req, res, next) {
  let getMed = req.body;
  console.log(getMed);
  if(!getMed.account){return dealRes(res, 1, 'need account!')}
  if(!getMed.pwd){return dealRes(res, 1, 'need pwd!')}
  if(getMed.disabled == undefined){return dealRes(res, 1, 'need disabled!')}
  let newMed = Med({
    account: getMed.account,
    pwd: getMed.pwd,
    disabled: getMed.disabled
  });
  newMed.save(function(err, suc){
    if(err){
      console.log(err)
      if(err.code == 11000){
        return dealRes(res, 1, 'account repeat!')
      }
    }
    return dealRes(res, 0, suc);
  })
});

/* 编辑供应商(登录信息) */
router.patch('/add/:_id', function(req, res, next) {
  let _id = req.params._id;
  let getMed = req.body;
  console.log(getMed);
  if(!_id){return dealRes(res, 1, 'need uid!')}
  if(!getMed.pwd){return dealRes(res, 1, 'need pwd!')}
  if(getMed.disabled == undefined){return dealRes(res, 1, 'need disabled!')}
  Med.findById(_id, function(err, suc){
    if(err){return console.log(err)}
    if(!suc || suc == null){
      return dealRes(res, 1, 'sup not exist!')
    }else{
      delete suc._id; // 剔除主键
      // 更新可配置属性
      if(getMed.pwd){suc.pwd = getMed.pwd}
      if(getMed.disabled){suc.disabled = getMed.disabled}
      Med.update({_id: _id}, suc, function(err, suc){
        if(err){return console.log(err)}
        return dealRes(res, 0, 'success');
      });
    }
  })
});

/*上传图片*/
router.post('/upload', upload.single('file'), function(req, res, next){
  let file = req.file;
  console.log(file);
  dealRes(res, 0, file);
})

module.exports = router;