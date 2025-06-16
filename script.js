document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskList = document.getElementById("taskList");

    if (taskInput.value.trim() === "") return ;

    let li = document.createElement("li");
    li.innerHTML = `
        <span onclick="toggleComplete(this)">${taskInput.value}</span>
        <button class="edit" onclick="editTask(this)">✏️</button>
        <button onclick="removeTask(this)">❌</button>
    `;
    taskList.appendChild(li);

    saveTasks();
    taskInput.value = "";
}

function removeTask(element) {
    element.parentElement.remove();
    saveTasks();
}

function toggleComplete(element) {
    element.parentElement.classList.toggle("completed");
    saveTasks();
}

function editTask(element) {
    let taskSpan = element.parentElement.querySelector("span");
    let newTask = prompt("Edit task:", taskSpan.innerText);
    if (newTask) {
        taskSpan.innerText = newTask;
        saveTasks();
    }
}

function clearTasks() {
    document.getElementById("taskList").innerHTML = "";
    localStorage.removeItem("tasks");
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(task => {
        let text = task.querySelector("span").innerText;
        let completed = task.classList.contains("completed");
        tasks.push({ text, completed });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let taskList = document.getElementById("taskList");
    let savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    savedTasks.forEach(({ text, completed }) => {
        let li = document.createElement("li");
        li.innerHTML = `
            <span onclick="toggleComplete(this)">${text}</span>
            <button class="edit" onclick="editTask(this)">✏️</button>
            <button onclick="removeTask(this)">❌</button>
        `;
        if (completed) li.classList.add("completed");
        taskList.appendChild(li);
    });
}
