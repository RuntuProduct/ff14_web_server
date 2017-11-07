import express from 'express'
import mysql from 'mysql'
import dbConfig from '../db/config'
import collectionSQL from '../db/collectionSQL'
import dealRes from '../utils/dealRes'

const router = express.Router()
// 使用数据库配置信息创建一个MySQL连接池
const pool = mysql.createPool(dbConfig.mysql)

const getMat = (val, connection) => {
  return new Promise((resolve, reject) => {
    connection.query(collectionSQL.queryMatByName, [`%${val}%`], (err2, result) => {
      if (err2) throw new Error(err2)
      resolve(result)
    })
  })
}

const getFish = (val, connection) => {
  return new Promise((resolve, reject) => {
    connection.query(collectionSQL.queryFishByName, [`%${val}%`], (err2, result) => {
      if (err2) throw new Error(err2)
      resolve(result)
    })
  })
}

const getContent = async (val, connection) => {
  const matAry = await getMat(val, connection)
  const fishAry = await getFish(val, connection)
  console.log('matAry', matAry)
  console.log('fishAry', fishAry)

  return [{
    title: 'material',
    type: '01',
    children: matAry,
  }, {
    title: 'fish',
    type: '02',
    children: fishAry,
  }]
}

router.get('/query', (req, res) => {
  const { val } = req.query
  if (val === undefined || !val) {
    return dealRes(res, 1, '搜索关键字不能为空')
  }

  try {
    pool.getConnection((err1, connection) => {
      if (err1) { throw new Error(err1) }
      getContent(val, connection)
        .then((suc) => {
          return dealRes(res, 0, suc)
        })
        .catch((err2) => {
          return dealRes(res, 1, '内部错误')
        })
    })
  } catch (e) {
    return dealRes(res, 1, 'internal error')
  }
})

// 添加采集方式
router.post('/', (req, res) => {
  const { loId, tarType, tarId } = req.body

  if (loId === undefined || parseInt(loId, 10) != loId) {
    return dealRes(res, 1, '地点id异常！')
  } else if (!(tarType === '01' || tarType === '02')) {
    return dealRes(res, 1, '目标类型错误！')
  } else if (tarId === undefined || parseInt(tarId, 10) !== tarId) {
    return dealRes(res, 1, '目标id错误！')
  }

  try {
    pool.getConnection((err1, connection) => {
      if (err1) throw err1
      connection.query(collectionSQL.insert, [loId, tarType, tarId], (err2, result) => {
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

router.delete('/', (req, res) => {
  const { id } = req.query
  if (id === undefined || parseInt(id, 10) != id) {
    return dealRes(res, 1, 'id错误！')
  }

  try {
    pool.getConnection((err1, connection) => {
      if (err1) throw new Error(err1)
      connection.query(collectionSQL.deleteById, [id], (err2, result) => {
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
