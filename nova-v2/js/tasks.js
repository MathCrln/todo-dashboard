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
