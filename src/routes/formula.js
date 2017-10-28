import express from 'express'
import mysql from 'mysql'
import _ from 'lodash'
import dbConfig from '../db/config'
import formulaSQL from '../db/formulaSQL'
import dealRes from '../utils/dealRes'

const router = express.Router()
// 使用数据库配置信息创建一个MySQL链接池
const pool = mysql.createPool(dbConfig.mysql)

const getTarAry = (ary, type) => {
  return new Promise((resolve, reject) => {
    try {
      const ids = ary.filter(da => da.tarType == type).map(da => da.tarId)
      let query
      if (type === '01') {
        query = formulaSQL.getMaterialByIds
      } else if (type === '02') {
        query = formulaSQL.getProductByIds
      } else if (type === '03') {
        query = formulaSQL.getFishByIds
      } else {
        throw new Error('类型错误')
      }
      // console.log(query, ids)

      pool.getConnection((err1, connection) => {
        if (err1) throw new Error(err1)
        if (ids.length) {
          connection.query(query, [ids], (err2, result) => {
            if (err2) throw new Error(err2)
            connection.release()
            resolve(result)
          })
        } else {
          resolve([])
        }
      })
    } catch (e) {
      reject(e)
    }
  })
}

const mixinAry = (ary, mat, pro, fish) => {
  const result = []
  for (let i = 0; i < ary.length; i += 1) {
    const { tarType, tarId } = ary[i]
    let tar
    if (tarType === '01') {
      tar = mat
    } else if (tarType === '02') {
      tar = pro
    } else {
      tar = fish
    }
    const idx = _.findIndex(tar, (da) => {
      return da.id === tarId
    })
    const res = {}
    if (idx !== -1) {
      Object.assign(res, ary[i], { detail: tar[idx] })
    } else {
      Object.assign(res, ary[i], { detail: { id: null, name: '信息错误' } })
    }
    result.push(res)
  }
  return result
}

// 处理配方数据
const getFormula = async (ary) => {
  const materialAry = await getTarAry(ary, '01')
  const productAry = await getTarAry(ary, '02')
  const fishAry = await getTarAry(ary, '03')
  // console.log(fishAry, productAry, materialAry)
  return mixinAry(ary, materialAry, productAry, fishAry)
}

router.get('/', (req, res) => {
  const { pid } = req.query

  if (pid === undefined) {
    return dealRes(res, 1, 'pid参数错误！')
  }

  try {
    pool.getConnection((err1, connection) => {
      if (err1) throw new Error(err1)
      connection.query(formulaSQL.getSingleProduct, [pid], (err2, result1) => {
        if (err2) throw new Error(err2)
        if (result1 && result1.length) {
          // 成功获取product
          const productObj = result1[0]
          // 获取配方集合
          connection.query(formulaSQL.getFormulaByPid, [pid], (err3, result2) => {
            if (err3) { throw new Error(err3) }
            if (result2 && result2.length) {
              // 处理配方数据
              getFormula(result2).then((formula) => {
                // console.log('formula:', formula)
                // 释放连接池
                connection.release()
                dealRes(res, 0, {
                  ...productObj,
                  formula,
                })
              }, (err4) => {
                throw new Error(err4)
              })
            } else {
              // 释放连接池
              connection.release()
              return dealRes(res, 0, {
                ...productObj,
                formula: [],
              })
            }
          })
        } else {
          // 释放连接池
          connection.release()
          return dealRes(res, 1, '对应的作物不存在！')
        }
      })
    })
  } catch (e) {
    return dealRes(res, 1, 'internal error')
  }
})

router.post('/', (req, res) => {
  const { pid, tarId, tarType, num } = req.body

  if (pid === undefined || tarId == undefined || !tarType || !num) {
    return dealRes(res, 1, '材料信息错误！')
  }

  try {
    pool.getConnection((err1, connection) => {
      if (err1) throw new Error(err1)
      connection.query(formulaSQL.compare, [pid, tarId, tarType], (err2, result1) => {
        if (err2) throw new Error(err2)
        console.log(result1)
        // 判断要添加的元素是否存在
        if (result1.length === 0) {
          connection.query(formulaSQL.insert, [pid, tarId, tarType, num], (err3, result2) => {
            if (err3) throw new Error(err3)
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

export default router
