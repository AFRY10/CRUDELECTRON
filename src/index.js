const{createWindow}=require('./main')
const{app, BrowserWindow}=require('electron')
require('./database');

  app.whenReady().then(() => { //cuando la aplicacion este lista se ejecuta la promesa
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

  }).catch((err)=>console.log(err))


  