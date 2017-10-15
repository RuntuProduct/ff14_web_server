const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbConfig = require('../db/config');
const jobSQL = require('../db/jobsql');
const dealRes = require('../utils/dealRes');

// 使用数据库配置信息创建一个MySQL链接池
const pool = mysql.createPool(dbConfig.mysql);

// 获取分页
router.get('/', (req, res) => {
  let { page, pageSize } = req.query;
  page = parseInt(page, 10)
  pageSize = parseInt(pageSize, 10)

  if (!page || !pageSize) {
    return dealRes(res, 1, '分页信息错误！')
  }

  try {
    pool.getConnection((err, connection) => {
      if (err) { throw err }
      connection.query(jobSQL.queryPage, [(page - 1) * pageSize, pageSize], (err, result) => {
        if (err) { throw err }
        connection.query(jobSQL.count, (err, count) => {
          if (err) { throw err }
          const total = count[0]['total']
          // 释放连接池
          connection.release();
          return dealRes(res, 0, {
            list: result,
            current: page,
            pageSize,
            total,
          });
        })
      })
    });
  } catch(e) {
    return dealRes(res, 1, 'internal error');
  }
})

// 根据职业名称或是职业类别（01-大地使者、02-能工巧匠）来搜索职业
router.get('/query', (req, res) => {
  const { value } = req.query
  // 判断有无职业关键字
  let type
  const match01 = value.match(/^['大','地','使','者']+$/)
  const match02 = value.match(/^['能','工','巧','匠']+$/)
  if (match01) {
    type = ['01']
  } else if (match02) {
    type = ['02']
  } else {
    type = ['none']
  }
  try {
    pool.getConnection((err, connection) => {
      if (err) { throw err }
      const query = "%" + value + "%"
      connection.query(jobSQL.queryValue, [query, type], (err, result) => {
        if (err) { throw err }
        // 释放连接池
        connection.release();
        return dealRes(res, 0, result);
      });
    });
  } catch(e) {
    return dealRes(res, 1, 'internal error');
  }
})

module.exports = router;
