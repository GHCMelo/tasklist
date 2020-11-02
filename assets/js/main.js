const input = document.querySelector('.input');
const btn = document.querySelector('.btn');
const tasks = document.querySelector('.tasks');

function createLi(){
    const li = document.createElement('li')
    return li
}

function createTask(input){
    const li = createLi();
    li.innerText = input;
    tasks.appendChild(li);
    createDeleteBtn(li);
    saveTask();
}

function saveTask(){
    const liTask = tasks.querySelectorAll('li');
    const TasksList = [];

    for (let task of liTask){
        let taskText = task.innerText;
        taskText = taskText.replace('Delete', '').trim();
        TasksList.push(taskText);
    }

    const tasksJSON = JSON.stringify(TasksList);

    localStorage.setItem('Tasks', tasksJSON);

}

function createDeleteBtn(li){
    li.innerText += ' '
    const btnDelete = document.createElement('button');
    btnDelete.innerText = 'Delete';
    btnDelete.setAttribute('class', 'delete')
    li.appendChild(btnDelete)
}

function cleanInput(){
    input.value = '';
    input.focus();
}

function addSavedTasks(){
    const Tasks = localStorage.getItem('Tasks');
    const TasksList = JSON.parse(Tasks);

    for (let task of TasksList){
        createTask(task);
    }
}

addSavedTasks();

btn.addEventListener('click', (e) => {
    e.preventDefault();
    
    if(!input.value) return
    
    createTask(input.value);
    cleanInput();
})

input.addEventListener('keypress', (e) => {

    if(!input.value) return

    if(e.keyCode === 13){
        createTask(input.value);
        cleanInput();
    }
})

document.addEventListener('click', (e) => {
    const el = e.target;
    if(el.classList.contains('delete')){
        el.parentElement.remove();
        saveTask();
    }
})