// ===== LOAD TASKS FROM LOCAL STORAGE ON PAGE LOAD =====
document.addEventListener("DOMContentLoaded", loadTasks);

// Allow pressing Enter to add a task
document.getElementById("taskInput").addEventListener("keydown", function (e) {
  if (e.key === "Enter") addTask();
});

// ===== ADD TASK =====
function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();

  if (text === "") return; // Don't add empty tasks

  const tasks = getTasks();
  tasks.push({ text: text, done: false });
  saveTasks(tasks);

  input.value = "";
  renderTasks();
}

// ===== TOGGLE DONE =====
function toggleTask(index) {
  const tasks = getTasks();
  tasks[index].done = !tasks[index].done;
  saveTasks(tasks);
  renderTasks();
}

// ===== DELETE TASK =====
function deleteTask(index) {
  const tasks = getTasks();
  tasks.splice(index, 1);
  saveTasks(tasks);
  renderTasks();
}

// ===== CLEAR COMPLETED =====
function clearCompleted() {
  const tasks = getTasks().filter(t => !t.done);
  saveTasks(tasks);
  renderTasks();
}

// ===== RENDER TASKS TO PAGE =====
function renderTasks() {
  const list = document.getElementById("taskList");
  const tasks = getTasks();

  list.innerHTML = ""; // Clear existing list

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.done ? "done" : "";

    // Checkbox circle
    const checkbox = document.createElement("span");
    checkbox.className = "checkbox";
    checkbox.textContent = task.done ? "✓" : "";
    checkbox.onclick = () => toggleTask(index);

    // Task text
    const span = document.createElement("span");
    span.textContent = task.text;
    span.onclick = () => toggleTask(index);

    // Delete button
    const del = document.createElement("button");
    del.className = "delete-btn";
    del.textContent = "✕";
    del.onclick = (e) => {
      e.stopPropagation();
      deleteTask(index);
    };

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(del);
    list.appendChild(li);
  });

  updateCount();
}

// ===== UPDATE TASK COUNT =====
function updateCount() {
  const tasks = getTasks();
  const remaining = tasks.filter(t => !t.done).length;
  document.getElementById("taskCount").textContent =
    `${remaining} task${remaining !== 1 ? "s" : ""} remaining`;
}

// ===== LOCAL STORAGE HELPERS =====
function getTasks() {
  return JSON.parse(localStorage.getItem("tasks") || "[]");
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ===== INITIAL RENDER =====
function loadTasks() {
  renderTasks();
}
