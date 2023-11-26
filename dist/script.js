const localStorageTasks = JSON.parse(localStorage.getItem("taskList")) || [];

console.log(localStorageTasks)

function addTask() {
    const taskName = document.querySelector("#taskName");
    if (!(taskName.value.length)) {
        alert("Task Name cannot be empty!");
        return;
    }
    const d = new Date;

    localStorageTasks.push({
        taskName: taskName.value,
        date: d.toLocaleDateString(),
        id: d.toISOString()
    })
    localStorage.setItem("taskList", JSON.stringify(localStorageTasks));
    taskName.value = "";
}