/* eslint-disable */
import axios from 'axios'
/* eslint-enable */

const api = axios.create({
  baseURL: 'http://localhost:3001'
})

export default api
