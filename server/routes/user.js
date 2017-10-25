const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbConfig = require('../db/config');
const userSQL = require('../db/usersql');
const dealRes = require('../utils/dealRes');

// 使用数据库配置信息创建一个MySQL链接池
const pool = mysql.createPool(dbConfig.mysql);

const rbacPrivileges = [
  {
    privilegeId: 1,
    menu: '01',
    levelId: '001',
    path: '/setting',
    privilegeName: '系统设置',
    remark: 'remark',
  },
  {
    privilegeId: 2,
    menu: '01',
    levelId: '001001',
    path: '/setting/job',
    privilegeName: '职业设置',
    remark: 'remark',
  },
  {
    privilegeId: 3,
    menu: '01',
    levelId: '001002',
    path: '/setting/product',
    privilegeName: '作物设置',
    remark: 'remark',
  },
  {
    privilegeId: 4,
    menu: '01',
    levelId: '001003',
    path: '/setting/material',
    privilegeName: '材料设置',
    remark: 'remark',
  },
  {
    privilegeId: 5,
    menu: '01',
    levelId: '001004',
    path: '/setting/fish',
    privilegeName: '鱼类设置',
    remark: 'remark',
  },
  {
    privilegeId: 6,
    menu: '01',
    levelId: '002',
    path: '/notes',
    privilegeName: '各类笔记',
    remark: 'remark',
  },
  {
    privilegeId: 7,
    menu: '01',
    levelId: '002001',
    path: '/notes/product',
    privilegeName: '制作笔记',
    remark: 'remark',
  },
  {
    privilegeId: 8,
    menu: '01',
    levelId: '002002',
    path: '/notes/gather',
    privilegeName: '采集笔记',
    remark: 'remark',
  },
  {
    privilegeId: 9,
    menu: '01',
    levelId: '002003',
    path: '/notes/fish',
    privilegeName: '钓鱼笔记',
    remark: 'remark',
  },
];

router.get('/login', (req, res) => {
  const { uid } = req.query;

  try {
    pool.getConnection((err, connection) => {
      connection.query(userSQL.getUserById, [uid], (err, result) => {
        if (result && result.length) {
          const user = result[0]
          delete user.pwd
          return dealRes(res, 0, { user, rbacPrivileges });
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
          return dealRes(res, 0, { user, rbacPrivileges })
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
