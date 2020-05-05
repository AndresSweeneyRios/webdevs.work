export interface Config {
  development: {
    backendPort: number
    frontendPort: number
  }

  meta: {
    title: string
    description: string
    thumbnail: string
    themeColor: string
    url: string
  }

  port: number

  dataPath: string

  isDevelopment: boolean
}
