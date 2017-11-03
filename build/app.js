require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 35);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const dealRes = (res, code, data) => {
  if (code) {
    res.send({
      code: code,
      status: 'error',
      message: data,
      data: null
    });
    res.end();
  } else {
    res.send({
      code: 200,
      status: 'success',
      message: 'success',
      data: data
    });
    res.end();
  }
};

/* harmony default export */ __webpack_exports__["a"] = (dealRes);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  mysql: {
    host: '120.78.152.254',
    // host: '192.168.31.200',
    user: 'db_user',
    password: 'db_pass',
    database: 'handbookDB', // 前面建的user表位于这个数据库中 
    port: 3306,
    connectionLimit: 10
  }
});

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("mysql");

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const locationSQL = {
  insert: 'INSERT' + ' INTO locaiton(name, mapId, axisX, axisY, type)' + ' VALUES(?,?,?,?,?)',
  update: 'UPDATE' + ' location' + ' SET name = ?, mapId = ?, axisX = ?, axisY = ?, type = ?' + ' WHERE id = ?',
  getLocationById: 'SELECT' + ' *' + ' FROM location AS l' + ' WHERE l.mapId = ?',
  getLocationByIds: 'SELECT' + ' *' + ' FROM location AS l' + ' WHERE l.mapId IN (?)',
  deleteById: 'DELETE FROM location WHERE id = ?'
};

/* harmony default export */ __webpack_exports__["a"] = (locationSQL);

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_path__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_http__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_http___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_http__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_consolidate__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_consolidate___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_consolidate__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_body_parser__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_body_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_body_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_compression__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_compression___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_compression__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__config__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__routes_index__ = __webpack_require__(19);





 // gzip压缩插件



const app = __WEBPACK_IMPORTED_MODULE_0_express___default()();
const isDev = app.get('env') !== 'production';

app.use(__WEBPACK_IMPORTED_MODULE_5_compression___default()()); // 启用 gzip压缩

app.set('views', __WEBPACK_IMPORTED_MODULE_1_path___default.a.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', __WEBPACK_IMPORTED_MODULE_3_consolidate___default.a.ejs);

// app.use(bodyParser()) // for parsing application/jso
app.use(__WEBPACK_IMPORTED_MODULE_4_body_parser___default.a.json()); // for parsing application/json
app.use(__WEBPACK_IMPORTED_MODULE_4_body_parser___default.a.text()); // for parsing application/json
app.use(__WEBPACK_IMPORTED_MODULE_4_body_parser___default.a.urlencoded({
  extended: true
})); // for parsing application/x-www-form-urlencoded

app.use(__WEBPACK_IMPORTED_MODULE_0_express___default.a.static(__WEBPACK_IMPORTED_MODULE_1_path___default.a.join(__dirname, '../dist')));
app.use(__WEBPACK_IMPORTED_MODULE_0_express___default.a.static(__WEBPACK_IMPORTED_MODULE_1_path___default.a.join(__dirname, '../uploads')));

__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__routes_index__["a" /* default */])(app);

if (isDev) {
  // add "reload" to express, see: https://www.npmjs.com/package/reload
  const server = __WEBPACK_IMPORTED_MODULE_2_http___default.a.createServer(app);

  server.listen(__WEBPACK_IMPORTED_MODULE_6__config__["a" /* port */], () => {
    console.log(`The server is running at http://localhost:${__WEBPACK_IMPORTED_MODULE_6__config__["a" /* port */]}/`);
  });
} else {
  // static assets served by express.static() for production
  app.listen(__WEBPACK_IMPORTED_MODULE_6__config__["a" /* port */], () => {
    console.log(`The server is running at http://localhost:${__WEBPACK_IMPORTED_MODULE_6__config__["a" /* port */]}/`);
  });
}

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const port = process.env.PORT || 3000;
/* harmony export (immutable) */ __webpack_exports__["a"] = port;


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const fishSQL = {
  insert: 'INSERT INTO fish(name, img)' + 'VALUES(?,?)',
  update: 'UPDATE fish SET name = ?, img = ? WHERE id = ?',
  queryPage: 'SELECT * FROM fish AS f WHERE f.name LIKE ? LIMIT ?,?',
  count: 'SELECT COUNT(*) AS total FROM fish'
};

/* harmony default export */ __webpack_exports__["a"] = (fishSQL);

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const formulaSQL = {
  insert: 'INSERT INTO formula(pid, tarId, tarType, num) VALUES(?,?,?,?)',
  compare: 'SELECT * FROM formula AS f WHERE f.pid = ? AND f.tarId = ? AND f.tarType = ?', // 比较
  query: 'SELECT j.id AS jobId, j.name AS jobName,' + 'p.id AS proId, p.name AS proName, p.type AS proType,' + 'f.tarId AS forTarId, f.tarType AS forTarId, f.num AS forNum,' + 'FROM job AS j, PRODUCT AS p, formula AS f ' + 'WHERE f.pid LIKE ?',
  // 获取product详情
  getSingleProduct: 'SELECT' + ' p.id, p.name, p.img, p.level, p.difficulty, p.stamina,' + ' j.id AS jobId, j.name AS jobName' + ' FROM product AS p, job AS j' + ' WHERE p.id = ? AND j.id = p.jobId',
  // 根据pid获取配方集合
  getFormulaByPid: 'SELECT' + ' *' + ' FROM formula AS f' + ' WHERE f.pid = ?',
  // 根据id集合获取材料
  getMaterialByIds: 'SELECT' + ' m.id, m.name, m.img,' + ' j.id AS jobId, j.name AS jobName' + ' FROM material AS m, job AS j' + ' WHERE m.id IN (?) AND m.jobId = j.id',
  // 根据id集合获取作物
  getProductByIds: 'SELECT' + ' p.id, p.name, p.img,' + ' j.id AS jobId, j.name AS jobName' + ' FROM product AS p, job AS j' + ' WHERE p.id IN (?) AND p.jobId = j.id',
  // 根据id集合获取鱼类
  getFishByIds: 'SELECT' + ' f.id, f.name, f.img,' + ' j.id AS jobId, j.name AS jobName' + ' FROM fish AS f, job AS j' + ' WHERE f.id IN (?) AND j.id = 1'
};

