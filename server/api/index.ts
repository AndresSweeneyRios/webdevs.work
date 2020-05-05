import { Middleware } from 'koa'
import Router from 'koa-router'

import { Props } from '@interfaces'

import UsersRouter from './users'
import JobsRouter from './jobs'
import TokenMiddleware from '../middleware/token'

export default (props: Props): Middleware => {
  const router = new Router()

  router.use(TokenMiddleware(props))

  router.use('/users', UsersRouter(props))
  router.use('/jobs', JobsRouter(props))

  router.use('/test', ctx => ctx.body = { a: 'b' })

  return router.routes()
}
