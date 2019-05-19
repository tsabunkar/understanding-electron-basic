// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow



console.log('Is app ready here ?', app.isReady());

setTimeout(() => {
  console.log('Is app ready here now after 3sec ?', app.isReady());
}, 3000);

function createWindow(event) {
  console.log('App is now ready');
  /* 
    console.log('ready event has event object i.e-', event); 
    */

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    mainWindow = null
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


// !on -> listener for events
// before-quit event
app.on('before-quit', (e) => {
  console.log('App is about quit, but stopping quit (only file>exit is prevented, not x button) ');
  // Stopping the quit 
  // Emitted before the application starts closing its windows. Calling event.preventDefault() 
  // will prevent the default behavior, which is terminating the application.
  /*  e.preventDefault(); */
});

app.on('browser-window-blur', (e) => {
  console.log('Window is no longer focused /out of focused');
  // listen for blur event and quit after 5 sec's
  setTimeout(() => {
    console.log('5sec finished bro');
    app.quit();
  }, 5000);
});

app.on('browser-window-focus', (e) => {
  console.log('Window is in focused !!!');
});

// !Get important filesystem paths
console.log('-----paths-------');
console.log(app.getPath('desktop'));
console.log(app.getPath('music'));
console.log(app.getPath('temp'));
console.log(app.getPath('userData'));
console.log('----------');

// !Setting count like message poping up (only supported in  Linux macOS)
app.setBadgeCount(22);
