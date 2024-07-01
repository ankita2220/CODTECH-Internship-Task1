// const inputBox = document.getElementById("input-box");
// const listContainer = document.getElementById("list-container");

// function addTask() {
//     if (inputBox.value === "") {
//         alert("You must write something!");
//     } else {
//         let li = document.createElement("li");
//         li.innerHTML = inputBox.value;
//         listContainer.appendChild(li);
//         let span = document.createElement("span");
//         span.innerHTML = "\u00d7";
//         li.appendChild(span);
//     }
//     inputBox.value = "";
//     saveData();
// }

// listContainer.addEventListener(
//     "click",
//     function (e) {
//         if (e.target.tagName === "LI") {
//             e.target.classList.toggle("checked");
//             saveData();
//         } else if (e.target.tagName === "SPAN") {
//             e.target.parentElement.remove();
//             saveData();
//         }
//     },
//     false
// );

// function saveData() {
//     localStorage.setItem("data", listContainer.innerHTML);
// }

// function showTask() {
//     listContainer.innerHTML = localStorage.getItem("data");
// }

// showTask();


const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Function to generate a unique ID
function generateID() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

// Function to add a new task with ID, due date, and priority
function addTask() {
    if (inputBox.value === "") {
        alert("You must write something!");
    } else {
        let taskId = generateID();
        let dueDate = document.getElementById("due-date").value;
        let li = document.createElement("li");
        li.id = taskId; // Assigning ID to task
        li.draggable = true; // Enable dragging
        li.innerHTML = `${inputBox.value} <span class="due-date">Due: ${dueDate}</span>`;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    document.getElementById("due-date").value = ""; // Clear due date input
    saveData();
    updateTaskCount();
}

// Function to update total task count
function updateTaskCount() {
    const totalTasks = document.querySelectorAll('#list-container li').length;
    document.getElementById('total-tasks').textContent = totalTasks;
}

// Function to toggle task completion
listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
        updateTaskCount();
    }
});

// Function to edit task text using ID
listContainer.addEventListener("dblclick", function(e) {
    if (e.target.tagName === "LI") {
        let newText = prompt("Edit task:", e.target.textContent);
        if (newText !== null && newText.trim() !== "") {
            e.target.textContent = newText;
            saveData();
        }
    }
});

// Function to clear all completed tasks
function clearCompletedTasks() {
    const completedTasks = document.querySelectorAll("#list-container .checked");
    completedTasks.forEach(task => {
        task.remove();
    });
    saveData();
    updateTaskCount();
}

// Function to search/filter tasks
function searchTasks() {
    const searchInput = document.getElementById("search-box").value.toLowerCase();
    const tasks = document.querySelectorAll("#list-container li");
    tasks.forEach(task => {
        const taskText = task.textContent.toLowerCase();
        if (taskText.includes(searchInput)) {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }
    });
}

// Function to sort tasks alphabetically
function sortTasks() {
    const tasks = Array.from(document.querySelectorAll("#list-container li"));
    tasks.sort((a, b) => {
        return a.textContent.localeCompare(b.textContent);
    });
    tasks.forEach(task => listContainer.appendChild(task));
    saveData();
}

// Function to save tasks to local storage
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

// Function to load tasks from local storage on page load
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

// Load tasks from local storage on page load
document.addEventListener("DOMContentLoaded", function() {
    showTask();
    updateTaskCount();
});

// Drag and drop functionality
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    const taskId = ev.dataTransfer.getData("text");
    const task = document.getElementById(taskId);
    ev.target.appendChild(task);
    saveData();
}

