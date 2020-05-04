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
  } = props

  const Users = db('users')

  router.post('/', async ctx => {
    const {
      publicKey, 
      password,
      username,
    }: UserBody = ctx.request.body

    if (!publicKey) return ctx.throw(400, 'No public key provided.')
    if (!password) return ctx.throw(400, 'No password provided.')
    if (!username) return ctx.throw(400, 'No username provided.')
    if (password.length < 6) return ctx.throw(400, 'Invalid password.')
    if (/[^A-z0-9_\- \.]/.test(username)) return ctx.throw(400, 'Invalid username.')

    const userExists = Boolean(await Users.findOne({ username }))

    if (userExists) return ctx.throw(400, 'Username taken.')

    const user: User = {
      publicKey,
      username,
      hash: await argon2.hash(password),
      createdAt: Date.now(),
      roles: [],
      id: generateID(),
      avatar: null,
      externalAccounts: {},
    }

    const {
      createdAt,
      id,
      externalAccounts,
    } = user

    await Users.insert(user)

    ctx.body = {
      username,
      createdAt,
      id,
      externalAccounts,
    }
  })

  return router.routes()
}
