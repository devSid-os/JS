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
    taskDiv.classList.add("w-full", "flex", "justify-between", "border", "border-[#fa992f]", "rounded-lg");
    // create task name
    const taskName = document.createElement("p");
    taskName.classList.add("flex-1", "dark:text-white", "md:text-lg", "p-3", "md:p-4");
    taskName.textContent = task.taskName;
    // create button div
    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("flex", "justify-evenly", "items-center", "gap-4", "px-4");
    // Edit Button
    const editButton = document.createElement("button");
    editButton.classList.add("text-[#0d9a77]", "font-[500]", "text-md", "md:text-lg", "focus:outline-none", "fa", "fa-edit");
    // Complete Button
    const completeButton = document.createElement("button");
    completeButton.classList.add("text-[#fa9924]", "font-[500]", "text-md", "md:text-lg", "focus:outline-none", "fa", "fa-check");
    // Delete Button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("text-[#d71437]", "font-[500]", "text-md", "md:text-lg", "focus:outline-none", "fa", "fa-trash");

    buttonDiv.appendChild(editButton);
    buttonDiv.appendChild(completeButton);
    buttonDiv.appendChild(deleteButton);


    // append taskName to taskDiv
    taskDiv.appendChild(taskName);
    // append buttonDiv to taskDiv
    taskDiv.append(buttonDiv);

    taskListDiv.appendChild(taskDiv);

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
    const emptyMessage = document.querySelector("#emptyMessage");
    if (emptyMessage) emptyMessage.classList.add("hidden");
    createTaskDiv(object);
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
    localStorageTasks.map((task, index) => {
        createTaskDiv(task);
    })
}