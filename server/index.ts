import chalk from 'chalk'
import path from 'path'
import Datastore from 'nedb-promises'

import router from './router'
import jwt from './utils/jwt'
import config from '../config'
import secrets from '../config/secrets'
import twilio from 'twilio'

import {
  Props, 
} from '@interfaces'

const success = (...args: Array<string>): void => {
  console.log(`${ chalk.bgGreen.black(' API ') }`, ...args, '\n')
}

const failure = (...args: Array<string>): void => {
  console.log(`${ chalk.bgRed.black(' API ') }`, ...args, '\n')
}

const init = async (): Promise<void> => {
  const db = (name: string): Datastore => new Datastore(
    path.join(config.dataPath, name),
  )

  const props: Props = {
    config,
    success,
    failure,
    db,
    jwt,
    twilio: twilio(
      secrets.twilio.accountSid,
      secrets.twilio.authToken,
      { 
        lazyLoading: true,
      },
    ).verify.services(secrets.twilio.serviceSid),
  }

  router(props)
}

init().catch(failure)
