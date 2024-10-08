import { useEffect, useState } from "react"
import useStore from "./useStore"

export interface UseTableStateProps {
  storeKey: string
}

export type TableData = {
  id: string
}

const useTableState = <T extends TableData,>({ storeKey }: UseTableStateProps) => {
  const [array, setArray] = useState<T[]>([])
  const { get, set } = useStore()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const data = await get<T[]>(storeKey)
    setArray(data ?? [])
  }

  const addItem = async (element: T) => {
    const arr = [...array]
    arr.push(element)
    setArray(arr)
    await set(storeKey, arr)
  }

  const updateItem = (element: T) => {
    const arr = [...array]
    let itemIndex = arr.findIndex(item => item.id === element.id)
    if (itemIndex !== -1) {
      arr[itemIndex] = { ...arr[itemIndex], ...element }
      setArray(arr)
    }
  }

  const deleteItem = async (element: T) => {
    const arr = [...array]
    let itemIndex = array.findIndex(item => item.id === element.id)
    if (itemIndex !== -1) {
      arr.splice(itemIndex, 1)
      setArray(arr)
      await set('programs', arr)
    }
  }

  return {
    addItem,
    updateItem,
    deleteItem
  }
}

export default useTableState