/* harmony default export */ __webpack_exports__["a"] = (formulaSQL);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const JobSQL = {
  // insert: 'INSERT INTO user(uid,userName) VALUES(?,?)', 
  queryPage: 'SELECT * FROM job LIMIT ?,?',
  count: 'SELECT COUNT(*) AS total FROM job',
  queryValue: 'SELECT * FROM job WHERE name LIKE ? OR type In (?)'
};

/* harmony default export */ __webpack_exports__["a"] = (JobSQL);

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const mapSQL = {
  insert: 'INSERT' + ' INTO map(name, img, baseX, baseY)' + ' VALUES(?,?)',
  update: 'UPDATE' + ' map' + ' SET name = ?, img = ?, baseX = ?, baseY = ?' + ' WHERE id = ?',
  queryPage: 'SELECT' + ' *' + ' FROM map AS m' + ' WHERE m.name LIKE ? LIMIT ?,?',
  query: 'SELECT' + ' *' + ' FROM map AS m' + ' WHERE m.id = ?',
  count: 'SELECT COUNT(*) AS total FROM map'
};

/* harmony default export */ __webpack_exports__["a"] = (mapSQL);

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const materialSQL = {
  insert: 'INSERT' + ' INTO material(name, img, jobId, getType)' + ' VALUES (?,?,?,?)',
  update: 'UPDATE material SET name = ?, img = ?, jobId = ?, getType = ? WHERE id = ?',
  delete: 'DELETE FROM material WHERE id = ?',
  queryPage: 'SELECT m.id, m.name, m.getType, m.img, m.jobId,' + 'j.id AS jobId, j.name AS jobName ' + 'FROM material AS m, job AS j ' + 'WHERE m.name LIKE ? AND m.getType LIKE ? AND m.jobId = j.id LIMIT ?,?',
  count: 'SELECT COUNT(*) AS total FROM material',
  getUserById: 'SELECT * FROM material WHERE id = ? '
};

/* harmony default export */ __webpack_exports__["a"] = (materialSQL);

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const NotesSQL = {
  product: 'SELECT * From product AS p ' + 'WHERE p.jobId = ? AND p.level BETWEEN ? AND ?'
};

/* harmony default export */ __webpack_exports__["a"] = (NotesSQL);

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const JobSQL = {
  insert: 'INSERT INTO product(name, img, jobId, level, difficulty, stamina) VALUES(?,?,?,?,?,?)',
  update: 'UPDATE product SET name = ?, img = ?, jobId = ?, level = ?, difficulty = ?, stamina = ? WHERE id = ?',
  delete: 'DELETE FROM product WHERE id = ?',
  queryPage: 'SELECT p.id, p.name, p.img, p.jobId, p.level, p.difficulty, p.stamina, ' + 'j.name AS jobName ' + 'FROM product AS p, job AS j ' + 'WHERE p.name LIKE ? AND p.jobId IN (?) AND p.jobId = j.id LIMIT ?,?',
  count: 'SELECT COUNT(*) AS total FROM product',
  getUserById: 'SELECT * FROM product WHERE id = ? '
};

/* harmony default export */ __webpack_exports__["a"] = (JobSQL);

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const UserSQL = {
  insert: 'INSERT INTO user(uid,userName) VALUES(?,?)',
  queryAll: 'SELECT * FROM user',
  getUserById: 'SELECT * FROM user WHERE id = ? ',
  userLogin: 'SELECT * FROM user WHERE ( account = ? AND pwd = ? )'
};

/* harmony default export */ __webpack_exports__["a"] = (UserSQL);

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mysql__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mysql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_mysql__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__db_config__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__db_fishSQL__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_dealRes__ = __webpack_require__(1);






const router = __WEBPACK_IMPORTED_MODULE_0_express___default.a.Router();
// 使用数据库配置信息创建一个MySQL连接池
const pool = __WEBPACK_IMPORTED_MODULE_1_mysql___default.a.createPool(__WEBPACK_IMPORTED_MODULE_2__db_config__["a" /* default */].mysql);

// 获取分页
router.get('/', (req, res) => {
  let { page, pageSize } = req.query;
  const { name } = req.query;
  page = parseInt(page, 10);
  pageSize = parseInt(pageSize, 10);

  let sName;
  if (name) {
    sName = `%${name}%`;
  } else {
    sName = '%';
  }

  if (!page || !pageSize) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 1, '分页信息错误！');
  }

  try {
    pool.getConnection((err1, connection) => {
      if (err1) throw err1;
      connection.query(__WEBPACK_IMPORTED_MODULE_3__db_fishSQL__["a" /* default */].queryPage, [sName, (page - 1) * pageSize, pageSize], (err2, result) => {
        if (err2) throw err2;
        connection.query(__WEBPACK_IMPORTED_MODULE_3__db_fishSQL__["a" /* default */].count, (err3, count) => {
          if (err3) throw err3;
          // 释放连接池
          connection.release();
          const { total } = count[0];
          return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 0, {
            list: result,
            current: page,
            pageSize,
            total
          });
        });
      });
    });
  } catch (e) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 1, 'internal error');
  }
});

// 添加鱼类
router.post('/', (req, res) => {
  const { name, img } = req.body;

  if (!name) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 1, '材料信息错误！');
  }

  try {
    pool.getConnection((err1, connection) => {
      if (err1) throw err1;
      connection.query(__WEBPACK_IMPORTED_MODULE_3__db_fishSQL__["a" /* default */].insert, [name, img], (err2, result) => {
        if (err2) throw err2;
        // 释放连接池
        connection.release();
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 0, '添加成功');
      });
    });
  } catch (e) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 1, 'internal error');
  }
});

