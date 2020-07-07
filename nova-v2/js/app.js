// App Controller
const App = (function (TaskCtrl, UICtrl) {
    // Load Event Listeners
    const loadEventListeners = function () {
        // Get UI selectors
        const UISelectors = UICtrl.getSelectors();

        // Add task event
        document.querySelector(UISelectors.addTaskForm).addEventListener('submit', addTaskSubmit);

        // Check/Uncheck Task Event
        document.querySelector(UISelectors.taskList).addEventListener('click', checkTaskClick);

        // Edit Task Event
        document.querySelector(UISelectors.taskList).addEventListener('click', editTaskClick);

        // Toggle Dark Mode Event
        document.querySelector(UISelectors.darkModeButton).addEventListener('click', toggleDarkMode);

        // Show Task Options
        // document.querySelector(UISelectors.taskList).addEventListener('click', showOptionsOnTaskClick);
        // // Edit icon click event
        // document.querySelector(UISelectors.itemList).addEventListener('click', itemUpdateSubmit);
    }

    // Add task on form submit
    const addTaskSubmit = function (e) {
        const taskInput = UICtrl.getTaskInput();

        // Check if form was filled
        if (taskInput.name !== '') {
            const newTask = TaskCtrl.addTask(taskInput.name, taskInput.date);

            // Paint the new task in UI
            UICtrl.addTaskToListUI(newTask);

            // Add task to LS
            StorageCtrl.storeTask(newTask);

            // Clear the fields 
            UICtrl.clearFields();
        }

        e.preventDefault();
    }

    // const showOptionsOnTaskClick = function (e) {
    //     if (e.target.classList.contains('checkbox')) {
    //         // Check task on button click
    //         checkTaskClick(e);
    //     } else if (e.target.classList.contains('task')) {
    //         UICtrl.showTaskOptions(e.target.id);
    //     }
    // }
    // Check task on button click
    const checkTaskClick = function (e) {
        if (e.target.classList.contains('checkbox')) {
            const task = e.target.parentElement;

            const taskId = parseInt(task.id.split('-')[1]);
            if (task.classList.contains('is-checked')) {
                // Change task status in data structure
                TaskCtrl.uncompleteTask(taskId);

                // Uncomplete task in Storage
                StorageCtrl.uncompleteTaskInStorage(taskId);

                // Reflect the change in UI
                UICtrl.uncheckTaskInUI(taskId);
            } else {
                TaskCtrl.completeTask(taskId);

                StorageCtrl.completeTaskInStorage(taskId);

                UICtrl.checkTaskInUI(taskId);
            }
        }
    }

    const editTaskClick = function (e) {
        if (e.target.classList.contains('edit-icon')) {
            const task = e.target.parentElement.parentElement;
            const taskId = parseInt(e.target.parentElement.parentElement.id.split('-')[1]);

            UICtrl.getUserToModifyInput(task);

            const input = document.querySelector('.task-input');

            if (input !== null) {
                input.addEventListener('blur', function (e) {
                    const taskName = UICtrl.resetTaskField(task, input);

                    // Update changes in data structure
                    TaskCtrl.modifyTask(taskId, taskName);

                    // Update changes in LS
                    StorageCtrl.commitTaskChangestoStorage(taskId, taskName);
                });

                input.addEventListener('keyup', function (e) {
                    if (event.keyCode === 13) {
                        const taskName = UICtrl.resetTaskField(task, input);

                        // Update changes in data structure
                        TaskCtrl.modifyTask(taskId, taskName);

                        // Update changes in LS
                        StorageCtrl.commitTaskChangestoStorage(taskId, taskName);
                    }
                });

            }


            // console.log(newTaskName);
            // if (newTaskName !== undefined) {
            //     console.log('it works');
            //     // Update taskName in storage
            //     StorageCtrl.modifyTaskNameInStorage(newTaskName, taskId);
            // }
        }
    }

    const toggleDarkMode = function (e) {
        console.log('toggle dark mode');

        document.body.classList.toggle('dark-mode');



    }

    // Public methods
    return {
        init: function () {
            UICtrl.clearFields();
            // Fetch tasks from data structure
            const tasks = TaskCtrl.getTasks();

            // Populate list with tasks
            UICtrl.populateTaskList(tasks);

            loadEventListeners();
        }
    }
})(TaskCtrl, UICtrl);

App.init();





































// const taskList = document.querySelector('#task-list');
// const newTaskForm = document.querySelector('#add-task');

// // Load all event listenners
// loadEventListeners();

// // const ui = new UI();
// // const taskO = new Task();

