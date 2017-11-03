import express from 'express'
import mysql from 'mysql'
import _ from 'lodash'
import dbConfig from '../db/config'
import mapSQL from '../db/mapSQL'
import locationSQL from '../db/locationSQL'
import dealRes from '../utils/dealRes'

const router = express.Router()
// 使用数据库配置信息创建一个MySQL连接池
const pool = mysql.createPool(dbConfig.mysql)

const getLocation = (ids) => {
  return new Promise((resolve, reject) => {
    try {
      pool.getConnection((err1, connection) => {
        if (err1) { throw new Error('连接数据库失败') }
        connection.query(locationSQL.getLocationByIds, [ids], (err2, result) => {
          if (err2) { throw new Error(err2) }
          resolve(result)
        })
      })
    } catch (e) {
      reject(e)
    }
  })
}

// 根据id进行地点分组
const mapLocationById = (ary) => {
  const res = {}
  for (let i = 0; i < ary.length; i += 1) {
    const { mapId } = ary[i]
    if (!res[mapId] || !_.isArray(res[mapId])) {
      res[mapId] = []
    }
    res[mapId].push(ary[i])
  }
  return res
}

const handleLocation = async (list) => {
  const result = _.cloneDeep(list)
  const ids = list.map(da => da.id)
  // 获取所有相关的地点数组
  const locationAry = await getLocation(ids)
  // 根据id分组
  const idsObj = mapLocationById(locationAry)
  // 根据id并入对应的map对象体内
  for (let i = 0; i < result.length; i += 1) {
    const { id } = result[i]
    if (idsObj[id] && _.isArray(idsObj[id])) {
      result[i].positionAry = idsObj[id]
    } else {
      result[i].positionAry = []
    }
  }
  console.log(result)
  return result
}

// 获取分页
router.get('/list', (req, res) => {
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
          handleLocation(result).then((list) => {
            return dealRes(res, 0, {
              list,
              current: page,
              pageSize,
              total,
            })
          }, (err) => {
            throw new Error(err)
          })
        })
      })
    })
  } catch (e) {
    return dealRes(res, 1, 'internal error')
  }
})

// 获取单个地图详情
router.get('/', (req, res) => {
  const { id } = req.query
  if (id === undefined || parseInt(id, 10) != id) {
    return dealRes(res, 1, '地图id异常')
  }

  try {
    pool.getConnection((err1, connection) => {
      if (err1) throw err1
      connection.query(mapSQL.query, [id], (err2, result) => {
        if (err2) throw err2
        // 释放连接池
        connection.release()
        handleLocation(result).then((list) => {
          return dealRes(res, 0, list)
        }, (err) => {
          throw new Error(err)
        })
      })
    })
  } catch (e) {
    return dealRes(res, 1, 'internal error')
  }
})

// 添加地图
router.post('/', (req, res) => {
  const { name, img, baseX, baseY } = req.body

  if (name === undefined) {
    return dealRes(res, 1, '地图信息错误！')
  } else if (img === undefined) {
    return dealRes(res, 1, '地图图片信息错误！')
  } else if (!baseX || parseInt(baseX, 10) !== baseX || !baseY || parseInt(baseY, 10) !== baseY) {
    return dealRes(res, 1, '地图尺寸信息错误！')
  }

  try {
    pool.getConnection((err1, connection) => {
      if (err1) throw err1
      connection.query(mapSQL.insert, [name, img, baseX, baseY], (err2, result) => {
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
  const { id, name, img, baseX, baseY } = req.body

  if (id === undefined || parseInt(id, 10) !== id) {
    return dealRes(res, 1, '地图id错误！')
  } else if (name === undefined) {
    return dealRes(res, 1, '地图信息错误！')
  } else if (img === undefined) {
    return dealRes(res, 1, '地图图片信息错误！')
  } else if (!baseX || parseInt(baseX, 10) !== baseX || !baseY || parseInt(baseY, 10) !== baseY) {
    return dealRes(res, 1, '地图尺寸信息错误！')
  }

  try {
    pool.getConnection((err1, connection) => {
      if (err1) throw err1
      connection.query(mapSQL.update, [name, img, baseX, baseY, id], (err2, result) => {
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
