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

// 添加地点
router.post('/', (req, res) => {
  const { name, mapId, axisX, axisY, type } = req.body

  if (name === undefined) {
    return dealRes(res, 1, '地点名称不能为空！')
  } else if (mapId === undefined || parseInt(mapId, 10) !== mapId) {
    return dealRes(res, 1, '地图id错误！')
  } else if (axisX === undefined || axisY === undefined) {
    return dealRes(res, 1, '地点坐标异常！')
  } else if (type !== '01' || type !== '02' || type !== '03') {
    return dealRes(res, 1, '地点类型错误！')
  }

  try {
    pool.getConnection((err1, connection) => {
      if (err1) throw err1
      connection.query(locationSQL.insert, [name, mapId, axisX, axisY, type], (err2, result) => {
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

// 编辑地点
router.put('/', (req, res) => {
  const { id, name, mapId, axisX, axisY, type } = req.body

  if (id === undefined || parseInt(id, 10) !== id) {
    return dealRes(res, 1, '地点id异常')
  } else if (name === undefined) {
    return dealRes(res, 1, '地点名称不能为空！')
  } else if (mapId === undefined || parseInt(mapId, 10) !== mapId) {
    return dealRes(res, 1, '地图id错误！')
  } else if (axisX === undefined || axisY === undefined) {
    return dealRes(res, 1, '地点坐标异常！')
  } else if (!(type === '01' || type === '02' || type === '03' || type === '04' || type === '05')) {
    return dealRes(res, 1, '地点类型错误！')
  }

  try {
    pool.getConnection((err1, connection) => {
      if (err1) throw err1
      connection.query(locationSQL.update, [name, mapId, axisX, axisY, type, id], (err2, result) => {
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

router.delete('/', (req, res) => {
  const { id } = req.query
  if (id === undefined || parseInt(id, 10) != id) {
    return dealRes(res, 1, '地图id错误！')
  }

  try {
    pool.getConnection((err1, connection) => {
      if (err1) throw new Error(err1)
      connection.query(locationSQL.deleteById, [id], (err2, result) => {
        if (err2) throw new Error(err2)
        // 释放连接池
        connection.release()
        return dealRes(res, 0, '删除成功')
      })
    })
  } catch (e) {
    return dealRes(res, 1, 'internal error')
  }
})

export default router
