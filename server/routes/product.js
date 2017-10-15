const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbConfig = require('../db/config');
const productSQL = require('../db/productsql');
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
      connection.query(productSQL.queryPage, [(page - 1) * pageSize, pageSize], (err, result) => {
        if (err) { throw err }
        connection.query(productSQL.count, (err, count) => {
          if (err) { throw err }
          // 释放连接池
          connection.release();
          const total = count[0]['total']
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

// 添加作物
router.post('/', (req, res) => {
  let { name, img, jobId, difficulty, stamina } = req.body;

  if (!name || parseInt(jobId, 10) != jobId || jobId == 0) {
    return dealRes(res, 1, '作物信息错误！')
  }

  try {
    pool.getConnection((err, connection) => {
      if (err) { throw err }
      connection.query(productSQL.insert, [name, img, jobId, difficulty, stamina], (err, result) => {
        if (err) { throw err }
        // 释放连接池
        connection.release();
        return dealRes(res, 0, '添加成功');
      })
    });
  } catch(e) {
    return dealRes(res, 1, 'internal error');
  }
})

// 编辑作物
router.put('/', (req, res) => {
  let { id, name, img, jobId, difficulty, stamina } = req.body;

  if (!id || !name || parseInt(jobId, 10) != jobId || jobId == 0) {
    return dealRes(res, 1, '作物信息错误！')
  }

  try {
    pool.getConnection((err, connection) => {
      if (err) { throw err }
      connection.query(productSQL.update, [name, img, parseInt(jobId, 10), difficulty, stamina, id], (err, result) => {
        if (err) { throw err }
        // 释放连接池
        connection.release();
        return dealRes(res, 0, '修改成功');
      })
    });
  } catch(e) {
    return dealRes(res, 1, 'internal error');
  }
})

// 删除作物
router.delete('/', (req, res) => {
  let { id } = req.body;
  if (!id) {
    return dealRes(res, 1, '作物信息错误！')
  }
  try {
    pool.getConnection((err, connection) => {
      if (err) { throw err }
      connection.query(productSQL.delete, [id], (err, result) => {
        if (err) { throw err }
        // 释放连接池
        connection.release();
        return dealRes(res, 0, '删除成功');
      })
    });
  } catch(e) {
    return dealRes(res, 1, 'internal error');
  }
})

module.exports = router;
