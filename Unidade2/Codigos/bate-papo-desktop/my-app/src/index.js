


var canal;


const { app, BrowserWindow } = require('electron');
const path = require('path');
var ipc = require('electron').ipcMain;

const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:4000');

ws.on('open', function open() {
});

ws.on('message', function incoming(data) {
  data = JSON.parse(data);
  canal.sender.send('atualiza',data.conteudo);

});







// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.

  const mainWindow = new BrowserWindow({
  width: 800,
  height: 600,
  webPreferences: {
    devTools: false,
    nodeIntegration: true
  }
});
mainWindow.setMenuBarVisibility(false)


  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});



// Trata os eventos do DOM
ipc.on('inicio', function(event, data){
    canal = event;
});
ipc.on('envia', function(event, data){
  ws.send(JSON.stringify({tipo:'texto',conteudo:data}));

});
