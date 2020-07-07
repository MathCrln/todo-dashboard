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
        editTaskInput: '.task-input',
        darkModeButton: '#light-switch'
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
