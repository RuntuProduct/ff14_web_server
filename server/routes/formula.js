const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const dbConfig = require('../db/config')
const formulaSQL = require('../db/formulaSQL')
const dealRes = require('../utils/dealRes')

// 使用数据库配置信息创建一个MySQL链接池
const pool = mysql.createPool(dbConfig.mysql);

// router.get('/', (req, res) => {
//   let { pid }
// })

router.post('/', (req, res) => {
  let { pid, tarId, tarType, num } = req.body

  if (pid == undefined || tarId == undefined || !tarType || !num) {
    return dealRes(res, 1, '材料信息错误！')
  }

  try {
    pool.getConnection((err, connection) => {
      if (err) throw err
      connection.query(formulaSQL.query, [pid, tarId, tarType], (err, result) => {
        if (err) throw err
        console.log(result)
        // 判断要添加的元素是否存在
        if (result.length === 0) {
          connection.query(formulaSQL.insert, [pid, tarId, tarType, num], (err, result) => {
            if (err) throw err
            // 释放连接池
            connection.release()
            return dealRes(res, 0, '添加成功')
          })
        } else {
          // 释放连接池
          connection.release()
          return dealRes(res, 1, '该材料已存在！')
        }
      })
    })
  } catch (e) {
    return dealRes(res, 1, 'internal error')
  }
})

module.exports = router
