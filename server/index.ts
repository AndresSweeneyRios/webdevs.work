import chalk from 'chalk'
import path from 'path'
import fs from 'fs'
import { EventEmitter } from 'events'
import Datastore from 'nedb-promises'

import router from './router'
import jwt from './utils/jwt'
import config from '../config'
import discord from './utils/discord'

import {
  Props, 
} from '@interfaces'

const success = (...args: Array<string>): void => {
  console.log(`${ chalk.bgGreen.black(' API ') }`, ...args, '\n')
}

const failure = (...args: Array<string>): void => {
  console.log(`${ chalk.bgRed.black(' API ') }`, ...args, '\n')
}

const importCustomConfig = async (): Promise<void> => {
  const { default: customConfig } = await import('../config/custom')

  Object.assign(config, customConfig)
}

const init = async (): Promise<void> => {
  const ConfigEmitter = new EventEmitter()

  const customConfigPath = path.join(__dirname, '../config/custom.ts')

  await importCustomConfig()

  fs.watch(customConfigPath, async () => {
    if (typeof require !== 'undefined') {
      for (const key of Object.keys(require.cache)) {
        delete require.cache[key]
      }
    }

    await importCustomConfig()
  })

  const db = (name: string): Datastore => new Datastore(
    path.join(config.dataPath, name),
  )

  const props: Props = {
    config,
    success,
    failure,
    db,
    jwt,
    ConfigEmitter,
    discord: config.oAuth.discord ? discord(config.oAuthCredentials.discord) : null,
  }

  router(props)
}

init().catch(failure)