// function loadEventListeners() {
//     // DOM Load Event
//     document.addEventListener('DOMContentLoaded', () => {
//         getTasks().forEach(task => ui.paintTasks(task))
//     });
//     // Add task event
//     // form.addEventListener('submit', addTask);
//     // // Remove task event
//     // taskList.addEventListener('click', removeTask);
//     // // Clear task event
//     // clearBtn.addEventListener('click', clearTasks);
//     // // Filter task event
//     // filter.addEventListener('keyup', filterTasks);
// }

// // const paintTasks = (task) => {
// //     //this.taskList = document.querySelector('#task-list');
// //     taskList.innerHTML += ` 
// //     <li class="task ${task.isChecked ? "is-checked" : ""}" id="task-${task.id}">
// //         <span class="checkbox"></span>
// //         <span class="task-name">${task.name}</span>
// //         <span class="edit-button"><i class="fas fa-pencil-alt edit-icon"></i></span>
// //     </li>
// //     `;
// // }

// const checkTask = (e) => {
//     if (e.target.classList.contains('checkbox')) {
//         const task = e.target.parentElement;
//         let tasks = getTasks();
//         const taskId = parseInt(task.id.split('-')[1]);

//         if (task.classList.contains('is-checked')) {
//             task.classList.remove('is-checked');


//             tasks.forEach(task => {
//                 if (task.id === taskId) {
//                     task.isChecked = false;
//                 }
//             });

//             // console.log(JSON.stringify(tasks));
//             localStorage.setItem('tasks', JSON.stringify(tasks));
//         } else {
//             task.classList.add('is-checked');

//             tasks.forEach(task => {
//                 if (task.id === taskId) {
//                     task.isChecked = true;
//                 }
//             });

//             localStorage.setItem('tasks', JSON.stringify(tasks));

//         }
//     }
// }


// const modifyTask = (e) => {

//     if (e.target.classList.contains('edit-icon')) {
//         const task = e.target.parentElement.parentElement;
//         let taskName = e.target.parentElement.previousElementSibling;

//         taskName.style.display = "none";

//         let input = document.createElement('input');
//         input.className = 'task-input';
//         input.id = 'modify-input';
//         input.value = taskName.textContent;
//         task.appendChild(input);
//         document.querySelector('#modify-input').focus();


//         input.addEventListener('blur', function () {

//             task.style.background = 'white';
//             resetTaskField(task, taskName, input);
//         });

//         input.addEventListener('keyup', function () {
//             if (event.keyCode === 13) {
//                 resetTaskField(task, taskName, input);
//             }
//         });
//     }
// }

// const resetTaskField = function (task, taskName, input) {
//     if (input.value !== "") {
//         task.removeChild(input);
//         taskName.textContent = input.value;
//         taskName.style.display = "block";

//         const taskId = parseInt(task.id.split('-')[1]);
//         updateLocalStorage(taskName.textContent, taskId);
//     } else {
//         task.parentElement.removeChild(task);
//     }
// }


// function updateLocalStorage(taskName, taskId) {
//     let tasks = getTasks();

//     tasks.forEach(task => {
//         if (task.id === taskId) {
//             task.name = taskName;
//         }
//     });

//     // console.log(JSON.stringify(tasks));
//     localStorage.setItem('tasks', JSON.stringify(tasks));
// }

// function storeTaskInLocalStorage(task) {
//     let tasks;
//     if (localStorage.getItem('tasks') === null) {
//         tasks = [];
//     } else {
//         tasks = JSON.parse(localStorage.getItem('tasks'));
//     }
//     tasks.push(task);
//     localStorage.setItem('tasks', JSON.stringify(tasks));
// }

// taskList.addEventListener('click', checkTask);
// taskList.addEventListener('click', modifyTask);


// newTaskForm.addEventListener('submit', (e) => {
//     const taskInput = document.querySelector('.new-task-input');
//     const tasks = getTasks();
//     const taskId = tasks.length;

//     if (taskInput.value !== "") {

//         let taskDate;
//         let taskName = taskInput.value;
//         if (taskName.includes("today")) {
//             const date = new Date();
//             taskDate = date.getDate();
//             taskName = taskName.replace('today', '');
//             console.log(taskDate);
//         } else {
//             taskDate = null;
//         }
//         const newTask = {

//             name: taskName,
//             id: taskId,
//             location: false,
//             deadline: taskDate,
//             isChecked: false
//         }

//         ui.paintTasks(newTask);
//         storeTaskInLocalStorage(newTask);

//         taskInput.value = "";
//     }

//     e.preventDefault();
// });

// // fetch('./js/tasks.json')
// //     .then((response) => {
// //         return response.json();
// //     })
// //     .then((tasks) => {
// //         tasks.forEach((task) => paintTasks(task));
// //     })
// //     .catch((err) => {
// //         console.log('error', err);
// //     });
