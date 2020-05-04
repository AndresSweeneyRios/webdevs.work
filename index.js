const fs = require('fs')
const path = require('path')

const customConfigPath = path.join(__dirname, './config/custom.ts')

if (!fs.existsSync(customConfigPath)) {
  fs.writeFileSync(customConfigPath, 'import {\n  Config,\n} from \'../@interfaces\'\n\nconst config = {\n} as Config\n\nexport default config\n')
}

const options = require('./tsconfig.json')

require('ts-node').register({
  lazy: true,
  ...options,
})

module.exports = require('./server/index.ts')
