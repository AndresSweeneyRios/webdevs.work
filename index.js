const options = require('./tsconfig.json')

require('ts-node').register({
  lazy: true,
  ...options,
})

module.exports = require('./server/index.ts')
