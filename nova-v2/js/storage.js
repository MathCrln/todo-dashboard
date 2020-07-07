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
