import { Middleware } from 'koa'
import Router from 'koa-router'

import {
  Props, 
  JobBody,
  Job,
} from '@interfaces'

import generateID from '../../utils/id'

export default (props: Props): Middleware => {
  const router = new Router()

  const { 
    db, 
  } = props

  const Jobs = db('jobs')

  router.post('/', async ctx => {
    const { 
      title,
      location,
      price,
      currency,
      priceType,
      description,
    }: JobBody = ctx.request.body

    if (!title) return ctx.throw(400, 'No title provided.')
    if (!location) return ctx.throw(400, 'No location provided.')
    if (!currency) return ctx.throw(400, 'No currency provided.')
    if (!priceType) return ctx.throw(400, 'No priceType provided.')
    if (!location) return ctx.throw(400, 'No location provided.')
    if (!description) return ctx.throw(400, 'No description provided.')
    if (isNaN(price)) return ctx.throw(400, 'Invalid price.')
    if (!['fixed', 'hourly'].includes(priceType)) ctx.throw(400, 'Invalid priceType.')

    const job: Job = {
      title,
      location,
      price,
      currency,
      priceType,
      description,
      createdAt: Date.now(),
      id: generateID(),
    }

    const {
      createdAt,
      id,
    } = job

    await Jobs.insert(job)

    ctx.body = {
      createdAt,
      id,
    }
  })

  return router.routes()
}
