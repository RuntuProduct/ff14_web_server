import express from 'express'
import mysql from 'mysql'
import dbConfig from '../db/config'
import notesSQL from '../db/notesSQL'
import dealRes from '../utils/dealRes'

const router = express.Router()
// 使用数据库配置信息创建一个MySQL链接池
const pool = mysql.createPool(dbConfig.mysql)

router.get('/product', (req, res) => {
  const { jobId, lvStart, lvEnd } = req.query
  console.log(jobId, lvStart, lvEnd)

  if (
    jobId === undefined
    || parseInt(jobId, 10) != jobId
    || lvStart === undefined
    || lvEnd === undefined
    || lvStart >= lvEnd
  ) {
    return dealRes(res, 1, '参数不合法')
  }

  try {
    pool.getConnection((err, connection) => {
      connection.query(notesSQL.product, [jobId, lvStart, lvEnd], (err1, result) => {
        if (err1) { throw new Error(err1) }
        // 释放连接池
        connection.release()
        return dealRes(res, 0, result)
      })
    })
  } catch (e) {
    return dealRes(res, 1, 'internal error')
  }
})

export default router
