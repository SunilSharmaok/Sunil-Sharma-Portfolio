
// Google Sign-In (Requires Firebase or OAuth)
function googleSignIn() {
    alert("Google Sign-In functionality needs Firebase or OAuth setup.");
}

document.addEventListener("DOMContentLoaded", () => {
    setMinDate();
    document.getElementById("date").addEventListener("change", validateDateTime);
    loadTasks();
    checkAlarms(); // Start checking alarms
    setInterval(checkAlarms, 60000); // Check every minute
});

// ✅ Restrict past dates
function setMinDate() {
    let today = new Date().toISOString().split("T")[0];
    document.getElementById("date").setAttribute("min", today);
}

// ✅ Restrict past times for today
function validateDateTime() {
    let dateInput = document.getElementById("date").value;
    let timeInput = document.getElementById("time");

    let selectedDate = new Date(dateInput);
    let currentDate = new Date();

    if (selectedDate.toDateString() === currentDate.toDateString()) {
        let currentTime = new Date().toTimeString().slice(0, 5);
        timeInput.setAttribute("min", currentTime);
    } else {
        timeInput.removeAttribute("min");
    }
}

// ✅ Add task with date & time validation
function addTask() {
    let date = document.getElementById("date").value;
    let time = document.getElementById("time").value;
    let task = document.getElementById("task").value;
    let priority = document.getElementById("priority").value;
    let category = document.getElementById("category").value;

    if (date && time && task) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push({ date, time, task, priority, category, done: false, alarmed: false });
        localStorage.setItem("tasks", JSON.stringify(tasks));
        displayTasks();
    } else {
        alert("Please fill in all fields.");
    }
}

// ✅ Display tasks with priority & completion status
function displayTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let completedTasks = tasks.filter(task => task.done).length;

    tasks.forEach((taskObj, index) => {
        let li = document.createElement("li");
        li.className = taskObj.done ? "done" : "";
        li.innerHTML = `
            <span class="${getPriorityClass(taskObj.priority)}">
                📅 ${taskObj.date} 🕒 ${taskObj.time} - ${taskObj.task} (${taskObj.category})
            </span>
            <button onclick="toggleDone(${index})">✔</button>
            <button onclick="editTask(${index})">✏</button>
            <button onclick="deleteTask(${index})">❌</button>
        `;
        taskList.appendChild(li);
    });

    updateProgressBar(completedTasks, tasks.length);
}

// ✅ Get priority styling
function getPriorityClass(priority) {
    return priority === "High" ? "task-high" : priority === "Medium" ? "task-medium" : "task-low";
}

// ✅ Mark task as done
function toggleDone(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks[index].done = !tasks[index].done;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

// ✅ Edit a task
function editTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let newTask = prompt("Edit your task:", tasks[index].task);
    if (newTask) {
        tasks[index].task = newTask;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        displayTasks();
    }
}

// ✅ Delete a task
function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

// ✅ Clear all tasks
function clearAllTasks() {
    if (confirm("Are you sure you want to delete all tasks?")) {
        localStorage.removeItem("tasks");
        displayTasks();
    }
}

// ✅ Update progress bar
function updateProgressBar(completed, total) {
    let progress = total > 0 ? (completed / total) * 100 : 0;
    document.getElementById("progress-bar").style.width = progress + "%";
}

// ✅ Load tasks on page load
function loadTasks() {
    displayTasks();
}

// ✅ Alarm feature - checks tasks every minute
function checkAlarms() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let now = new Date();
    let currentDate = now.toISOString().split("T")[0];
    let currentTime = now.toTimeString().slice(0, 5);

    tasks.forEach((task, index) => {
        if (!task.alarmed && task.date === currentDate && task.time === currentTime) {
            playAlarm(task.task);
            tasks[index].alarmed = true; // Mark as alarmed to prevent multiple alerts
        }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ✅ Play alarm sound + notification alert
function playAlarm(taskName) {
    let alarmSound = new Audio("https://www.soundjay.com/button/beep-07.wav"); // Replace with custom sound
    alarmSound.play();
    
    alert(`⏰ Time for: ${taskName}`);
}









