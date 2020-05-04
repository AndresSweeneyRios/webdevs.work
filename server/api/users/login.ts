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
  } = props

  const Users = db('users')

  router.post('/', async ctx => {
    const {
      password,
      username,
    }: UserBody = ctx.request.body

    if (!password) return ctx.throw(400, 'No password provided.')
    if (!username) return ctx.throw(400, 'No username provided.')
    if (password.length < 6) return ctx.throw(400, 'Invalid password.')
    if (/[^A-z0-9_\- \.]/.test(username)) return ctx.throw(400, 'Invalid username.')

    const user: User = await Users.findOne({ username })

    if (!user) return ctx.throw(401, 'The username or password you entered is incorrect.')

    const isCorrectPassword = await argon2.verify(user.hash, password)

    if (!isCorrectPassword) return ctx.throw(401, 'The username or password you entered is incorrect.')

    const {
      createdAt,
      id,
      externalAccounts,
    } = user

    ctx.body = {
      username,
      createdAt,
      id,
      externalAccounts,
    }
  })

  return router.routes()
}
