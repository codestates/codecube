import axios from 'axios'

const PROTOCOL = 'http'
const DOMAIN = 'localhost'
const PORT = 4000

export const codeCubeApi = (
  method = 'GET',
  url = '',
  data = null,
  auth = null,
  contentType = null
) => {
  console.log('REQUEST!!!!!')
  method = method.toUpperCase()
  url = `${PROTOCOL}://${DOMAIN}:${PORT}` + url
  data = data || {}
  auth = auth ? `Bearer ${auth}` : ''
  contentType = contentType || 'application/json; charset=utf-8'

  const defaultRequest = {
    method,
    url,
    data,
  }

  const defaultConfig = {
    withCredentials: true,
    auth,
    headers: {
      contentType,
    },
  }

  return axios(defaultRequest, defaultConfig)
}
