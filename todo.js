const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load tasks from local storage on start
window.onload = loadTasks;

addBtn.addEventListener("click", addTask);
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const taskText = input.value.trim();
  if (taskText === "") return alert("Please enter a task!");

  const li = document.createElement("li");
  li.innerHTML = `
    <span>${taskText}</span>
    <button class="delete">X</button>
  `;

  li.addEventListener("click", function (e) {
    if (e.target.tagName === "SPAN") {
      li.classList.toggle("completed");
      saveTasks();
    }
  });

  li.querySelector(".delete").addEventListener("click", function () {
    li.remove();
    saveTasks();
  });

  taskList.appendChild(li);
  input.value = "";
  saveTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", taskList.innerHTML);
}

function loadTasks() {
  const data = localStorage.getItem("tasks");
  if (data) taskList.innerHTML = data;

  document.querySelectorAll(".delete").forEach((btn) => {
    btn.addEventListener("click", function () {
      btn.parentElement.remove();
      saveTasks();
    });
  });

  document.querySelectorAll("li span").forEach((span) => {
    span.addEventListener("click", function () {
      span.parentElement.classList.toggle("completed");
      saveTasks();
    });
  });
}
