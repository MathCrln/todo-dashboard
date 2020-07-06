// Storage Controller
const StorageCtrl = (function () {

    return {
        storeTask: function (task) {
            let tasks;
            localStorage.getItem('tasks');

            // Check if any tasks in LS
            if (localStorage.getItem('tasks') === null) {
                tasks = [];
                // Push new tasks
                tasks.push(task);

                // Set LS
                localStorage.setItem('tasks', JSON.stringify(tasks));
            } else {
                tasks = JSON.parse(localStorage.getItem('tasks'));

                // Push new tasks
                tasks.push(task);

                // Re set LS
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
        },
        completeTaskInStorage: function (taskId) {
            const tasks = JSON.parse(localStorage.getItem('tasks'));

            tasks.forEach(task => {
                if (taskId === task.id) {
                    task.isChecked = true;
                }
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));

        },
        uncompleteTaskInStorage: function (taskId) {
            const tasks = JSON.parse(localStorage.getItem('tasks'));

            tasks.forEach(task => {
                if (taskId === task.id) {
                    task.isChecked = false;
                }
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
        },
        commitTaskChangestoStorage: function (taskId, taskName) {
            const tasks = JSON.parse(localStorage.getItem('tasks'));
            tasks.forEach(function (task, index) {
                if (taskId === task.id) {
                    if (taskName != undefined) {
                        task.name = taskName;

                    } else {
                        tasks.splice(index, 1);
                    }

                }
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
        },
        getTasksFromStorage: function () {
            let tasks;
            if (localStorage.getItem('tasks') === null) {
                tasks = [];
            } else {
                tasks = JSON.parse(localStorage.getItem('tasks'));
            }
            return tasks;
        }
    }
})();

// Task Controller
const TaskCtrl = (function () {
    // Task constructor
    const Task = function (id, name, isChecked, deadline, location) {
        this.id = id;
        this.name = name;
        this.isChecked = isChecked;
        this.location = location;
        this.deadline = deadline;
    }

    const data = {
        tasks: StorageCtrl.getTasksFromStorage(),
        currentTask: null,
        nbTotalTasks: 0
    }

    // Public methods
    return {
        getTasks: function () {
            return data.tasks;
        },
        addTask: function (name, deadline) {
            let ID;
            // Create ID
            if (data.tasks.length > 0) {
                ID = data.tasks[data.tasks.length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Create new item
            newItem = new Task(ID, name, false, deadline, undefined);

            // Add to items array
            data.tasks.push(newItem);

            this.setTotalTasks();

            return newItem;
        },
        completeTask: function (taskId) {
            data.tasks.forEach(task => {
                if (taskId === `task-${task.id}`) {
                    task.isChecked = true;
                }
            })
        },
        uncompleteTask: function (taskId) {
            data.tasks.forEach(task => {
                if (taskId === task.id) {
                    task.isChecked = false;
                }
            })
        },
        modifyTask: function (taskId, taskName) {
            data.tasks.forEach((task, index) => {
                if (taskId === task.id) {
                    if (taskName != undefined) {
                        task.name = taskName;
                    } else {
                        data.tasks.splice(index, 1);
                    }
                }
            });

        },
        logData: function () {
            return data;
        },
        setTotalTasks: function () {
            data.nbTotalTasks = data.tasks.length;
        },
        getTotalTask: function () {
            return data.nbTotalTasks;
        }
    }


})();

// UI Controller
const UICtrl = (function () {
    const UISelectors = {
        taskList: '#task-list',
        addTaskForm: '#add-task',
        updateTaskBtn: '.update-task',
        newTaskInput: '.new-task-input',
        taskName: '.task-name',
        clearAllBtn: '.clear-all',
        editBtn: '.edit-button',
        editTaskInput: '.task-input'
    }

    return {
        getTaskInput: function () {
            const taskName = document.querySelector(UISelectors.newTaskInput).value;
            return {
                name: taskName,
                date: new Date()
            }
        },
        getSelectors: function () {
            return UISelectors;
        },
        addTaskToListUI: function (task) {
            const taskList = document.querySelector(UISelectors.taskList);
            taskList.innerHTML += ` 
            <li class="task ${task.isChecked ? "is-checked" : ""}" id="task-${task.id}">
                <span class="checkbox"></span>
                <span class="task-name">${task.name}</span>
                <span class="edit-button"><i class="fas fa-pencil-alt edit-icon"></i></span>
            </li>
            `;
        },
        populateTaskList: function (tasks) {
            tasks.forEach(task => this.addTaskToListUI(task));
        },
        checkTaskInUI: function (id) {
            const task = document.querySelector(`#task-${id}`);
            task.classList.add('is-checked');
        },
        hideList: function () {
            document.querySelector(UISelectors.taskList).style.display = 'none';
        },
        uncheckTaskInUI: function (id) {
            const task = document.querySelector(`#task-${id}`);
            task.classList.remove('is-checked');
        },
        showTaskOptions: function (id) {
            console.log(id);

            this.showClearAllButton();
        },
        showClearAllButton: function () {
            const taskList = document.querySelector(UISelectors.taskList);
            if (document.querySelector(UISelectors.clearAllBtn) === null) {
                const clearAllButton = `<button class="button clear-all">
                <span class="delete-button icon"><i class="fas fa-trash delete-icon"></i></i></span>
                <span>Clear All</span>
                </button>`;
                taskList.insertAdjacentHTML('afterend', clearAllButton);

                // setTimeout(() => {
                //     this.hidClearAllButton();
                // }, 3000);
            }
        },
        hidClearAllButton: function () {
            if (document.querySelector(UISelectors.clearAllBtn)) {
                document.querySelector(UISelectors.clearAllBtn).remove();
            }
        },
        resetTaskField: function (task, input) {
            if (input.value !== "") {
                task.removeChild(input);

                const taskName = task.children[1];
                taskName.textContent = input.value;
                taskName.style.display = "block";
                return taskName.textContent;
            } else {
                task.parentElement.removeChild(task);
                return undefined;
            }
        },
        getUserToModifyInput: function (task) {
            let taskName = task.children[1];
            taskName.style.display = "none";
            const input = document.createElement('input');

            input.className = 'task-input';
            input.id = 'modify-input';
            input.value = taskName.textContent;
            task.appendChild(input);
            document.querySelector('#modify-input').focus();


            // input.addEventListener('blur', function () {
            //     // task.style.background = 'white';
            //     UICtrl.resetTaskField(task, taskName, input);
            // });

            // input.addEventListener('keyup', function () {
            //     if (event.keyCode === 13) {
            //         UICtrl.resetTaskField(task, taskName, input);
            //     }
            // });
            // if (input.value !== '') {
            //     return undefined;
            // } else {
            //     return input.value;
            // }
        },

        clearFields: function () {
            const inputField = document.querySelector(UISelectors.newTaskInput);
            inputField.value = '';
        }
    }

})();

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
