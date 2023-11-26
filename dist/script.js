let localStorageTasks = JSON.parse(localStorage.getItem("taskList")) || [];
let pendingTasks = [];
let completedTasks = [];
const overlay = document.querySelector("#overlay");
const loader = document.querySelector("#loader");
const taskListDiv = document.querySelector("#taskListDiv");
let selectedFilter = "pending";

console.log(localStorageTasks)

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
    statusButton.addEventListener("click", (e) => markAsCompleteTask(e));
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

function markAsCompleteTask(e) {
    const taskDivId = e.target.parentElement.parentElement.id;
    localStorageTasks.map(task => task.id === taskDivId ? task.status = "completed" : task);
    localStorage.setItem("taskList", JSON.stringify(localStorageTasks));
    pendingTasks = pendingTasks.filter(task => task.id !== taskDivId);
    document.getElementById(taskDivId).remove();
    console.log(taskListDiv.children);
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