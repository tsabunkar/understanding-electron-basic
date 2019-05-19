// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let childWindow

function createWindow(event) {

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
    // show: false // !show the browser window to false (to avoid flicker process)
    backgroundColor: '##00FFFF' // !Another way of avoiding flicker
  })


  childWindow = new BrowserWindow({
    width: 600,
    height: 400,
    // inorder to have connection of child and parent window :
    parent: mainWindow,
    modal: true,
    show: false
  });

  // childWindow.loadFile('child_index.html');
  childWindow.loadURL('https://youtube.com')
  // and load the index.html of the app.
  mainWindow.loadFile('index.html');

  childWindow.once('ready-to-show', () => {
    childWindow.show();
  });

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    mainWindow = null
  })
  childWindow.on('closed', function () {
    childWindow = null
  })
}

// This method will be called when Electron has finished  initialization 
// and is ready to create browser windows.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})
