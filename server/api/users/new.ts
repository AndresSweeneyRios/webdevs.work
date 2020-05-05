import { Middleware } from 'koa'
import Router from 'koa-router'
import argon2 from 'argon2'

import {
  Props, 
  User, 
  UserBody, 
} from '@interfaces'

import generateID from '../../utils/id'

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
    if (password.length < 6) return ctx.throw(400, 'Invalid password.')
    if (/[^A-z0-9_\- \.]/.test(username)) return ctx.throw(400, 'Invalid username.')

    const userExists = Boolean(await Users.findOne({ username }))

    if (userExists) return ctx.throw(400, 'Username taken.')

    const user: User = {
      username,
      hash: await argon2.hash(password),
      createdAt: Date.now(),
      id: generateID(),
      avatar: null,
    }

    const {
      createdAt,
      id,
    } = user

    // await Users.insert(user)

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