// 编辑
router.put('/', (req, res) => {
  const { id, name, img } = req.body;

  if (id === undefined || !name) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 1, '材料信息错误！');
  }

  try {
    pool.getConnection((err1, connection) => {
      if (err1) throw err1;
      connection.query(__WEBPACK_IMPORTED_MODULE_3__db_fishSQL__["a" /* default */].update, [name, img, id], (err2, result) => {
        if (err2) throw err2;
        // 释放连接池
        connection.release();
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 0, '修改成功');
      });
    });
  } catch (e) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 1, 'internal error');
  }
});

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mysql__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mysql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_mysql__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__db_config__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__db_formulaSQL__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_dealRes__ = __webpack_require__(1);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }








const router = __WEBPACK_IMPORTED_MODULE_0_express___default.a.Router();
// 使用数据库配置信息创建一个MySQL链接池
const pool = __WEBPACK_IMPORTED_MODULE_1_mysql___default.a.createPool(__WEBPACK_IMPORTED_MODULE_3__db_config__["a" /* default */].mysql);

const getTarAry = (ary, type) => {
  return new Promise((resolve, reject) => {
    try {
      const ids = ary.filter(da => da.tarType == type).map(da => da.tarId);
      let query;
      if (type === '01') {
        query = __WEBPACK_IMPORTED_MODULE_4__db_formulaSQL__["a" /* default */].getMaterialByIds;
      } else if (type === '02') {
        query = __WEBPACK_IMPORTED_MODULE_4__db_formulaSQL__["a" /* default */].getProductByIds;
      } else if (type === '03') {
        query = __WEBPACK_IMPORTED_MODULE_4__db_formulaSQL__["a" /* default */].getFishByIds;
      } else {
        throw new Error('类型错误');
      }
      // console.log(query, ids)

      pool.getConnection((err1, connection) => {
        if (err1) throw new Error(err1);
        if (ids.length) {
          connection.query(query, [ids], (err2, result) => {
            if (err2) throw new Error(err2);
            connection.release();
            resolve(result);
          });
        } else {
          resolve([]);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

const mixinAry = (ary, mat, pro, fish) => {
  const result = [];
  for (let i = 0; i < ary.length; i += 1) {
    const { tarType, tarId } = ary[i];
    let tar;
    if (tarType === '01') {
      tar = mat;
    } else if (tarType === '02') {
      tar = pro;
    } else {
      tar = fish;
    }
    const idx = __WEBPACK_IMPORTED_MODULE_2_lodash___default.a.findIndex(tar, da => {
      return da.id === tarId;
    });
    const res = {};
    if (idx !== -1) {
      Object.assign(res, ary[i], { detail: tar[idx] });
    } else {
      Object.assign(res, ary[i], { detail: { id: null, name: '信息错误' } });
    }
    result.push(res);
  }
  return result;
};

// 处理配方数据
const getFormula = (() => {
  var _ref = _asyncToGenerator(function* (ary) {
    const materialAry = yield getTarAry(ary, '01');
    const productAry = yield getTarAry(ary, '02');
    const fishAry = yield getTarAry(ary, '03');
    // console.log(fishAry, productAry, materialAry)
    return mixinAry(ary, materialAry, productAry, fishAry);
  });

  return function getFormula(_x) {
    return _ref.apply(this, arguments);
  };
})();

router.get('/', (req, res) => {
  const { pid } = req.query;

  if (pid === undefined) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_dealRes__["a" /* default */])(res, 1, 'pid参数错误！');
  }

  try {
    pool.getConnection((err1, connection) => {
      if (err1) throw new Error(err1);
      connection.query(__WEBPACK_IMPORTED_MODULE_4__db_formulaSQL__["a" /* default */].getSingleProduct, [pid], (err2, result1) => {
        if (err2) throw new Error(err2);
        if (result1 && result1.length) {
          // 成功获取product
          const productObj = result1[0];
          // 获取配方集合
          connection.query(__WEBPACK_IMPORTED_MODULE_4__db_formulaSQL__["a" /* default */].getFormulaByPid, [pid], (err3, result2) => {
            if (err3) {
              throw new Error(err3);
            }
            if (result2 && result2.length) {
              // 处理配方数据
              getFormula(result2).then(formula => {
                // console.log('formula:', formula)
                // 释放连接池
                connection.release();
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_dealRes__["a" /* default */])(res, 0, _extends({}, productObj, {
                  formula
                }));
              }, err4 => {
                throw new Error(err4);
              });
            } else {
              // 释放连接池
              connection.release();
              return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_dealRes__["a" /* default */])(res, 0, _extends({}, productObj, {
                formula: []
              }));
            }
          });
        } else {
          // 释放连接池
          connection.release();
          return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_dealRes__["a" /* default */])(res, 1, '对应的作物不存在！');
        }
      });
    });
  } catch (e) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_dealRes__["a" /* default */])(res, 1, 'internal error');
  }
});

