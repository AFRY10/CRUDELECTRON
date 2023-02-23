const { ipcRenderer } = require("electron")

const taskForm = document.querySelector('#taskForm')
const taskName = document.querySelector('#taskName')
const taskDescription = document.querySelector('#taskDescription')
const taskList = document.querySelector('#taskList')
let tasks = [];
let updateStatus=false;
let idTaskUpdate='';
//FUNCION 

function deleteTask(id) {
    const result = confirm('Are you sure you want to delete?');
    if (result) {
        ipcRenderer.send('delete-task', id);
    }
}

function updateTask(id){
    updateStatus = true;
    idTaskUpdate = id;
    const task = tasks.find(t=>t._id === id);
    taskName.value = task.name;
    taskDescription.value = task.description;

    
}




let renderTasks = (tasks) => {
    taskList.innerHTML = '';
    //lo mapeamos
    tasks.map(t => {
        taskList.innerHTML +=
            `
    <li>
    <h4>${t._id}</h4> 
    <p>Task's name: ${t.name}</p>
    <p>Task's Description: ${t.description}</p>
    <button  onclick="updateTask('${t._id}')">Edit</button>
    <button onclick="deleteTask('${t._id}')">Delete</button>

    </li>

    `
    })
}

taskForm.addEventListener('submit', e => {
    e.preventDefault()
    //crear  un objeto con los valores del evento
    const task = {
        name: taskName.value,
        description: taskDescription.value
    }
    if(!updateStatus) {
        ipcRenderer.send('new-task', task);

    }else{
        ipcRenderer.send('update-task',{...task, idTaskUpdate});
    }

    taskForm.reset();
    taskName.focus();

})

//agg mas argumentos al array
ipcRenderer.on('new-task-created', (e, args) => {
    newTask = JSON.parse(args);
    tasks.push(newTask);
    renderTasks(tasks);
    alert('Created tasks successfully');

})

ipcRenderer.send('get-task')
ipcRenderer.on('get task', (e, args) => {
    const taskRecibed = JSON.parse(args);
    tasks = taskRecibed;
    renderTasks(taskRecibed);

})

ipcRenderer.on('delete-task-success', (e, args) => {
    const taskDeleted = JSON.parse(args);
    const newTask = tasks.filter(t => {
        return t._id !== taskDeleted._id


    })

    tasks = newTask;
    renderTasks(tasks);
})

ipcRenderer.on('update-task-success', (e,args) => {
    const taskUpdated = JSON.parse(args);
    tasks = tasks.map(t=>{
        if(t._id === taskUpdated._id){
            t.name = taskUpdated.name;
            t.description = taskUpdated.description;
        }
        return t;
    })
    renderTasks(tasks);
})



