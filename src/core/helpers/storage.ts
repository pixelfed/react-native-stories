/* eslint-disable global-require */
import { STORAGE_KEY } from '../constants'
import type { ProgressStorageProps } from '../dto/helpersDTO'
import { MMKV } from 'react-native-mmkv'

export const clearProgressStorage = async () => {
  try {
    const storage = new MMKV()
    return storage.delete(STORAGE_KEY)
  } catch (error) {
    return null
  }
}

export const getProgressStorage = async (): Promise<ProgressStorageProps> => {
  try {
    const storage = new MMKV()
    const progress = await storage.getString(STORAGE_KEY)
    return progress ? JSON.parse(progress) : {}
  } catch (error) {
    return {}
  }
}

export const setProgressStorage = async (user: string, lastSeen: string) => {
  const progress = await getProgressStorage()
  progress[user] = lastSeen

  try {
    const storage = new MMKV()
    await storage.set(STORAGE_KEY, JSON.stringify(progress))
    return progress
  } catch (error) {
    return {}
  }
}