router.post('/', (req, res) => {
  const { pid, tarId, tarType, num } = req.body;

  if (pid === undefined || tarId == undefined || !tarType || !num) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_dealRes__["a" /* default */])(res, 1, '材料信息错误！');
  }

  try {
    pool.getConnection((err1, connection) => {
      if (err1) throw new Error(err1);
      connection.query(__WEBPACK_IMPORTED_MODULE_4__db_formulaSQL__["a" /* default */].compare, [pid, tarId, tarType], (err2, result1) => {
        if (err2) throw new Error(err2);
        console.log(result1);
        // 判断要添加的元素是否存在
        if (result1.length === 0) {
          connection.query(__WEBPACK_IMPORTED_MODULE_4__db_formulaSQL__["a" /* default */].insert, [pid, tarId, tarType, num], (err3, result2) => {
            if (err3) throw new Error(err3);
            // 释放连接池
            connection.release();
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_dealRes__["a" /* default */])(res, 0, '添加成功');
          });
        } else {
          // 释放连接池
          connection.release();
          return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_dealRes__["a" /* default */])(res, 1, '该材料已存在！');
        }
      });
    });
  } catch (e) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_dealRes__["a" /* default */])(res, 1, 'internal error');
  }
});

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__upload__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__job__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__product__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__material__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__fish__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__formula__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__notes__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__map__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__location__ = __webpack_require__(21);
// 路由规则存放目录











const router = app => {
  app.get('/', (req, res, next) => {
    res.render('./index.html');
  });

  app.all('/api/*', (req, res, next) => {
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, X-Requested-With, Content-Type');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Origin', 'http://192.168.31.200:8014');
    next();
  });

  app.use('/api/upload', __WEBPACK_IMPORTED_MODULE_0__upload__["a" /* default */]);
  app.use('/api/user', __WEBPACK_IMPORTED_MODULE_1__user__["a" /* default */]);
  app.use('/api/job', __WEBPACK_IMPORTED_MODULE_2__job__["a" /* default */]);
  app.use('/api/product', __WEBPACK_IMPORTED_MODULE_3__product__["a" /* default */]);
  app.use('/api/material', __WEBPACK_IMPORTED_MODULE_4__material__["a" /* default */]);
  app.use('/api/fish', __WEBPACK_IMPORTED_MODULE_5__fish__["a" /* default */]);
  app.use('/api/formula', __WEBPACK_IMPORTED_MODULE_6__formula__["a" /* default */]);
  app.use('/api/notes', __WEBPACK_IMPORTED_MODULE_7__notes__["a" /* default */]);
  app.use('/api/map', __WEBPACK_IMPORTED_MODULE_8__map__["a" /* default */]);
  app.use('/api/location', __WEBPACK_IMPORTED_MODULE_9__location__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mysql__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mysql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_mysql__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__db_config__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__db_jobsql__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_dealRes__ = __webpack_require__(1);






const router = __WEBPACK_IMPORTED_MODULE_0_express___default.a.Router();
// 使用数据库配置信息创建一个MySQL链接池
const pool = __WEBPACK_IMPORTED_MODULE_1_mysql___default.a.createPool(__WEBPACK_IMPORTED_MODULE_2__db_config__["a" /* default */].mysql);

// 获取分页
router.get('/', (req, res) => {
  let { page, pageSize } = req.query;
  page = parseInt(page, 10);
  pageSize = parseInt(pageSize, 10);

  if (!page || !pageSize) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 1, '分页信息错误！');
  }

  try {
    pool.getConnection((err1, connection) => {
      if (err1) {
        throw err1;
      }
      connection.query(__WEBPACK_IMPORTED_MODULE_3__db_jobsql__["a" /* default */].queryPage, [(page - 1) * pageSize, pageSize], (err2, result) => {
        if (err2) {
          throw err2;
        }
        connection.query(__WEBPACK_IMPORTED_MODULE_3__db_jobsql__["a" /* default */].count, (err3, count) => {
          if (err3) {
            throw err3;
          }
          const { total } = count[0];
          // 释放连接池
          connection.release();
          return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 0, {
            list: result,
            current: page,
            pageSize,
            total
          });
        });
      });
    });
  } catch (e) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 1, 'internal error');
  }
});

// 根据职业名称或是职业类别（01-大地使者、02-能工巧匠）来搜索职业
router.get('/query', (req, res) => {
  const { value } = req.query;
  // 判断有无职业关键字
  let type;
  const match01 = value.match(/^['大','地','使','者']+$/);
  const match02 = value.match(/^['能','工','巧','匠']+$/);
  if (match01) {
    type = ['01'];
  } else if (match02) {
    type = ['02'];
  } else {
    type = ['none'];
  }
  try {
    pool.getConnection((err1, connection) => {
      if (err1) {
        throw err1;
      }
      const query = `%${value}%`;
      connection.query(__WEBPACK_IMPORTED_MODULE_3__db_jobsql__["a" /* default */].queryValue, [query, type], (err2, result) => {
        if (err2) {
          throw err2;
        }
        // 释放连接池
        connection.release();
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 0, result);
      });
    });
  } catch (e) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 1, 'internal error');
  }
});

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mysql__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mysql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_mysql__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__db_config__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__db_locationSQL__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_dealRes__ = __webpack_require__(1);






const router = __WEBPACK_IMPORTED_MODULE_0_express___default.a.Router();
// 使用数据库配置信息创建一个MySQL连接池
const pool = __WEBPACK_IMPORTED_MODULE_1_mysql___default.a.createPool(__WEBPACK_IMPORTED_MODULE_2__db_config__["a" /* default */].mysql);

// 根据地图id获取地点数组
router.get('/', (req, res) => {
  const { mapId } = req.query;
  if (mapId == undefined) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 1, '缺少地图id！');
  }

  try {
    pool.getConnection((err1, connection) => {
      if (err1) throw err1;
      connection.query(__WEBPACK_IMPORTED_MODULE_3__db_locationSQL__["a" /* default */].getLocationById, [mapId], (err2, result) => {
        if (err2) throw err2;
        // 释放连接池
        connection.release();
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 0, result);
      });
    });
  } catch (e) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 1, 'internal error');
  }
});

