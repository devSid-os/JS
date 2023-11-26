let localStorageTasks = JSON.parse(localStorage.getItem("taskList")) || [];
const overlay = document.querySelector("#overlay");
const loader = document.querySelector("#loader");
const taskListDiv = document.querySelector("#taskListDiv");

console.log(localStorageTasks)

function showEmptyMessage() {
    const heading3 = document.createElement("h3");
    heading3.textContent = "No tasks to show"
    heading3.id = "emptyMessage";
    heading3.classList.add("dark:text-white", "text-xl")
    taskListDiv.appendChild(heading3)
}

function createTaskDiv(task) {
    // create parent task div
    const taskDiv = document.createElement("div");
    // taskDiv.classList.add("w-full")
}

function addTaskToLocalStorage(taskName) {
    const d = new Date;
    // add task in object format to array
    localStorageTasks.push({
        taskName: taskName.value,
        date: d.toLocaleDateString(),
        id: d.toISOString()
    });
    // save array to localstorage
    localStorage.setItem("taskList", JSON.stringify(localStorageTasks));
    // Reset input value
    taskName.value = "";
    // hide loader
    overlay.classList.add("hidden");
    loader.classList.add("hidden");
    const emptyMessage = document.querySelector("#emptyMessage");
    if (emptyMessage) emptyMessage.classList.add("hidden");
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


if (!localStorageTasks.length) {
    showEmptyMessage();
}
else {
    localStorageTasks.map((task,index) => {
        console.log(index,task)
    })
}