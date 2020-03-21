import axios from 'axios'
import store from '../store/store.js'

const apiClient = axios.create({
  baseURL: `http://localhost:3000`,
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

apiClient.interceptors.request.use(
  config => {
    store.commit('loading/START_LOADING')
    return config
  },
  error => {
    store.commit('loading/FINISH_LOADING')
    return Promise.reject(error)
  }
)

apiClient.interceptors.response.use(
  response => {
    store.commit('loading/FINISH_LOADING')
    return response
  },
  error => {
    store.commit('loading/FINISH_LOADING')
    return Promise.reject(error)
  }
)

export default {
  getEvents(perPage, page) {
    return apiClient.get('/events?_limit=' + perPage + '&_page=' + page)
  },
  getEvent(id) {
    return apiClient.get('/events/' + id)
  },
  postEvent(event) {
    return apiClient.post('/events', event)
  }
}