// 添加地点
router.post('/', (req, res) => {
  const { name, mapId, axisX, axisY, type } = req.body;

  if (name === undefined) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 1, '地点名称不能为空！');
  } else if (mapId === undefined || parseInt(mapId, 10) !== mapId) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 1, '地图id错误！');
  } else if (axisX === undefined || axisY === undefined) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 1, '地点坐标异常！');
  } else if (type !== '01' || type !== '02' || type !== '03') {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 1, '地点类型错误！');
  }

  try {
    pool.getConnection((err1, connection) => {
      if (err1) throw err1;
      connection.query(__WEBPACK_IMPORTED_MODULE_3__db_locationSQL__["a" /* default */].insert, [name, mapId, axisX, axisY, type], (err2, result) => {
        if (err2) throw err2;
        // 释放连接池
        connection.release();
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 0, '添加成功');
      });
    });
  } catch (e) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 1, 'internal error');
  }
});

// 编辑地点
router.put('/', (req, res) => {
  const { id, name, mapId, axisX, axisY, type } = req.body;

  if (id === undefined || parseInt(id, 10) !== id) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 1, '地点id异常');
  } else if (name === undefined) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 1, '地点名称不能为空！');
  } else if (mapId === undefined || parseInt(mapId, 10) !== mapId) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 1, '地图id错误！');
  } else if (axisX === undefined || axisY === undefined) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 1, '地点坐标异常！');
  } else if (!(type === '01' || type === '02' || type === '03' || type === '04' || type === '05')) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 1, '地点类型错误！');
  }

  try {
    pool.getConnection((err1, connection) => {
      if (err1) throw err1;
      connection.query(__WEBPACK_IMPORTED_MODULE_3__db_locationSQL__["a" /* default */].update, [name, mapId, axisX, axisY, type, id], (err2, result) => {
        if (err2) throw err2;
        // 释放连接池
        connection.release();
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 0, '修改成功');
      });
    });
  } catch (e) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 1, 'internal error');
  }
});

router.delete('/', (req, res) => {
  const { id } = req.query;
  if (id === undefined || parseInt(id, 10) != id) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 1, '地图id错误！');
  }

  try {
    pool.getConnection((err1, connection) => {
      if (err1) throw new Error(err1);
      connection.query(__WEBPACK_IMPORTED_MODULE_3__db_locationSQL__["a" /* default */].deleteById, [id], (err2, result) => {
        if (err2) throw new Error(err2);
        // 释放连接池
        connection.release();
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 0, '删除成功');
      });
    });
  } catch (e) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 1, 'internal error');
  }
});

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mysql__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mysql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_mysql__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__db_config__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__db_mapSQL__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__db_locationSQL__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_dealRes__ = __webpack_require__(1);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }









const router = __WEBPACK_IMPORTED_MODULE_0_express___default.a.Router();
// 使用数据库配置信息创建一个MySQL连接池
const pool = __WEBPACK_IMPORTED_MODULE_1_mysql___default.a.createPool(__WEBPACK_IMPORTED_MODULE_3__db_config__["a" /* default */].mysql);

const getLocation = ids => {
  return new Promise((resolve, reject) => {
    try {
      pool.getConnection((err1, connection) => {
        if (err1) {
          throw new Error('连接数据库失败');
        }
        connection.query(__WEBPACK_IMPORTED_MODULE_5__db_locationSQL__["a" /* default */].getLocationByIds, [ids], (err2, result) => {
          if (err2) {
            throw new Error(err2);
          }
          resolve(result);
        });
      });
    } catch (e) {
      reject(e);
    }
  });
};

// 根据id进行地点分组
const mapLocationById = ary => {
  const res = {};
  for (let i = 0; i < ary.length; i += 1) {
    const { mapId } = ary[i];
    if (!res[mapId] || !__WEBPACK_IMPORTED_MODULE_2_lodash___default.a.isArray(res[mapId])) {
      res[mapId] = [];
    }
    res[mapId].push(ary[i]);
  }
  return res;
};

const handleLocation = (() => {
  var _ref = _asyncToGenerator(function* (list) {
    const result = __WEBPACK_IMPORTED_MODULE_2_lodash___default.a.cloneDeep(list);
    const ids = list.map(function (da) {
      return da.id;
    });
    // 获取所有相关的地点数组
    const locationAry = yield getLocation(ids);
    // 根据id分组
    const idsObj = mapLocationById(locationAry);
    // 根据id并入对应的map对象体内
    for (let i = 0; i < result.length; i += 1) {
      const { id } = result[i];
      if (idsObj[id] && __WEBPACK_IMPORTED_MODULE_2_lodash___default.a.isArray(idsObj[id])) {
        result[i].positionAry = idsObj[id];
      } else {
        result[i].positionAry = [];
      }
    }
    console.log(result);
    return result;
  });

  return function handleLocation(_x) {
    return _ref.apply(this, arguments);
  };
})();

// 获取分页
router.get('/list', (req, res) => {
  let { page, pageSize } = req.query;
  const { name } = req.query;
  page = parseInt(page, 10);
  pageSize = parseInt(pageSize, 10);

  let sName;
  if (name) {
    sName = `%${name}%`;
  } else {
    sName = '%';
  }

  if (!page || !pageSize) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_dealRes__["a" /* default */])(res, 1, '分页信息错误！');
  }

  try {
    pool.getConnection((err1, connection) => {
      if (err1) throw err1;
      connection.query(__WEBPACK_IMPORTED_MODULE_4__db_mapSQL__["a" /* default */].queryPage, [sName, (page - 1) * pageSize, pageSize], (err2, result) => {
        if (err2) throw err2;
        connection.query(__WEBPACK_IMPORTED_MODULE_4__db_mapSQL__["a" /* default */].count, (err3, count) => {
          if (err3) throw err3;
          // 释放连接池
          connection.release();
          const { total } = count[0];
          handleLocation(result).then(list => {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_dealRes__["a" /* default */])(res, 0, {
              list,
              current: page,
              pageSize,
              total
            });
          }, err => {
            throw new Error(err);
          });
        });
      });
    });
  } catch (e) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_dealRes__["a" /* default */])(res, 1, 'internal error');
  }
});

