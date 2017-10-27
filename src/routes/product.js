import express from 'express'
import mysql from 'mysql'
import dbConfig from '../db/config'
import productSQL from '../db/productsql'
import dealRes from '../utils/dealRes'

const router = express.Router()
// 使用数据库配置信息创建一个MySQL链接池
const pool = mysql.createPool(dbConfig.mysql)

// 获取分页
router.get('/', (req, res) => {
  let { page, pageSize } = req.query
  const { name, jobId } = req.body
  page = parseInt(page, 10)
  pageSize = parseInt(pageSize, 10)

  if (!page || !pageSize) {
    return dealRes(res, 1, '分页信息错误！')
  }

  let sName
  if (name) {
    sName = `%${name}%`
  } else {
    sName = '%'
  }
  let sJob
  if (jobId) {
    sJob = [jobId]
  } else {
    sJob = [4, 5, 6, 7, 8, 9, 10, 11]
  }

  try {
    pool.getConnection((err1, connection) => {
      if (err1) { throw new Error(err1) }
      connection.query(productSQL.queryPage, [sName, sJob, (page - 1) * pageSize, pageSize], (err2, result) => {
        if (err2) { throw new Error(err2) }
        connection.query(productSQL.count, (err3, count) => {
          if (err3) { throw new Error(err3) }
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

// 添加作物
router.post('/', (req, res) => {
  const { name, img, jobId, level, difficulty, stamina } = req.body

  if (!name || parseInt(jobId, 10) != jobId || jobId === 0 || !level) {
    return dealRes(res, 1, '作物信息错误！')
  }

  try {
    pool.getConnection((err1, connection) => {
      if (err1) { throw new Error(err1) }
      connection.query(productSQL.insert, [name, img, jobId, level, difficulty, stamina], (err, result) => {
        if (err) { throw err }
        // 释放连接池
        connection.release()
        return dealRes(res, 0, '添加成功')
      })
    })
  } catch (e) {
    return dealRes(res, 1, 'internal error')
  }
})

// 编辑作物
router.put('/', (req, res) => {
  const { id, name, img, jobId, level, difficulty, stamina } = req.body

  if (!id || !name || parseInt(jobId, 10) != jobId || jobId == 0 || !level) {
    return dealRes(res, 1, '作物信息错误！')
  }

  try {
    pool.getConnection((err1, connection) => {
      if (err1) { throw err1 }
      connection.query(productSQL.update, [name, img, parseInt(jobId, 10), level, difficulty, stamina, id], (err2, result) => {
        if (err2) { throw err2 }
        // 释放连接池
        connection.release()
        return dealRes(res, 0, '修改成功')
      })
    })
  } catch (e) {
    return dealRes(res, 1, 'internal error')
  }
})

// 删除作物
router.delete('/', (req, res) => {
  const { id } = req.body
  if (!id) {
    return dealRes(res, 1, '作物信息错误！')
  }
  try {
    pool.getConnection((err1, connection) => {
      if (err1) { throw new Error(err1) }
      connection.query(productSQL.delete, [id], (err2, result) => {
        if (err2) { throw new Error(err2) }
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
