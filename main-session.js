// Modules to control application life and create native browser window
const { app, BrowserWindow, session } = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let altWindow;

function createWindow(event) {

    // Creating a new session by parition 
    // !NOTE : App session o complete in memory, will be only avaiable untill
    // ! the window is not close (will never be persisted)
    // * Where as main session (built in/default) session is will be peresited even the window is closed or re-opened
    let appSession = session.fromPartition('parition1')
    // ! In order to persist the custom app session
    let appSession2 = session.fromPartition('persist:partition1');

    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })
    /*  altWindow = new BrowserWindow({
         width: 700,
         height: 500,
         webPreferences: {
             nodeIntegration: true
         }
     });
  */
    // Attaching the session
    altWindow = new BrowserWindow({
        width: 700,
        height: 500,
        webPreferences: {
            nodeIntegration: true,
            session: appSession
        }
    });

    // Setting default session
    let defaultSession = session.defaultSession;

    // and load the index.html of the app.
    mainWindow.loadFile('index.html');
    altWindow.loadFile('index.html');


    // Accessing the session
    let mainSession = mainWindow.webContents.session;
    /*     // ! Inorder to clear the storage
        mainSession.clearStorageData(); */

    let altSession = mainWindow.webContents.session;

    console.log('Main window session', mainSession);
    console.log('altenrate window session', altSession);

    console.log('To check if two objects are same', Object.is(mainSession, altSession));
    console.log('To check if two objects are same with default session',
        Object.is(mainSession, defaultSession));
    console.log('To check if two objects are same with Custom app session',
        Object.is(mainSession, appSession));


    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        mainWindow = null
    })
    altWindow.on('closed', function () {
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

