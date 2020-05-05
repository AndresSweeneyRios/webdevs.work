import { Middleware } from 'koa'

import {
  Props,
} from '@interfaces'

export default (props: Props): Middleware => async (ctx, next): Promise<void> => {
  const {
    failure,
    jwt,
    db,
  } = props

  try {
    const signedAccessToken = ctx.cookies.get('accessToken')
  
    if (!signedAccessToken) {
      ctx.loggedIn = false
      await next()

      return
    }
    
    const accessToken = jwt.verify(signedAccessToken)

    if (accessToken.expires <= Date.now()) {
      const signedRefreshToken = ctx.cookies.get('refreshToken')
      const refreshToken = jwt.verify(signedRefreshToken)

      if (refreshToken.expires <= Date.now()) {
        ctx.loggedIn = false
      } else {
        const Sessions = db('sessions')

        const isValid = Boolean(await Sessions.findOne({ refreshToken: signedRefreshToken }))
        
        if (isValid) {
          const newAccessToken = jwt.sign({
            id: refreshToken.id,
            expires: Date.now() + 900000, // 15 minutes
          })
      
          const newRefreshToken = jwt.sign({
            id: refreshToken.id,
            expires: Date.now() + 604800000, // 1 week
          })
      
          ctx.cookies.set('accessToken', newAccessToken, {
            expires: new Date(Date.now() + 900000), // 15 minutes
            sameSite: 'lax',
          })
          
          ctx.cookies.set('refreshToken', newRefreshToken, {
            expires: new Date(Date.now() + 604800000), // 1 week
            sameSite: 'lax',
          })

          await Sessions.update({ refreshToken: signedRefreshToken }, {
            $set: {
              refreshToken: newRefreshToken,
            },
          })

          ctx.user = refreshToken.id
          ctx.loggedIn = true
        } else {
          ctx.loggedIn = false
        }
      }
    } else {
      ctx.user = accessToken.id
      ctx.loggedIn = true
    }
  } catch (error) {
    failure(error)
  }

  await next()
}
