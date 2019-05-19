- Electron API :
  ○ Main Process
  ○ Renderer Process
  ○ Shared

---

- Main Process :
  electron.app -> Controls your application's event life cycle
  Refer : https://electronjs.org/docs/api/app

---

-( Refer: https://electronjs.org/docs/api/browser-window )
Parent & Child process

---

Electron window state : When we close the app and reopen the app, its postion is lost and the app opens at the
center, so to open it at the left out postion we can use Electron windows state dependency :
-> npm i electron-window-state

---

webContents :-
webContents is an EventEmitter. It is responsible for rendering and controlling a web page and is a property of the BrowserWindow object. An example of accessing the webContents object:

---

Main process :-
Session : Bydefault a single default session is created in electron when app is started, this
default session is also attached to each browser window as we create

Session is resposnible for cookies, local storage and web sql, etc
