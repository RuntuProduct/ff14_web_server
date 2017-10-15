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
          return dealRes(res, 0, {
            list: result,
            current: page,
            pageSize,
            total,
          });
        })
        // 释放连接池
        connection.release();
      })
    });
  } catch(e) {
    return dealRes(res, 1, 'internal error');
  }
})

router.post('/login', (req, res, next) => {
  const { username, password } = req.body;

  try {
    // 从连接池获取连接
    pool.getConnection((err, connection) => {
      connection.query(jobSQL.userLogin, [username, password], (err, result) => {
        if (result && result.length) {
          const user = result[0]
          delete user.pwd
          res.cookie('uidSave', user.id, {
            expires: new Date(Date.now() + (10 * 60000)), // 分钟
            httpOnly: false,
          })
          return dealRes(res, 0, user)
        } else {
          return dealRes(res, 1, '用户不存在！')
        }
        // 释放连接池
        connection.release();
      }) 
    })
  } catch(e) {
    // console.log(e)
    return dealRes(res, 1, 'internal error')
  }
})

module.exports = router;
