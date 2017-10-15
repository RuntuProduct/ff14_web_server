const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbConfig = require('../db/config');
const userSQL = require('../db/usersql');
const dealRes = require('../utils/dealRes');

// 使用数据库配置信息创建一个MySQL链接池
const pool = mysql.createPool(dbConfig.mysql);

router.get('/login', (req, res) => {
  const { uid } = req.query;

  try {
    pool.getConnection((err, connection) => {
      connection.query(userSQL.getUserById, [uid], (err, result) => {
        if (result && result.length) {
          const user = result[0]
          delete user.pwd
          return dealRes(res, 0, user);
        } else {
          return dealRes(res, 1, '用户不存在，请重新登录！');
        }
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
      connection.query(userSQL.userLogin, [username, password], (err, result) => {
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
