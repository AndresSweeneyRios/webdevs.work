import axios from 'axios'

export default async (
  path: string, 
  options = {},
): Promise<object> => {
  try {
    const { data } = await axios(
      path, 
      {
        withCredentials: true,
        ...options,
      },
    )

    return data as object
  } catch ({ response }) {
    const {
      status, 
      data: message, 
      config: { url }, 
    } = response

    console.error(`Error ${status}: ${message} [${url}]`)

    throw {
      status,
      message,
      url,
    }
  }
}
