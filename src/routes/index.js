// 路由规则存放目录
import upload from './upload'
import user from './user'
import job from './job'
import product from './product'
import material from './material'
import fish from './fish'
import formula from './formula'
import notes from './notes'
import map from './map'
import location from './location'
import collection from './collection'

const router = (app) => {
  app.get('/', (req, res, next) => {
    res.render('./index.html')
  })

  app.all('/api/*', (req, res, next) => {
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, X-Requested-With, Content-Type')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Origin', 'http://192.168.31.200:8014')
    next()
  })

  app.use('/api/upload', upload)
  app.use('/api/user', user)
  app.use('/api/job', job)
  app.use('/api/product', product)
  app.use('/api/material', material)
  app.use('/api/fish', fish)
  app.use('/api/formula', formula)
  app.use('/api/notes', notes)
  app.use('/api/map', map)
  app.use('/api/location', location)
  app.use('/api/collection', collection)
}

export default router
