const taskList = document.querySelector('#task-list');
const newTaskForm = document.querySelector('#add-task');

// Load all event listenners
loadEventListeners();

function loadEventListeners() {
    // DOM Load Event
    document.addEventListener('DOMContentLoaded', () => {
        getTasks().forEach(task => paintTasks(task))
    });
    // Add task event
    // form.addEventListener('submit', addTask);
    // // Remove task event
    // taskList.addEventListener('click', removeTask);
    // // Clear task event
    // clearBtn.addEventListener('click', clearTasks);
    // // Filter task event
    // filter.addEventListener('keyup', filterTasks);
}

const paintTasks = (task) => {
    //this.taskList = document.querySelector('#task-list');
    taskList.innerHTML += ` 
    <li class="task ${task.isChecked ? "is-checked" : ""}" id="task-${task.id}">
        <span class="checkbox"></span>
        <span class="task-name">${task.name}</span>
        <span class="edit-button"><i class="fas fa-pencil-alt edit-icon"></i></span>
    </li>
    `;
}

const checkTask = (e) => {
    if (e.target.classList.contains('checkbox')) {
        const task = e.target.parentElement;
        if (task.classList.contains('is-checked')) {
            task.classList.remove('is-checked');
        } else {
            task.classList.add('is-checked');
        }
    }
}

const modifyTask = (e) => {

    if (e.target.classList.contains('edit-icon')) {
        const task = e.target.parentElement.parentElement;
        let taskName = e.target.parentElement.previousElementSibling;

        taskName.style.display = "none";

        let input = document.createElement('input');
        input.className = 'task-input';
        input.id = 'modify-input';
        input.value = taskName.textContent;
        task.appendChild(input);
        document.querySelector('#modify-input').focus();


        input.addEventListener('blur', function () {

            task.style.background = 'white';
            resetTaskField(task, taskName, input);
        });

        input.addEventListener('keyup', function () {
            if (event.keyCode === 13) {
                resetTaskField(task, taskName, input);
            }
        });
    }
}

const resetTaskField = function (task, taskName, input) {
    if (input.value !== "") {
        task.removeChild(input);
        taskName.textContent = input.value;
        taskName.style.display = "block";

        const taskId = parseInt(task.id.split('-')[1]);
        updateLocalStorage(taskName.textContent, taskId);
    } else {
        task.parentElement.removeChild(task);
    }
}

const addToLocalStorage = function (tasks) {
    localStorage.setItem(JSON.stringify(tasks));
}

function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    return tasks;
}

function updateLocalStorage(taskName, taskId) {
    let tasks = getTasks();

    tasks.forEach(task => {
        if (task.id === taskId) {
            task.name = taskName;
        }
    });

    // console.log(JSON.stringify(tasks));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

taskList.addEventListener('click', checkTask);
taskList.addEventListener('click', modifyTask);


newTaskForm.addEventListener('submit', (e) => {
    const taskInput = document.querySelector('.new-task-input');
    const tasks = getTasks();
    const taskId = tasks.length;

    if (taskInput.value !== "") {
        const newTask = {

            name: taskInput.value,
            id: taskId,
            location: false,
            deadline: "",
            isChecked: false
        }

        paintTasks(newTask);
        storeTaskInLocalStorage(newTask);

        taskInput.value = "";
    }

    e.preventDefault();
});

// fetch('./js/tasks.json')
//     .then((response) => {
//         return response.json();
//     })
//     .then((tasks) => {
//         tasks.forEach((task) => paintTasks(task));
//     })
//     .catch((err) => {
//         console.log('error', err);
//     });
