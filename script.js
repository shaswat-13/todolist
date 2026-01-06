// const variableName = document.getElementById('your-html-id');
const inputArea = document.getElementById("input-area");
const addButton = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const deleteCompleted = document.getElementById("delete-completed-btn");
const deleteAll = document.getElementById("delete-all-btn");
const markAll = document.getElementById("complete-all-btn");

// tasks array to store json of each tasks
// { id: 12345, text: "My Task", completed: false }
let tasks = JSON.parse(localStorage.getItem("saved_tasks")) || [];

// create a new task when addButton is pressed or enter is pressed
function handleAddTask() {
  const taskText = inputArea.value;
  if (taskText === "") {
    return;
  }

  const newTask = {
    id: Date.now(),
    text: taskText,
    completed: false,
  };
  tasks.push(newTask);

  inputArea.value = "";
  renderTasks();
  console.log(tasks);
}

addButton.addEventListener("click", handleAddTask);

inputArea.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleAddTask();
  }
});

// renderTasks
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");

    if (task.completed) {
      li.classList.add("completed");
    }

    // Add a data-id attribute so we can identify this task later
    li.setAttribute("data-id", task.id);

    li.innerHTML = `
    <input type="checkbox" class="toggle-check" ${
      task.completed ? "checked" : ""
    }>
    <span>${task.text}</span>
    <button class="delete-btn">Delete</button>
`;

    taskList.appendChild(li);
  });
  localStorage.setItem("saved_tasks", JSON.stringify(tasks));
}

// taskList update
taskList.addEventListener("click", (e) => {
  const taskId = e.target.closest("li").getAttribute("data-id");

  // when user presses checkbox
  if (e.target.classList.contains("toggle-check")) {
    toggleTask(taskId);
  }

  // when user presses delete button
  if (e.target.classList.contains("delete-btn")) {
    deleteTask(taskId);
  }
});

function toggleTask(id) {
  for (let i = 0; i < tasks.length; i++) {
    if (id == tasks[i].id) {
      tasks[i].completed = !tasks[i].completed;
    }
  }
  renderTasks();
}

function deleteTask(id) {
  const numericId = Number(id);
  tasks = tasks.filter((task) => task.id !== numericId);
  renderTasks();
}

// functionalities of the special buttons
deleteAll.addEventListener("click", () => {
  tasks = [];
  renderTasks();
});

deleteCompleted.addEventListener("click", () => {
  tasks = tasks.filter((task) => task.completed === false);
  renderTasks();
});

markAll.addEventListener("click", () => {
  tasks.forEach((task) => (task.completed = true));
  renderTasks();
});

// call renderTasks for rendering the web-page when this script is run
renderTasks();
