var express = require('express');
var router = express.Router();
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

/* 获取所有药品列表分页（后台管理端） */
router.get('/', function(req, res, next) {
  let {_page, _limit} = req.query;
  _page = parseInt(_page);
  _limit = parseInt(_limit);
  var sort = {'_id': -1};        //排序
  var skipnum = (_page - 1) * _limit;   //跳过数
  var total = 0;
  
  // 分页筛选
  Good.find({}).
  skip(skipnum).
  limit(_limit).
  sort(sort).
  exec(function (err, good) {
    if (err) {
      return console.log(err)
      // return res.redirect('/');
    }
    if (good) {
      Good.find({}, function(err, ress){
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

/*获取供应商创建所有药品列表分页（供应商端）*/
router.get('/mine', function(req, res, next) {
  let {uid, _page, _limit} = req.query;
  _page = parseInt(_page);
  _limit = parseInt(_limit);
  var sort = {'_id': -1};        //排序
  var skipnum = (_page - 1) * _limit;   //跳过数
  var total = 0;
  
  if(!uid){return dealRes(res, 1, 'need uid!')}

  // 分页筛选
  Good.find({creatorId: uid}).
  skip(skipnum).
  limit(_limit).
  sort(sort).
  exec(function (err, good) {
    if (err) {
      return console.log(err)
      // return res.redirect('/');
    }
    if (good) {
      Good.find({}, function(err, ress){
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

/* 获取所有药品列表分页（医疗机构端） */
router.get('/med', function(req, res, next) {
  let {_page, _limit} = req.query;
  _page = parseInt(_page);
  _limit = parseInt(_limit);
  var sort = {'_id': -1};        //排序
  var skipnum = (_page - 1) * _limit;   //跳过数
  var total = 0;
  
  // 分页筛选
  Good.find({state : 'normal'}).
  skip(skipnum).
  limit(_limit).
  sort(sort).
  exec(function (err, good) {
    if (err) {
      return console.log(err)
      // return res.redirect('/');
    }
    if (good) {
      Good.find({}, function(err, ress){
        if(err) console.log(err)
        total = ress.length;
        res.set({
          'x-total-count': total
        });
        findAuthor(good, res);
      })
    }
  });
});

async function findAuthor(good, res){
  for(let i in good){
    good[i] = good[i].toObject();
    let _id = good[i]['creatorId'];
    let data = await getAuthor(_id);
    console.log('await', data)
    good[i].supInfo = data;
  }
  console.log('getData', good);
  console.log('fin')
  dealRes(res, 0, good);
}

function getAuthor(_id){
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

/*删除药品（后台管理端、供应商端）*/
router.delete('/:_id', function(req, res, next) {
  let _id = req.params._id;
  Good.remove({_id: _id}, function(err, suc) {
    if(err) console.log(err);
    // console.log(suc.result);
    return dealRes(res, 0, {_id: _id});
  })
})

/*构造主要的药品数据对象*/
let buildGood = (form, obj) => {
  // 将传入的表单数据更新到目标对象
  if(form.name){obj.name = form.name}
  if(form.brand){obj.brand = form.brand}
  if(form.sort){obj.sort = form.sort}
  if(form.spec){obj.spec = form.spec}
  if(form.vp){obj.vp = form.vp}
  if(form.use){obj.use = form.use}
  if(form.intro){obj.intro = form.intro}
  if(form.approval){obj.approval = form.approval}
  if(form.fileList){obj.fileList = form.fileList}
  if(form.store){obj.store = form.store}
  if(form.price){obj.price = form.price}
  obj.update_date = new Date();
}

/*编辑药品(供应商端)*/
router.patch('/:_id', function(req, res, next) {
  let _id = req.params._id;
  let getGood = req.body;
  Good.findById(_id, function(err, fUser) {
    if(err) return console.log(err);
    delete fUser._id;   // 取出主键
    // 更新可配置属性
    buildGood(getGood, fUser);
    fUser.state = 'check';
    Good.update({_id: _id}, fUser, function(err, suc) {
      if(err) console.log(err);
      dealRes(res, 0, {_id: _id});
    })
  })
})

/*编辑药品状态信息(后台管理端)*/
router.patch('/state/:_id', function(req, res, next) {
  let _id = req.params._id;
  let { state } = req.body;
  console.log(state)
  if(!_id){return dealRes(res, 1, 'need user id!')}
  if(!state || (state != 'check' && state != 'disabled' && state != 'normal')){return dealRes(res, 1, 'state error!')}
  Good.findById(_id, function(err, fUser) {
    if(err) return console.log(err);
    delete fUser._id;   // 取出主键
    // 更新可配置属性
    fUser.state = state;
    Good.update({_id: _id}, fUser, function(err, suc) {
      if(err) console.log(err);
      dealRes(res, 0, {_id: _id});
    })
  })
})

/* 添加药品(供应商端) */
router.post('/add', function(req, res, next) {
  let getGood = req.body;
  console.log(getGood);
  if(!getGood.uid){return dealRes(res, 1, 'need user id!')}
  // 创建传值对象
  let newObj = {};
  newObj.creatorId = getGood.uid;
  newObj.state = 'check';
  newObj.create_date = new Date();
  // 赋值
  buildGood(getGood, newObj);
  let newGood = Good(newObj);
  newGood.save(function(err, suc){
    if(err){
      console.log(err)
    }
    return dealRes(res, 0, suc);
  })
});

/*上传图片*/
router.post('/upload', upload.single('file'), function(req, res, next){
  let file = req.file;
  console.log(file);
  dealRes(res, 0, file);
})

module.exports = router;