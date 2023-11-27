let localStorageTasks = JSON.parse(localStorage.getItem("taskList")) || [];
let pendingTasks = [];
let completedTasks = [];
const overlay = document.querySelector("#overlay");
const loader = document.querySelector("#loader");
const taskListDiv = document.querySelector("#taskListDiv");
let selectedFilter = "pending";
let selectedMode = "dark";

console.log(localStorageTasks)  

function switchModes() {
    if (selectedMode==="dark") {
        document.querySelector("#modePath").setAttribute("d", "M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278M4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z");
        selectedMode="light";
        document.getElementsByTagName("html")[0].setAttribute("class", "");
        document.querySelector("#modeDiv").style="box-shadow: -2px -2px 8px #272829";
        document.querySelector("#modeDiv").setAttribute("title", "Switch to dark mode");
    }
    else {
        document.querySelector("#modePath").setAttribute("d", "M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z");
        selectedMode="dark";
        document.getElementsByTagName("html")[0].setAttribute("class", "dark");
        document.querySelector("#modeDiv").style="box-shadow: -1px -1px 8px #fff";
        document.querySelector("#modeDiv").setAttribute("title", "Switch to light mode");
    }
}

function filterTasks() {
    pendingTasks = localStorageTasks.filter(task => task.status === "pending" && task);
    completedTasks = localStorageTasks.filter(task => task.status !== "pending" && task);
}

filterTasks();

function showEmptyMessage() {
    const heading3 = document.createElement("h3");
    heading3.textContent = "No tasks to show";
    heading3.id = "emptyMessage";
    heading3.classList.add("dark:text-white", "text-xl");
    taskListDiv.appendChild(heading3);
}

function createTaskDiv(task) {
    // create parent task div
    const taskDiv = document.createElement("div");
    taskDiv.id = task.id;
    taskDiv.classList.add("w-full", "flex", "justify-between", "border", `${task.status === "pending" ? "border-[#fa992f]" : "border-[#96EFFF]"}`, "rounded-lg");
    // create task name
    const taskName = document.createElement("p");
    taskName.setAttribute("title", `Created On: ${task.date}\nStatus: ${task.status.toUpperCase()}`);
    taskName.classList.add("flex-1", "dark:text-white", "md:text-lg", "p-3", "md:p-4");
    taskName.textContent = task.taskName;
    // create button div
    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("flex", "justify-evenly", "items-center", "gap-4", "px-4");
    // Edit Button
    const editButton = document.createElement("button");
    editButton.setAttribute("title", "Edit Task");
    editButton.classList.add("text-[#0d9a77]", "font-[500]", "text-md", "md:text-lg", "focus:outline-none", "fa", "fa-edit");
    // Complete Button
    const statusButton = document.createElement("button");
    statusButton.addEventListener("click", (e) => markTaskStatus(e));
    statusButton.setAttribute("title", `${task.status === 'pending' ? "Mark as complete" : "Mark as uncomplete"}`);
    statusButton.classList.add("text-[#fa9924]", "font-[500]", "text-md", "md:text-lg", "focus:outline-none", "fa", `fa-${task.status === "pending" ? "check" : "exclamation-circle"}`);
    // Delete Button
    const deleteButton = document.createElement("button");
    deleteButton.addEventListener("click", (e) => deleteTask(e));
    deleteButton.setAttribute("title", "Delete Task");
    deleteButton.classList.add("text-[#d71437]", "font-[500]", "text-md", "md:text-lg", "focus:outline-none", "fa", "fa-trash");

    buttonDiv.appendChild(editButton);
    buttonDiv.appendChild(statusButton);
    buttonDiv.appendChild(deleteButton);

    // append taskName to taskDiv
    taskDiv.appendChild(taskName);
    // append buttonDiv to taskDiv
    taskDiv.append(buttonDiv);

    taskListDiv.appendChild(taskDiv);
}

function markTaskStatus(e) {
    const taskDivId = e.target.parentElement.parentElement.id;
    if (e.target.classList.contains("fa-check")) {
        localStorageTasks.map(task => task.id === taskDivId ? task.status = "completed" : task);
        pendingTasks = pendingTasks.filter(task => task.id !== taskDivId);
    }
    else {
        localStorageTasks.map(task => task.id === taskDivId ? task.status = "pending" : task);
        completedTasks = completedTasks.filter(task => task.id !== taskDivId);
    }
    localStorage.setItem("taskList", JSON.stringify(localStorageTasks));
    document.getElementById(taskDivId).remove();
    if (!taskListDiv.children.length) showEmptyMessage();
}

function deleteTask(e) {
    const taskDivId = e.target.parentElement.parentElement.id;
    localStorageTasks = localStorageTasks.filter(task => task.id !== taskDivId);
    document.getElementById(taskDivId).remove();
    localStorage.setItem("taskList", JSON.stringify(localStorageTasks));
    if (!taskListDiv.children.length) showEmptyMessage();
}

function addTaskToLocalStorage(taskName) {
    const d = new Date;
    const object = {
        taskName: taskName.value,
        date: d.toLocaleDateString(),
        id: d.toISOString(),
        status: "pending"
    };
    // add task in object format to array
    localStorageTasks.push(object);
    // save array to localstorage
    localStorage.setItem("taskList", JSON.stringify(localStorageTasks));
    // Reset input value
    taskName.value = "";
    // hide loader
    overlay.classList.add("hidden");
    loader.classList.add("hidden");
    // Hide empty message on adding task
    selectedFilter === "pending" && createTaskDiv(object);
    if (taskListDiv.children.length) document.getElementById("emptyMessage").remove();
}

function addTask() {
    const taskName = document.querySelector("#taskName");

    // If task name is empty do something
    if (!(taskName.value.length)) {
        alert("Task Name cannot be empty!");
        return;
    }

    // Display Loader
    overlay.classList.remove("hidden");
    loader.classList.remove("hidden");
    // call addTaskToLocalStorage after 1 sec
    setTimeout(() => addTaskToLocalStorage(taskName), 1000);
}

function filterTaskListDiv(e) {
    // console.log("hello")
    filterTasks();
    while (taskListDiv.firstChild) taskListDiv.removeChild(taskListDiv.firstChild);
    if (e.value === "pending") {
        selectedFilter = "pending";
        pendingTasks.map(task => createTaskDiv(task));
    }
    else {
        selectedFilter = "completed";
        completedTasks.map(task => createTaskDiv(task));
    }

    if (!taskListDiv.children.length) showEmptyMessage();

}

if (!pendingTasks.length) {
    showEmptyMessage();
}
else {
    pendingTasks.map((task, index) => createTaskDiv(task));
}