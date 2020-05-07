import { Config } from './Config'

import { Twilio } from 'twilio'

export interface Props {
  config: Config
  success: Function
  failure: Function
  db: Function

  jwt: {
    sign: Function
    verify: Function
  }

  twilio: any
}
