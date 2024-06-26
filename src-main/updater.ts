import { autoUpdater } from 'electron-updater'
import log from 'electron-log/main'
import { dialog } from 'electron'

autoUpdater.autoDownload = false
autoUpdater.logger = log

autoUpdater.on('error', (error) => {
  dialog.showErrorBox(
    '更新出错了',
    error == null ? 'unknown' : (error.stack || error).toString()
  )
})

autoUpdater.on('update-available', (info) => {
  dialog
    .showMessageBox({
      type: 'info',
      title: `检测到新版本 ${info.version}`,
      message: '是否马上开始下载更新!',
      detail: `更新时间:${info.releaseDate}\n更新内容: \n${info.releaseNotes}`,
      buttons: ['是', '否'],
    })
    .then((res) => {
      if (res.response === 0) {
        autoUpdater.downloadUpdate()
      }
    })
})

autoUpdater.on('update-not-available', () => {
  dialog.showMessageBox({
    type: 'info',
    title: '暂无更新',
    message: '当前版本已经是最新版本',
  })
})

autoUpdater.on('update-downloaded', () => {
  dialog
    .showMessageBox({
      type: 'info',
      title: '更新下载完成',
      message: '是否立刻更新并重启应用?',
      buttons: ['立刻更新', '下次启动更新'],
    })
    .then((res) => {
      if (res.response === 0) {
        setImmediate(() => autoUpdater.quitAndInstall(true, true))
      } else {
        autoUpdater.autoInstallOnAppQuit = true
      }
    })
})

export function checkForUpdates() {
  log.debug('检测更新 FeedURL->' + autoUpdater.getFeedURL())
  return autoUpdater.checkForUpdates()
}

// 日志
// on Linux: ~/.config/{app name}/logs/main.log
// on macOS: ~/Library/Logs/{app name}/main.log
// on Windows C:\Users\%USERPROFILE%\AppData\Roaming\{app name}\logs\main.log
