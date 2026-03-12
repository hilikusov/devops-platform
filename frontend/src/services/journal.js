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

export async function updateEntry(entryId, entryData) {
  const response = await journalApi.put(`/entries/${entryId}`, null, {
    params: entryData,
  })
  return response.data
}

export async function deleteEntry(entryId) {
  const response = await journalApi.delete(`/entries/${entryId}`)
  return response.data
}

export async function fetchLatestInsight() {
  const response = await journalApi.get('/insights/latest')
  return response.data.insight
}