import { Middleware } from 'koa'
import Router from 'koa-router'

import {
  Props, 
} from '@interfaces'

export default (props: Props): Middleware => {
  const router = new Router()

  const { 
    discord,
  } = props

  router.get('/redirect', ctx => {
    const { redirect } = ctx.query

    if (!redirect) return ctx.throw(400, 'Please provide a redirect query parameter.') 

    ctx.redirect(discord.generateRedirect(redirect, ['identify']))
  })

  router.get('/get/:id', async ctx => {
    ctx.body = await discord.getUserById(ctx.params.id)
  })

  router.get('/process-code', async ctx => {
    const { code } = ctx.query

    if (!code) return ctx.throw(400, 'Please provide a code query parameter.') 

    const { redirect } = ctx.query

    if (!redirect) return ctx.throw(400, 'Please provide a redirect query parameter.') 

    ctx.body = await discord.processCode(code, redirect)
  })

  return router.routes()
}
