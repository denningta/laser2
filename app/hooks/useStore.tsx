import { createStore, Store } from "@tauri-apps/plugin-store"
import { useEffect, useState } from "react"

const useStore = () => {

  const setupStore = async () => {
    const s = await createStore('store.bin')
    return s
  }

  const get = async <T,>(key: string) => {
    try {
      const store = await setupStore()
      const value = await store.get<T>(key)
      return value

    } catch (e: any) {
      throw new Error(e)
    }
  }

  const set = async (key: string, value: any) => {
    try {
      const store = await setupStore()
      await store.set(key, value)
      await store.save()
      return value

    } catch (e: any) {
      throw new Error(e)
    }
  }

  const deleteKey = async (key: string) => {
    try {
      const store = await setupStore()
      await store.delete(key)
      await store.save()
    } catch (e: any) {
      throw new Error(e)
    }
  }

  return {
    get,
    set,
    deleteKey
  }

}

export default useStore
