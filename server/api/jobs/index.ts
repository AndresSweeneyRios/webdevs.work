import { Middleware } from 'koa'
import Router from 'koa-router'

import { Props } from '@interfaces'

import Post from './post'
// import Discord from './discord'

export default (props: Props): Middleware => {
  const router = new Router()

  router.use('/post', Post(props))

  return router.routes()
}