// 获取单个地图详情
router.get('/', (req, res) => {
  const { id } = req;
  if (id === undefined || parseInt(id, 10) != id) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_dealRes__["a" /* default */])(res, 1, '地图id异常');
  }

  try {
    pool.getConnection((err1, connection) => {
      if (err1) throw err1;
      connection.query(__WEBPACK_IMPORTED_MODULE_4__db_mapSQL__["a" /* default */].queryPage, [id], (err2, result) => {
        if (err2) throw err2;
        // 释放连接池
        connection.release();
        handleLocation(result).then(list => {
          return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_dealRes__["a" /* default */])(res, 0, list);
        }, err => {
          throw new Error(err);
        });
      });
    });
  } catch (e) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_dealRes__["a" /* default */])(res, 1, 'internal error');
  }
});

// 添加地图
router.post('/', (req, res) => {
  const { name, img, baseX, baseY } = req.body;

  if (name === undefined) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_dealRes__["a" /* default */])(res, 1, '地图信息错误！');
  } else if (img === undefined) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_dealRes__["a" /* default */])(res, 1, '地图图片信息错误！');
  } else if (!baseX || parseInt(baseX, 10) !== baseX || !baseY || parseInt(baseY, 10) !== baseY) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_dealRes__["a" /* default */])(res, 1, '地图尺寸信息错误！');
  }

  try {
    pool.getConnection((err1, connection) => {
      if (err1) throw err1;
      connection.query(__WEBPACK_IMPORTED_MODULE_4__db_mapSQL__["a" /* default */].insert, [name, img, baseX, baseY], (err2, result) => {
        if (err2) throw err2;
        // 释放连接池
        connection.release();
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_dealRes__["a" /* default */])(res, 0, '添加成功');
      });
    });
  } catch (e) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_dealRes__["a" /* default */])(res, 1, 'internal error');
  }
});

// 编辑
router.put('/', (req, res) => {
  const { id, name, img, baseX, baseY } = req.body;

  if (id === undefined || parseInt(id, 10) !== id) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_dealRes__["a" /* default */])(res, 1, '地图id错误！');
  } else if (name === undefined) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_dealRes__["a" /* default */])(res, 1, '地图信息错误！');
  } else if (img === undefined) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_dealRes__["a" /* default */])(res, 1, '地图图片信息错误！');
  } else if (!baseX || parseInt(baseX, 10) !== baseX || !baseY || parseInt(baseY, 10) !== baseY) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_dealRes__["a" /* default */])(res, 1, '地图尺寸信息错误！');
  }

  try {
    pool.getConnection((err1, connection) => {
      if (err1) throw err1;
      connection.query(__WEBPACK_IMPORTED_MODULE_4__db_mapSQL__["a" /* default */].update, [name, img, baseX, baseY, id], (err2, result) => {
        if (err2) throw err2;
        // 释放连接池
        connection.release();
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_dealRes__["a" /* default */])(res, 0, '修改成功');
      });
    });
  } catch (e) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_dealRes__["a" /* default */])(res, 1, 'internal error');
  }
});

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mysql__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mysql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_mysql__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__db_config__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__db_materialSQL__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_dealRes__ = __webpack_require__(1);






const router = __WEBPACK_IMPORTED_MODULE_0_express___default.a.Router();
// 使用数据库配置信息创建一个MySQL链接池
const pool = __WEBPACK_IMPORTED_MODULE_1_mysql___default.a.createPool(__WEBPACK_IMPORTED_MODULE_2__db_config__["a" /* default */].mysql);

// 获取分页
router.get('/', (req, res) => {
  let { page, pageSize } = req.query;
  const { name, getType } = req.query;
  page = parseInt(page, 10);
  pageSize = parseInt(pageSize, 10);

  let sName;
  if (name) {
    sName = `%${name}%`;
  } else {
    sName = '%';
  }
  let sType;
  if (getType) {
    sType = `%${getType}%`;
  } else {
    sType = '%';
  }

  if (!page || !pageSize) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 1, '分页信息错误！');
  }

  try {
    pool.getConnection((err1, connection) => {
      if (err1) {
        throw err1;
      }
      connection.query(__WEBPACK_IMPORTED_MODULE_3__db_materialSQL__["a" /* default */].queryPage, [sName, sType, (page - 1) * pageSize, pageSize], (err2, result) => {
        if (err2) {
          throw err2;
        }
        connection.query(__WEBPACK_IMPORTED_MODULE_3__db_materialSQL__["a" /* default */].count, (err3, count) => {
          if (err3) {
            throw err3;
          }
          // 释放连接池
          connection.release();
          const { total } = count[0];
          return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 0, {
            list: result,
            current: page,
            pageSize,
            total
          });
        });
      });
    });
  } catch (e) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 1, 'internal error');
  }
});

// 添加材料
router.post('/', (req, res) => {
  const { name, img, getType } = req.body;

  if (!name || !getType) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 1, '材料信息错误！');
  }

  let jobId;
  if (getType.indexOf('01') !== -1 || getType.indexOf('02') !== -1) {
    jobId = 2;
  } else if (getType.indexOf('03') !== -1 || getType.indexOf('04') !== -1) {
    jobId = 3;
  } else {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 1, '材料信息错误！');
  }

  try {
    pool.getConnection((err1, connection) => {
      if (err1) {
        throw err1;
      }
      connection.query(__WEBPACK_IMPORTED_MODULE_3__db_materialSQL__["a" /* default */].insert, [name, img, jobId, getType], (err2, result) => {
        if (err2) {
          throw err2;
        }
        // 释放连接池
        connection.release();
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 0, '添加成功');
      });
    });
  } catch (e) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 1, 'internal error');
  }
});

