import axios from 'axios'

const AUTH_API_URL = import.meta.env.VITE_AUTH_API_URL || 'http://localhost:8000'
const JOURNAL_API_URL = import.meta.env.VITE_JOURNAL_API_URL || 'http://localhost:8001'

export const authApi = axios.create({
  baseURL: AUTH_API_URL,
})

export const journalApi = axios.create({
  baseURL: JOURNAL_API_URL,
})

journalApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})