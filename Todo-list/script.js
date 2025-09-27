const input = document.getElementById("todo-input");
const addTaskButton = document.getElementById("add-task-btn");
const todoList = document.getElementById("todo-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks.forEach((task) => displayTasks(task));

addTaskButton.addEventListener("click", () => {
  const task = input.value.trim();
  if (task === "") return;
  const data = {
    //the date now method will return a new (and unique) string always as time does not stop.
    id: Date.now(),
    text: task,
    completed: false,
  };
  tasks.push(data);
  //since all the previous data of local storage is overridden completely when we update it,
  //we can safely save the tasks to local storage without worrying about the data being copied multiple times
  //as the previous data gets wiped out and then the new data gets updated.
  saveToLocalStorage();
  input.value = ""; //clear the input box
  displayTasks(data);
});

function saveToLocalStorage() {
  //since the local storage only accepts the key value pairs (both of them) in the form of strings,
  //we have to convert the array to JSON format
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks(task) {
  const li = document.createElement("li");
  li.setAttribute("data-id", task.id);
  li.innerHTML = `
  <span>${task.text}</span>
  <button>Delete</button>
  `;
  li.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") return;
    task.completed = !task.completed;
    li.classList.toggle("completed");
    //since some properties have been modified so now we need to again save the
    //updated data in the local storage.
    saveToLocalStorage();
  });
  if (task.completed) li.classList.add("completed");

  li.querySelector("button").addEventListener("click", (event) => {
    //this is to stop event bubbling.
    event.stopPropagation();
    tasks = tasks.filter((t) => t.id !== task.id);
    saveToLocalStorage();
    li.remove();
  });
  todoList.appendChild(li);
}
