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

// 获取搜索结果
const getContent = async (val, connection) => {
  const matAry = await getMat(val, connection)
  const fishAry = await getFish(val, connection)
  // console.log('matAry', matAry)
  // console.log('fishAry', fishAry)

  return [{
    type: '01',
    children: matAry,
  }, {
    type: '02',
    children: fishAry,
  }]
}

const getMatDetail = (ary, connection) => {
  const ids = ary.map(da => da.tarId)
  return new Promise((resolve, reject) => {
    if (ids.length) {
      connection.query(collectionSQL.queryMatByIds, [ids], (err, result) => {
        if (err) { reject(err) }
        for (let i = 0; i < ary.length; i += 1) {
          const { tarId } = ary[i]
          const tar = result.filter(da => da.id == tarId)
          if (tar.length) {
            delete tar[0].id
            Object.assign(ary[i], tar[0])
          }
        }
        resolve(ary)
      })
    } else {
      resolve([])
    }
  })
}

const getFishDetail = (ary, connection) => {
  const ids = ary.map(da => da.tarId)
  return new Promise((resolve, reject) => {
    if (ids.length) {
      connection.query(collectionSQL.queryFIshByIds, [ids], (err, result) => {
        if (err) { reject(err) }
        for (let i = 0; i < ary.length; i += 1) {
          const { tarId } = ary[i]
          const tar = result.filter(da => da.id == tarId)
          if (tar.length) {
            delete tar[0].id
            Object.assign(ary[i], tar[0])
          }
        }
        resolve(ary)
      })
    } else {
      resolve([])
    }
  })
}

// 获取采集物详情
const getColDetail = async (res, connection) => {
  // console.log('result', res)
  const matPart = res.filter(da => da.tarType === '01')
  const fishPart = res.filter(da => da.tarType === '02')
  const matAry = await getMatDetail(matPart, connection)
  const fishAry = await getFishDetail(fishPart, connection)
  // console.log('matAry', matAry)
  // console.log('fishAry', fishAry)
  const result = [].concat(matAry, fishAry)

  return result
}

// 根据关键字搜索采集物
router.get('/query', (req, res) => {
  const { val } = req.query
  // console.log(val)
  if (val === undefined || !val) {
    return dealRes(res, 1, '搜索关键字不能为空')
  }

  try {
    pool.getConnection((err1, connection) => {
      if (err1) { throw new Error(err1) }
      // 获取搜索结果
      getContent(val, connection)
        .then((suc) => {
          // 释放连接池
          connection.release()
          return dealRes(res, 0, suc)
        })
        .catch((err2) => {
          // 释放连接池
          connection.release()
          return dealRes(res, 1, '内部错误')
        })
    })
  } catch (e) {
    return dealRes(res, 1, 'internal error')
  }
})

// 根据loId获取采集物列表
router.get('/', (req, res) => {
  const { loId } = req.query

  if (loId === undefined || parseInt(loId, 10) != loId) {
    return dealRes(res, 1, '地点id异常')
  }

  try {
    pool.getConnection((err1, connection) => {
      if (err1) { throw new Error(err1) }
      connection.query(collectionSQL.queryByloId, [loId], (err2, result) => {
        if (err2) { throw new Error(err2) }
        // 根据collcetion 列表获取详情
        getColDetail(result, connection)
          .then((suc) => {
            // 释放连接池
            connection.release()
            return dealRes(res, 0, suc)
          })
          .catch((err3) => {
            // 释放连接池
            connection.release()
            return dealRes(res, 1, '内部错误')
          })
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

// 删除采集方式
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