// 编辑材料
router.put('/', (req, res) => {
  const { id, name, img, getType } = req.body;

  if (id === undefined || !name || !getType) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 1, '材料信息错误！');
  }

  let jobId;
  if (getType.indexOf('01') !== -1 || getType.indexOf('02') !== -1) {
    jobId = 2;
  } else if (getType.indexOf('03') !== -1 || getType.indexOf('04') !== -1) {
    jobId = 3;
  } else {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 1, '材料信息错误！');
  }

  try {
    pool.getConnection((err1, connection) => {
      if (err1) {
        throw err1;
      }
      connection.query(__WEBPACK_IMPORTED_MODULE_3__db_materialSQL__["a" /* default */].update, [name, img, parseInt(jobId, 10), getType, id], (err2, result) => {
        if (err2) {
          throw err2;
        }
        // 释放连接池
        connection.release();
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 0, '修改成功');
      });
    });
  } catch (e) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 1, 'internal error');
  }
});

// 删除材料
router.delete('/', (req, res) => {
  const { id } = req.body;
  if (!id) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 1, '材料信息错误！');
  }
  try {
    pool.getConnection((err1, connection) => {
      if (err1) {
        throw err1;
      }
      connection.query(__WEBPACK_IMPORTED_MODULE_3__db_materialSQL__["a" /* default */].delete, [id], (err2, result) => {
        if (err2) {
          throw err2;
        }
        // 释放连接池
        connection.release();
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 0, '删除成功');
      });
    });
  } catch (e) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 1, 'internal error');
  }
});

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mysql__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mysql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_mysql__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__db_config__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__db_notesSQL__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_dealRes__ = __webpack_require__(1);






const router = __WEBPACK_IMPORTED_MODULE_0_express___default.a.Router();
// 使用数据库配置信息创建一个MySQL链接池
const pool = __WEBPACK_IMPORTED_MODULE_1_mysql___default.a.createPool(__WEBPACK_IMPORTED_MODULE_2__db_config__["a" /* default */].mysql);

router.get('/product', (req, res) => {
  const { jobId, lvStart, lvEnd } = req.query;
  console.log(jobId, lvStart, lvEnd);

  if (jobId === undefined || parseInt(jobId, 10) != jobId || lvStart === undefined || lvEnd === undefined || lvStart >= lvEnd) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 1, '参数不合法');
  }

  try {
    pool.getConnection((err, connection) => {
      connection.query(__WEBPACK_IMPORTED_MODULE_3__db_notesSQL__["a" /* default */].product, [jobId, lvStart, lvEnd], (err1, result) => {
        if (err1) {
          throw new Error(err1);
        }
        // 释放连接池
        connection.release();
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 0, result);
      });
    });
  } catch (e) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 1, 'internal error');
  }
});

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mysql__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mysql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_mysql__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__db_config__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__db_productsql__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_dealRes__ = __webpack_require__(1);






const router = __WEBPACK_IMPORTED_MODULE_0_express___default.a.Router();
// 使用数据库配置信息创建一个MySQL链接池
const pool = __WEBPACK_IMPORTED_MODULE_1_mysql___default.a.createPool(__WEBPACK_IMPORTED_MODULE_2__db_config__["a" /* default */].mysql);

// 获取分页
router.get('/', (req, res) => {
  let { page, pageSize } = req.query;
  const { name, jobId } = req.body;
  page = parseInt(page, 10);
  pageSize = parseInt(pageSize, 10);

  if (!page || !pageSize) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 1, '分页信息错误！');
  }

  let sName;
  if (name) {
    sName = `%${name}%`;
  } else {
    sName = '%';
  }
  let sJob;
  if (jobId) {
    sJob = [jobId];
  } else {
    sJob = [4, 5, 6, 7, 8, 9, 10, 11];
  }

  try {
    pool.getConnection((err1, connection) => {
      if (err1) {
        throw new Error(err1);
      }
      connection.query(__WEBPACK_IMPORTED_MODULE_3__db_productsql__["a" /* default */].queryPage, [sName, sJob, (page - 1) * pageSize, pageSize], (err2, result) => {
        if (err2) {
          throw new Error(err2);
        }
        connection.query(__WEBPACK_IMPORTED_MODULE_3__db_productsql__["a" /* default */].count, (err3, count) => {
          if (err3) {
            throw new Error(err3);
          }
          // 释放连接池
          connection.release();
          const { total } = count[0];
          return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 0, {
            list: result,
            current: page,
            pageSize,
            total
          });
        });
      });
    });
  } catch (e) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 1, 'internal error');
  }
});

// 添加作物
router.post('/', (req, res) => {
  const { name, img, jobId, level, difficulty, stamina } = req.body;

  if (!name || parseInt(jobId, 10) != jobId || jobId === 0 || !level) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 1, '作物信息错误！');
  }

  try {
    pool.getConnection((err1, connection) => {
      if (err1) {
        throw new Error(err1);
      }
      connection.query(__WEBPACK_IMPORTED_MODULE_3__db_productsql__["a" /* default */].insert, [name, img, jobId, level, difficulty, stamina], (err, result) => {
        if (err) {
          throw err;
        }
        // 释放连接池
        connection.release();
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 0, '添加成功');
      });
    });
  } catch (e) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 1, 'internal error');
  }
});

// 编辑作物
router.put('/', (req, res) => {
  const { id, name, img, jobId, level, difficulty, stamina } = req.body;

  if (!id || !name || parseInt(jobId, 10) != jobId || jobId == 0 || !level) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 1, '作物信息错误！');
  }

  try {
    pool.getConnection((err1, connection) => {
      if (err1) {
        throw err1;
      }
      connection.query(__WEBPACK_IMPORTED_MODULE_3__db_productsql__["a" /* default */].update, [name, img, parseInt(jobId, 10), level, difficulty, stamina, id], (err2, result) => {
        if (err2) {
          throw err2;
        }
        // 释放连接池
        connection.release();
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 0, '修改成功');
      });
    });
  } catch (e) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 1, 'internal error');
  }
});

