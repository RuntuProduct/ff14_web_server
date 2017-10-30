import express from 'express'
import mysql from 'mysql'
import dbConfig from '../db/config'
import mapSQL from '../db/mapSQL'
import dealRes from '../utils/dealRes'

const router = express.Router()
// 使用数据库配置信息创建一个MySQL连接池
const pool = mysql.createPool(dbConfig.mysql)

// 获取分页
router.get('/', (req, res) => {
  let { page, pageSize } = req.query
  const { name } = req.query
  page = parseInt(page, 10)
  pageSize = parseInt(pageSize, 10)

  let sName
  if (name) {
    sName = `%${name}%`
  } else {
    sName = '%'
  }

  if (!page || !pageSize) {
    return dealRes(res, 1, '分页信息错误！')
  }

  try {
    pool.getConnection((err1, connection) => {
      if (err1) throw err1
      connection.query(mapSQL.queryPage, [sName, (page - 1) * pageSize, pageSize], (err2, result) => {
        if (err2) throw err2
        connection.query(mapSQL.count, (err3, count) => {
          if (err3) throw err3
          // 释放连接池
          connection.release()
          const { total } = count[0]
          return dealRes(res, 0, {
            list: result,
            current: page,
            pageSize,
            total,
          })
        })
      })
    })
  } catch (e) {
    return dealRes(res, 1, 'internal error')
  }
})

// 添加地图
router.post('/', (req, res) => {
  const { name, img } = req.body

  if (!name) {
    return dealRes(res, 1, '地图信息错误！')
  }

  try {
    pool.getConnection((err1, connection) => {
      if (err1) throw err1
      connection.query(mapSQL.insert, [name, img], (err2, result) => {
        if (err2) throw err2
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
  const { id, name, img } = req.body

  if (id === undefined || !name) {
    return dealRes(res, 1, '地图信息错误！')
  }

  try {
    pool.getConnection((err1, connection) => {
      if (err1) throw err1
      connection.query(mapSQL.update, [name, img, id], (err2, result) => {
        if (err2) throw err2
        // 释放连接池
        connection.release()
        return dealRes(res, 0, '修改成功')
      })
    })
  } catch (e) {
    return dealRes(res, 1, 'internal error')
  }
})

export default router
