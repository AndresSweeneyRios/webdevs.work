import { Role } from './Role'
import { Message } from './Message'
import { DiscordConfig } from './discord'

export interface CustomConfig {
  development?: {
    backendPort: number
    frontendPort: number
  }

  textChannels?: Array<{
    name: string
    id: string

    permissions: Array<{
      role: Role
      canWrite: boolean
      canRead: boolean
      canEmbed: boolean
      canAttach: boolean
      canPing: boolean
      canPingAll: boolean
      isMuted: boolean
    }>

    messages?: Message[]
  }>

  meta?: {
    title: string
    description: string
    thumbnail: string
    themeColor: string
    url: string
  }

  oAuth: {
    discord?: boolean
    github?: boolean
    twitter?: boolean
    google?: boolean
  }

  oAuthCredentials: {
    discord?: DiscordConfig

    github?: {}
    twitter?: {}
    google?: {}
  }

  port?: number

  dataPath?: string

  isDevelopment?: boolean
}
