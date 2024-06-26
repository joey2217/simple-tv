import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('playerElectronAPI', {
  toggleDevtools: () => ipcRenderer.invoke('TOGGLE_DEVTOOLS'),
  setPlayerAlwaysOnTop: (alwaysOnTop: boolean) =>
    ipcRenderer.invoke('SET_PLAYER_ALWAYS_ON_TOP', alwaysOnTop),
})

function addListener(channel: string, callback: (...args: unknown[]) => void) {
  const listener = (_event: Electron.IpcRendererEvent, ...args: unknown[]) =>
    callback(...args)
  ipcRenderer.on(channel, listener)
  return () => ipcRenderer.off(channel, listener)
}

contextBridge.exposeInMainWorld('playerMessageAPI', {
  onThemeChange: (callback: () => void) =>
    addListener('ON_THEME_CHANGE', callback),
  onPlayVideo: (callback: (id: number) => void) =>
    addListener('ON_PLAY_VIDEO', callback),
  onPlaySportLive: (callback: (id: number, type: number) => void) =>
    addListener('ON_PLAY_SPORT_LIVE', callback),
  onPlayClose: (callback: () => void) =>
    addListener('ON_PLAYER_CLOSE', callback),
})
