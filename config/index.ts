import path from 'path'

import {
  Config, 
} from '../@interfaces'

const config: Config = {
  development: {
    backendPort: 43434,
    frontendPort: 44444,
  },

  meta: {
    title: 'webdevs.work',
    description: 'Hire web developers or find web work.',
    thumbnail: 'https://example.com/thumb.png',
    themeColor: '#ffffff',
    url: 'https://example.com',
  },

  dataPath: path.join(__dirname, '..', 'data'),

  port: Number(process.env.PORT) || 44444,

  isDevelopment: process.env.NODE_ENV === 'development',
}

export default config
