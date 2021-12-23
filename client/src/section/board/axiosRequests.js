import axios from 'axios'
require('dotenv').config()
const PROTOCOL = 'http'
const DOMAIN = 'localhost'
const PORT = 4000

export const codeCubeApi = (
  method = 'GET',
  url = '',
  data = null,
  Authorization = null,
  contentType = null
) => {
  method = method.toUpperCase()
  url = `${PROTOCOL}://${DOMAIN}:${PORT}` + url
  data = data || {}
  Authorization = Authorization ? `bearer ${Authorization}` : ''
  contentType = contentType || 'application/json; charset=utf-8'

  const defaultRequest = {
    method,
    url,
    data,
  }

  const defaultConfig = {
    withCredentials: true,
    headers: {
      Authorization,
      contentType,
    },
  }
  return axios(defaultRequest, defaultConfig)
}
