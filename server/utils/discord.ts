import base64 from './base64'
import fetch from './fetch'

import {
  AxiosRequestConfig,
} from 'axios'

import {
  DiscordToken,
  DiscordConfig,
  DiscordUser,
  Discord,
} from '@interfaces'

const apiRequest = async (
  path: string,
  authorization: string,
  options: AxiosRequestConfig = {
    headers: {},
  },
): Promise<object> => {
  try {
    return await fetch(`https://discordapp.com/api${path}`, {
      ...options,
      headers: { 
        'Authorization': authorization,
        'Content-Type': 'application/x-www-form-urlencoded',
        ...options.headers,
      },
    }) as object
  } catch ({ data, status, url }) {
    const {
      message, 
      error_description: error, 
    } = data

    throw new Error(`${status} at ${url} | ${ message || error || JSON.stringify(data) }`)
  }
}

export default ({ botToken, clientId, clientSecret }: DiscordConfig): Discord => {
  const Bearer = (token: string): string => `Bearer ${token}`
  const Basic = (): string => `Basic ${base64.encode(`${clientId}:${clientSecret}`)}`
  const Bot = (): string => `Bot ${botToken}`

  const getAvatar = (id: string, avatar: string): string => (
    `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`
  )

  const getDefaultAvatar = (discriminator: number): string => (
    `https://cdn.discordapp.com/embed/avatars/${discriminator % 5}.png`
  )

  const getUserById = async (id: string): Promise<DiscordUser> => {
    const data = await apiRequest(`/users/${ id }`, Bot()) as DiscordUser

    const { 
      avatar, 
      discriminator,
    } = data

    return {
      ...data,
      avatarUrl: data.avatar ? getAvatar(id, avatar) : getDefaultAvatar(discriminator),
    } as DiscordUser
  }

  const getUserByToken = async (token?: string): Promise<DiscordUser> => {
    const data = await apiRequest(`/users/@me`, Bearer(token)) as DiscordUser

    const { 
      id, 
      avatar, 
      discriminator,
    } = data

    return {
      ...data,
      avatarUrl: data.avatar ? getAvatar(id, avatar) : getDefaultAvatar(discriminator),
    } as DiscordUser
  }
  
  const processCode = async (code: string,  redirectUri: string): Promise<DiscordToken> => {
    const { 
      access_token: accessToken, 
      refresh_token: refreshToken,
    } = await apiRequest(`/oauth2/token`, Basic(), { 
      method: 'POST',
      params: {
        'grant_type': 'authorization_code',
        'client_id': clientId,
        'redirect_uri': redirectUri,
        'code': code,
      },
    }) as { access_token: string, refresh_token: string }

    const user = await getUserByToken(accessToken)
  
    return {
      accessToken,
      refreshToken,
      user,
    }
  }

  const refresh = async (refreshToken: string, redirectUri: string): Promise<DiscordToken> => {
    const { 
      access_token: accessToken, 
    } = await apiRequest(`/oauth2/token`, Basic(), { 
      method: 'POST',
      params: {
        'grant_type': 'refresh_token',
        'redirect_uri': redirectUri,
        'refresh_token': refreshToken,
      },
    }) as { access_token: string }

    const user = await getUserByToken(accessToken)
  
    return {
      accessToken,
      refreshToken,
      user,
    }
  }

  const generateRedirect = (redirectURI: string, scopes: string[]): string => (
    `https://discordapp.com/oauth2/authorize?client_id=${
      clientId
    }&scope=${
      scopes.join('%20')
    }&response_type=code&redirect_uri=${
      redirectURI
    }&prompt=none`
  )

  return {
    getUserById,
    getUserByToken,
    processCode,
    refresh,
    generateRedirect,
  }
}
