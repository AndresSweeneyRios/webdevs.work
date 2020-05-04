import path from 'path'
import fs from 'fs'
import koa from 'koa'
import compression from 'koa-compress'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'

import api from './api'

import { Props } from '@interfaces'

export default (props: Props): void => {
  const app = new koa()
  const router = new Router()

  const {
    config, 
    success,
    failure,
  } = props

  app.use(compression())
  app.use(bodyParser())

  app.on('error', error => failure(error))

  router.use('/api', api(props))

  router.get('*', ctx => {
    const file = path.join(__dirname, '../dist/client', ctx.path)
    const index = path.join(__dirname, '../dist/client/index.html')

    if (fs.existsSync(index)) {
      const result = ctx.path === '/' || !fs.existsSync(file) ? index : file
      const [extension] = /\.[^.]+$/.exec(result)
      ctx.type = extension
      ctx.body = fs.createReadStream(result)
    } else {
      throw new Error('Client hasn\'t been built yet.')
    }
  })

  app.use(router.routes())

  const port = config.isDevelopment ? config.development.backendPort : config.port

  app.listen(port)
  
  success(`Running on port ${port}.`)
}
