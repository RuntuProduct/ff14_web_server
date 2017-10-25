const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const dbConfig = require('../db/config')
const fishSQL = require('../db/fishSQL')
const dealRes = require('../utils/dealRes')

// 使用数据库配置信息创建一个MySQL连接池
const pool = mysql.createPool(dbConfig.mysql)

// 获取分页
router.get('/', (req, res) => {
  let { page, pageSize, name, img } = req.query
  page = parseInt(page, 10)
  pageSize = parseInt(pageSize, 10)

  let sName
  if (name) {
    sName = "%" + name + "%"
  } else {
    sName = "%"
  }

  if (!page || !pageSize) {
    return dealRes(res, 1, '分页信息错误！')
  }

  try {
    pool.getConnection((err, connection) => {
      if (err) throw err
      connection.query(fishSQL.queryPage, [sName, (page - 1) * pageSize, pageSize], (err, result) => {
        if (err) throw err
        connection.query(fishSQL.count, (err, count) => {
          if (err) throw err
          // 释放连接池
          connection.release()
          const total = count[0]['total']
          return dealRes(res, 0, {
            list: result,
            current: page,
            pageSize,
            total,
          })
        })
      })
    })
  } catch(e) {
    return dealRes(res, 1, 'internal error')
  }
})

// 添加鱼类
router.post('/', (req, res) => {
  let { name, img } = req.body

  if (!name) {
    return dealRes(res, 1, '材料信息错误！')
  }

  try {
    pool.getConnection((err, connection) => {
      if (err) throw err
      connection.query(fishSQL.insert, [name, img], (err, result) => {
        if (err) throw err
        // 释放连接池
        connection.release()
        return dealRes(res, 0, '添加成功')
      })
    })
  } catch (e) {
    return dealRes(res, 1, 'internal error')
  }
})

// 编辑
router.put('/', (req, res) => {
  let { id, name, img } = req.body

  if (id == undefined || !name) {
    return dealRes(res, 1, '材料信息错误！')
  }

  try {
    pool.getConnection((err, connection) => {
      if (err) throw err
      connection.query(fishSQL.update, [name, img, id], (err, result) => {
        if (err) throw err
        // 释放连接池
        connection.release()
        return dealRes(res, 0, '修改成功')
      })
    })
  } catch (e) {
    return dealRes(res, 1, 'internal error')
  }
})

module.exports = router
