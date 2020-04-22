let lightSwitch = document.getElementById("light-switch");
let contextualMenuModale = document.getElementById("contextual-menu-modale");
let contextualMenuButton = document.getElementById("contextual-menu-button");
let newTaskButton = document.getElementById("newTask");
let listOfTasks = document.getElementById("list-of-tasks");
let body = document.getElementsByTagName("body")[0];
let section = document.getElementsByTagName("section")[1];
let taskCheckBox = document.getElementsByClassName("checkbox");
let task = document.getElementsByClassName("task");
let nameOfTask = document.getElementsByClassName("taskName");
let placeOfTask = document.getElementsByClassName("taskPlace");
let dateOfTask = document.getElementsByClassName("taskdate");
const userInput = document.getElementById("userInput");

body.onload = function addEventListeners(){
    // Swtich to dark mode, based on Keypress or user click
    lightSwitch.addEventListener("click", 
    function switchColorMode(){
    body.classList.toggle("darkModeOn");
})
    window.addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;
        console.log(key);
        if (key === 100) { // 13 is enter
            body.classList.toggle("darkModeOn");
        }
    });

    // Validate (or unvalidate) tasks
    for (i = 0; i < taskCheckBox.length ; i++){
        taskCheckBox[i].addEventListener("click", function(){
            checkTask(this);
        });
    }
    if(newTaskButton != null){
    newTaskButton.addEventListener("click", addNewTask)}

    if(contextualMenuButton != null){
        contextualMenuButton.addEventListener("click", openContextualMenu)}

}

let taskDb = [
    {
        taskId: "1",
        taskName: "Call Beyoncé",
        taskLocation: false,
        taskDeadline: false,
        taskStatus: true
    },
    {
        taskId: "2",
        taskName: "Do something new",
        taskLocation: "Paris",
        taskDeadline: false,
        taskStatus: false
    },
    {
        taskId: "3",
        taskName: 'Finish Project "Nova"',
        taskLocation: "Home",
        taskDeadline: true,
        taskStatus: false
    },
    {
        taskId: "4",
        taskName: "A fourth, just for the fun",
        taskLocation: "Somewhere",
        taskDeadline: true,
        taskStatus: false
    }
];


function checkTask(taskClicked){
    taskClicked.parentElement.classList.toggle("isChecked");
}


function addNewTask(){
   let item = listOfTasks.lastChild;
    let clone = item.cloneNode(true);
    listOfTasks.appendChild(clone);
    nameOfTask[3].innerHTML = '<input type="text" placeholder="New task..." id="userInput" class="task-input">';
    // nameOfTask[3].appendChild(document.createTextNode(userInput.value));
    console.log("button is clicked");
    // if(userInput != ""){
    // nameOfTask[3].innerHTML = userInput;
    // }
}

function addItemAfterEnter(event) {
    if (userInput.length > 0 && event.keyCode === 13) {
        addItems();
    }
}

// console.log("New task button is clicked!");

//     let newArticle = document.createElement("article");
//     let newCheckbox = document.createElement("span");
//     let newAddLocationButton = document.createElement("span");
//     let newAddDeadlineButton = document.createElement("span");
//     let newAdditionalInformations = document.createElement("div");
//     let svg = document.createElement("i");
   
//     // Set attributes
//     newArticle.setAttribute('class', "task")
//     newCheckbox.setAttribute('class', "checkbox")
//     newAddLocationButton.setAttribute('class', "addLocationButton")
//     newAddDeadlineButton.setAttribute('class', "addDeadlineButton")
//     newAddDeadlineButton.setAttribute('class', "additional-informations")
//     svg.setAttribute('class', "fas fa-map-marker-alt")
//     newArticle.setAttribute('id', "task4")
    
    
//     // Append Childs
//     newArticle.appendChild(newCheckbox);
//     newArticle.appendChild(document.createTextNode("lalala"));

//     newArticle.appendChild(newAddLocationButton);
//     newArticle.appendChild(document.createTextNode("lalala"));

//     newArticle.appendChild(newAddDeadlineButton);
//     newAdditionalInformations.appendChild(svg);
//     newArticle.appendChild(newAdditionalInformations);
//     section.appendChild(newArticle); 
// }




// nameOfTask[2].innerHTML = taskDb[2].taskName;
// if(taskDb[2].taskStatus === true){
//     taskCheckBox[2].parentElement.classList.toggle("isChecked");
// }
// if(taskCheckBox[2].parentElement.getAttribute("class").includes("isChecked") == true){
//     taskDb[2].taskStatus = true;
//     console.log(taskDb[2].taskStatus);

// }
// else{
//     taskDb[2].taskStatus = false;
//     console.log(taskDb[2].taskStatus);
// }

// var newTask = document.createElement("article"); 

// function buildTask(whichTask){

// }

function openContextualMenu(event){
    contextualMenuModale.classList.toggle("hidden-by-default");       
}
