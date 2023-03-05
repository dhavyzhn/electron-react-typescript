import { app, BrowserWindow } from 'electron'
import path from 'node:path'

process.env.ROOT = path.join(__dirname, '..')
process.env.DIST = path.join(process.env.ROOT, 'dist-electron')
process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_UR
  ? path.join(process.env.ROOT, 'public')
  : path.join(process.env.ROOT, 'dist')

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'


let win: BrowserWindow | null;

const preload = path.join(process.env.DIST, 'preload.js')

function createWindow() {
  win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload,
    },
  })

  process.env.VITE_DEV_SERVER_URL
    ? win.loadURL(process.env.VITE_DEV_SERVER_URL)
    : win.loadFile(path.join(process.env.VITE_PUBLIC, 'index.html'))

}

app.on('ready', createWindow);
