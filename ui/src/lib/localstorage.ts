interface UserLocalStorageData {
    access_token: number
    refresh_token: number
}

interface Task {
    name: string
}

interface TasksLocalStorageData {
    tasks: Task[]
}

type UserKeys = keyof UserLocalStorageData
type TasksKeys = keyof TasksLocalStorageData

type LocalStorageKey = UserKeys | TasksKeys

type StorageData = Record<LocalStorageKey, unknown | null>

const allLocalSStorageKeysRepresentation: StorageData = {
 // all posible keys => LocalStorageKeys
 // all their values is either unknown or null 
    access_token: 1,
    refresh_token: 1,
    tasks: [{name: 'siema' }],
}


export function saveStorageData(data: Partial<StorageData>): void {
  return (Object.keys(data) as LocalStorageKey[]).forEach((key: LocalStorageKey) =>
    localStorage.setItem(key, JSON.stringify(data[key])),
  )
}

export function removeStorageKeys(storageKeys: LocalStorageKey[]): void {
  return storageKeys.forEach((key: LocalStorageKey) => localStorage.removeItem(key))
}

export function loadStorageData(storageKeys: LocalStorageKey[]): Partial<StorageData> {
  return storageKeys.reduce<Partial<StorageData>>(
    (acc: Partial<StorageData>, storageKey: LocalStorageKey): Partial<StorageData> => ({
      ...acc,
      [storageKey]: JSON.parse(localStorage.getItem(storageKey) || '{}') as unknown | null,
    }),
    {},
  )
}


// saveStorageData({
//     access_token: 'dfdsfd',
//     refresh_token: '',
//     tasks: [{ name: 'siema'}]
// })

// const siema = loadStorageData(['access_token', 'tasks'])