// 删除作物
router.delete('/', (req, res) => {
  const { id } = req.body;
  if (!id) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 1, '作物信息错误！');
  }
  try {
    pool.getConnection((err1, connection) => {
      if (err1) {
        throw new Error(err1);
      }
      connection.query(__WEBPACK_IMPORTED_MODULE_3__db_productsql__["a" /* default */].delete, [id], (err2, result) => {
        if (err2) {
          throw new Error(err2);
        }
        // 释放连接池
        connection.release();
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 0, '删除成功');
      });
    });
  } catch (e) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 1, 'internal error');
  }
});

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_multer__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_multer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_multer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_image_size__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_image_size___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_image_size__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_dealRes__ = __webpack_require__(1);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }






const router = __WEBPACK_IMPORTED_MODULE_0_express___default.a.Router();

// 上传文件配置
const storage = __WEBPACK_IMPORTED_MODULE_1_multer___default.a.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const nameNow = file.originalname.match(/^(.+)\.(.+)$/);
    if (nameNow) {
      cb(null, `${nameNow[1].slice(0, 5)}_${Date.now()}.${nameNow[2]}`);
    } else {
      cb(null, false);
    }
  }
});

// var upload = multer({ dest: 'uploads/' });
const upload = __WEBPACK_IMPORTED_MODULE_1_multer___default()({ storage });

// 上传图片
router.post('/', upload.single('file'), (() => {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    const { file } = req;
    console.log(file);
    if (file) {
      const dime = __WEBPACK_IMPORTED_MODULE_2_image_size___default()(file.path);
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_dealRes__["a" /* default */])(res, 0, Object.assign(file, { detail: dime }));
    }
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_dealRes__["a" /* default */])(res, 1, '上传失败');
  });

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})());

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mysql__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mysql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_mysql__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__db_config__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__db_usersql__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_dealRes__ = __webpack_require__(1);






const router = __WEBPACK_IMPORTED_MODULE_0_express___default.a.Router();
// 使用数据库配置信息创建一个MySQL链接池
const pool = __WEBPACK_IMPORTED_MODULE_1_mysql___default.a.createPool(__WEBPACK_IMPORTED_MODULE_2__db_config__["a" /* default */].mysql);

const rbacPrivileges = [{
  privilegeId: 1,
  menu: '01',
  levelId: '001',
  path: '/setting',
  privilegeName: '系统设置',
  remark: 'remark'
}, {
  privilegeId: 2,
  menu: '01',
  levelId: '001001',
  path: '/setting/job',
  privilegeName: '职业设置',
  remark: 'remark'
}, {
  privilegeId: 3,
  menu: '01',
  levelId: '001002',
  path: '/setting/product',
  privilegeName: '作物设置',
  remark: 'remark'
}, {
  privilegeId: 4,
  menu: '01',
  levelId: '001003',
  path: '/setting/material',
  privilegeName: '材料设置',
  remark: 'remark'
}, {
  privilegeId: 5,
  menu: '01',
  levelId: '001004',
  path: '/setting/fish',
  privilegeName: '鱼类设置',
  remark: 'remark'
}, {
  privilegeId: 6,
  menu: '01',
  levelId: '001005',
  path: '/setting/map',
  privilegeName: '地图设置',
  remark: 'remark'
}, {
  privilegeId: 7,
  menu: '01',
  levelId: '002',
  path: '/notes',
  privilegeName: '各类笔记',
  remark: 'remark'
}, {
  privilegeId: 8,
  menu: '01',
  levelId: '002001',
  path: '/notes/product',
  privilegeName: '制作笔记',
  remark: 'remark'
}, {
  privilegeId: 9,
  menu: '01',
  levelId: '002002',
  path: '/notes/gather',
  privilegeName: '采集笔记',
  remark: 'remark'
}, {
  privilegeId: 10,
  menu: '01',
  levelId: '002003',
  path: '/notes/fish',
  privilegeName: '钓鱼笔记',
  remark: 'remark'
}];

router.get('/login', (req, res) => {
  const { uid } = req.query;

  try {
    pool.getConnection((err, connection) => {
      connection.query(__WEBPACK_IMPORTED_MODULE_3__db_usersql__["a" /* default */].getUserById, [uid], (err1, result) => {
        if (err1) throw new Error(err1);
        if (result && result.length) {
          const user = result[0];
          delete user.pwd;
          // 释放连接池
          connection.release();
          return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 0, { user, rbacPrivileges });
        }
        // 释放连接池
        connection.release();
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 1, '用户不存在，请重新登录！');
      });
    });
  } catch (e) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 1, 'internal error');
  }
});

router.post('/login', (req, res, next) => {
  const { username, password } = req.body;

  try {
    // 从连接池获取连接
    pool.getConnection((err, connection) => {
      connection.query(__WEBPACK_IMPORTED_MODULE_3__db_usersql__["a" /* default */].userLogin, [username, password], (err1, result) => {
        if (err1) throw new Error(err1);
        if (result && result.length) {
          const user = result[0];
          delete user.pwd;
          res.cookie('uidSave', user.id, {
            expires: new Date(Date.now() + 10 * 60000), // 分钟
            httpOnly: false
          });
          return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 0, { user, rbacPrivileges });
        }
        // 释放连接池
        connection.release();
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 1, '用户不存在！');
      });
    });
  } catch (e) {
    // console.log(e)
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_dealRes__["a" /* default */])(res, 1, 'internal error');
  }
});

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("consolidate");

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("image-size");

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = require("multer");

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(7);
module.exports = __webpack_require__(6);


/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map