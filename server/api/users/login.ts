import { Middleware } from 'koa'
import Router from 'koa-router'
import argon2 from 'argon2'

import {
  Props, 
  User, 
  UserBody, 
} from '@interfaces'

export default (props: Props): Middleware => {
  const router = new Router()

  const { 
    db, 
    jwt,
  } = props

  const Users = db('users')
  const Sessions = db('sessions')

  router.post('/', async ctx => {
    const {
      password,
      username,
    }: UserBody = ctx.request.body

    if (!password) return ctx.throw(400, 'No password provided.')
    if (!username) return ctx.throw(400, 'No username provided.')
    if (password.length < 6 || password.length > 500) return ctx.throw(400, 'Invalid password.')
    if (/[^A-z0-9_\- \.]/.test(username) || username.length > 50) return ctx.throw(400, 'Invalid username.')

    const user: User = await Users.findOne({ username })

    if (!user) return ctx.throw(401, 'The username or password you entered is incorrect.')

    const isCorrectPassword = await argon2.verify(user.hash, password)

    if (!isCorrectPassword) return ctx.throw(401, 'The username or password you entered is incorrect.')

    const {
      createdAt,
      id,
    } = user

    const accessToken = jwt.sign({
      id,
      expires: Date.now() + 900000, // 15 minutes
    })

    const refreshToken = jwt.sign({
      id,
      expires: Date.now() + 604800000, // 1 week
    })

    ctx.cookies.set('accessToken', accessToken, {
      expires: new Date(Date.now() + 900000), // 15 minutes
      sameSite: 'lax',
    })
    
    ctx.cookies.set('refreshToken', refreshToken, {
      expires: new Date(Date.now() + 604800000), // 1 week
      sameSite: 'lax',
    })

    await Sessions.insert({
      id,
      refreshToken,
    })

    ctx.body = {
      username,
      createdAt,
      id,
    }
  })

  return router.routes()
}
