let localStorageTasks = JSON.parse(localStorage.getItem("taskList")) || [];
const overlay = document.querySelector("#overlay");
const loader = document.querySelector("#loader");

console.log(localStorageTasks)

function addTaskToLocalStorage(taskName) {
    const d = new Date;
    localStorageTasks.push({
        taskName: taskName.value,
        date: d.toLocaleDateString(),
        id: d.toISOString()
    })
    localStorage.setItem("taskList", JSON.stringify(localStorageTasks));
    taskName.value = "";
    overlay.classList.add("hidden");
    loader.classList.add("hidden");
}

function addTask() {
    const taskName = document.querySelector("#taskName");
    if (!(taskName.value.length)) {
        alert("Task Name cannot be empty!");
        return;
    }

    overlay.classList.remove("hidden");
    loader.classList.remove("hidden");
    setTimeout(() => addTaskToLocalStorage(taskName), 1000)
}