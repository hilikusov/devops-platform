import { journalApi } from './api'

export async function fetchEntries() {
  const response = await journalApi.get('/entries')
  return response.data
}

export async function createEntry(entryData) {
  const response = await journalApi.post('/entries', null, {
    params: entryData,
  })
  return response.data
}