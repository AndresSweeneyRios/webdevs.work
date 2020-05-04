import { Config } from './Config'
import { Discord } from './discord'

import { EventEmitter } from 'events'

export interface Props {
  config: Config
  success: Function
  failure: Function
  db: Function

  jwt: {
    sign: Function
    verify: Function
  }

  ConfigEmitter: EventEmitter

  discord?: Discord
}
