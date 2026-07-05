import { useCallback, useSyncExternalStore } from "react"

function getSnapshot<T>(key: string) {
  return () => {
    return window.localStorage.getItem(key) as unknown as T | null
  }
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback)
  return () => {
    window.removeEventListener("storage", callback)
  }
}

export function useLocalStorage<T>(key: string, initialValue: string) {
  const value = useSyncExternalStore<T | null>(subscribe, getSnapshot(key))
  const setNew = useCallback(
    (value: T) => {
      window.localStorage.setItem(key, value as unknown as string)
      // Dispatch a storage event to notify the same tab
      window.dispatchEvent(
        new StorageEvent("storage", {
          key,
          newValue: value as unknown as string,
        }),
      )
    },
    [key],
  )
  return [value ?? initialValue, setNew] as const
}
