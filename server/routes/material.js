const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbConfig = require('../db/config');
const materialSQL = require('../db/materialSQL');
const dealRes = require('../utils/dealRes');

// 使用数据库配置信息创建一个MySQL链接池
const pool = mysql.createPool(dbConfig.mysql);

// 获取分页
router.get('/', (req, res) => {
  let { page, pageSize, name, getType } = req.query;
  page = parseInt(page, 10)
  pageSize = parseInt(pageSize, 10)

  let sName
  if (name) {
    sName = "%" + name + "%"
  } else {
    sName = "%"
  }
  let sType
  if (parseInt(getType, 10) > 0 && parseInt(getType, 10) <= 4) {
    sType = [getType]
  } else {
    sType = ['01', '02', '03', '04']
  }

  if (!page || !pageSize) {
    return dealRes(res, 1, '分页信息错误！')
  }

  try {
    pool.getConnection((err, connection) => {
      if (err) { throw err }
      connection.query(materialSQL.queryPage, [sName, sType, (page - 1) * pageSize, pageSize], (err, result) => {
        if (err) { throw err }
        connection.query(materialSQL.count, (err, count) => {
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

// 添加材料
router.post('/', (req, res) => {
  let { name, img, getType } = req.body;

  if (!name || !getType) {
    return dealRes(res, 1, '材料信息错误！')
  }

  let jobId
  if (getType === '01' || getType === '02') {
    jobId = 2
  } else if (getType === '03' || getType === '04') {
    jobId = 3
  } else {
    return dealRes(res, 1, '材料信息错误！')
  }

  try {
    pool.getConnection((err, connection) => {
      if (err) { throw err }
      connection.query(materialSQL.insert, [name, img, jobId, getType], (err, result) => {
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

// 编辑材料
router.put('/', (req, res) => {
  let { id, name, img, getType } = req.body;
  console.log(req.body)

  if (id == undefined || !name || !getType) {
    return dealRes(res, 1, '材料信息错误！')
  }

  let jobId
  if (getType === '01' || getType === '02') {
    jobId = 2
  } else if (getType === '03' || getType === '04') {
    jobId = 3
  } else {
    return dealRes(res, 1, '材料信息错误！')
  }

  try {
    pool.getConnection((err, connection) => {
      if (err) { throw err }
      connection.query(materialSQL.update, [name, img, parseInt(jobId, 10), getType, id], (err, result) => {
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

// 删除材料
router.delete('/', (req, res) => {
  let { id } = req.body;
  if (!id) {
    return dealRes(res, 1, '材料信息错误！')
  }
  try {
    pool.getConnection((err, connection) => {
      if (err) { throw err }
      connection.query(materialSQL.delete, [id], (err, result) => {
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