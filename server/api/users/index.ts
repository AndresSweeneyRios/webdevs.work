import { Middleware } from 'koa'
import Router from 'koa-router'

import { Props } from '@interfaces'

import NewUser from './new'
import Login from './login'
// import Discord from './discord'

export default (props: Props): Middleware => {
  const router = new Router()

  const {
    // config, 
  } = props

  router.use('/new', NewUser(props))
  router.use('/login', Login(props))

  // if (config.oAuth.discord) router.use('/discord', Discord(props))

  return router.routes()
}
