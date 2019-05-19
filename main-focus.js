// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let secondWindow

// !Understand the difference b/w 'browser-window-focused' and 'focus' event :)
app.on('browser-window-focus', () => {
    console.log('App focused, This will focus on the application (Both main and second window)');
})

function createWindow(event) {

    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        },
        minWidth: 400,// bydefault user can changes the dimenseion of renderer process in any dimension
        // so we need to specifiy that, limiting the height and width to min dimension
        minHeight: 200
    })
    secondWindow = new BrowserWindow({
        width: 400,
        height: 300,
        webPreferences: {
            nodeIntegration: true
        },
        minWidth: 400,// bydefault user can changes the dimenseion of renderer process in any dimension
        // so we need to specifiy that, limiting the height and width to min dimension
        minHeight: 200
    })

    // and load the index.html of the app.
    mainWindow.loadFile('index.html')
    secondWindow.loadFile('index.html')

    console.log('---ALL widows----');
    console.log(BrowserWindow.getAllWindows());
    console.log('---------');
    // Open the DevTools.
    // mainWindow.webContents.openDevTools()


    mainWindow.on('focus', () => {
        console.log('Only be focused on Main window');
    })

    secondWindow.on('focus', () => {
        console.log('Only be focused on  Second window');
    })

    /*  secondWindow.on('blur', () => {
         console.log('When Second window is out of focused then close the main window');
         mainWindow.close();
     }) */

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

