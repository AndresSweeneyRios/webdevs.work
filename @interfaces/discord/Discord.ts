import { DiscordUser } from './DiscordUser'
import { DiscordToken } from './DiscordToken'

export interface Discord {
  getUserById (id: string): Promise<DiscordUser>
  getUserByToken (token: string): Promise<DiscordUser>
  processCode (code: string, redirectUri: string): Promise<DiscordToken>
  refresh (refreshToken: string, redirectUri: string): Promise<DiscordToken>
  generateRedirect (redirectURI: string, scopes: string[]): string
}
