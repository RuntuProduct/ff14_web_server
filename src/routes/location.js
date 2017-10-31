import express from 'express'
import mysql from 'mysql'
import dbConfig from '../db/config'
import locationSQL from '../db/locationSQL'
import dealRes from '../utils/dealRes'

const router = express.Router()
// 使用数据库配置信息创建一个MySQL连接池
const pool = mysql.createPool(dbConfig.mysql)

// 根据地图id获取地点数组
router.get('/', (req, res) => {
  const { mapId } = req.query
  if (mapId == undefined) {
    return dealRes(res, 1, '缺少地图id！')
  }

  try {
    pool.getConnection((err1, connection) => {
      if (err1) throw err1
      connection.query(locationSQL.getLocationById, [mapId], (err2, result) => {
        if (err2) throw err2
        // 释放连接池
        connection.release()
        return dealRes(res, 0, result)
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
      connection.query(locationSQL.insert, [name, img], (err2, result) => {
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
      connection.query(locationSQL.update, [name, img, id], (err2, result) => {
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
