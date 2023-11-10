/**
 * ElectronJS main process
 */
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');


const main = async () => {
  await app.whenReady();

  // Handle creating/removing shortcuts on Windows when installing/uninstalling
  if (require('electron-squirrel-startup')) {
    app.quit();
  }


  /************* BROWSER WINDOW *************/
  const browserWindow = new BrowserWindow({
    x: 50,
    y: 80,
    width: 1800,
    maxWidth: 1800,
    height: 950,
    maxHeight: 950,
    resizable: false,
    movable: true,
    alwaysOnTop: false,
    icon: './src/public/img/dodo-framework.png',
    title: 'DoDo - Electron Application',
    frame: true,
    webSecurity: false,
    spellcheck: false,
    webPreferences: {
      devTools: true,
      nodeIntegration: true, // is default value after Electron v5
      contextIsolation: false, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      preload: path.join(__dirname, 'preload.js') // use a preload script
    }
  });

  await browserWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  browserWindow.removeMenu();
  browserWindow.show();
  browserWindow.webContents.openDevTools({ mode: 'bottom' }); // debug

  // close all processes when app window is closed
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });


  browserWindow.webContents.send('versions-info', process.versions);

};



main().catch(console.log);
