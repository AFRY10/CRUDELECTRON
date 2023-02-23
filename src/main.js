const { app, BrowserWindow, ipcMain } = require('electron')
const Task = require('./models/task');



const createWindow = () => { //Funcion para crear ventana
  app.on('ready', () => { //instanciar ready para inicializar el window
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      }

    })

    win.loadFile('src/index.html')

  })

}
ipcMain.on('new-task', async (e, args) => {
  const newTask = new Task(args);
  const taskSave = await newTask.save();
  console.log(taskSave);
  e.reply('new-task-created', JSON.stringify(taskSave));

  console.log(args);
})
exports.createWindow = createWindow();

ipcMain.on('get-task', async (e, args) => {
  const tasks = await Task.find();
  e.reply('get task', JSON.stringify(tasks))
})

ipcMain.on('delete-task', async (e, args) => {
  const tasksDelete = await Task.findByIdAndDelete(args);
  e.reply('delete-task-success', JSON.stringify(tasksDelete))
})

ipcMain.on('update-task', async (e, args) => {
  const tasksUpdate = await Task.findByIdAndUpdate( 
    args.idTaskUpdate,{
      name: args.name,
      description: args.description

    },{new:true})
    e.reply('update-task-success', JSON.stringify(tasksUpdate))

})