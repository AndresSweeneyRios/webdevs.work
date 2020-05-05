export interface CustomConfig {
  development?: {
    backendPort: number
    frontendPort: number
  }

  meta?: {
    title: string
    description: string
    thumbnail: string
    themeColor: string
    url: string
  }

  port?: number

  dataPath?: string

  isDevelopment?: boolean
}
