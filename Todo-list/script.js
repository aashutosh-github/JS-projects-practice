const input = document.getElementById("todo-input");
const addTaskButton = document.getElementById("add-task-btn");
const todoList = document.getElementById("todo-list");

let tasks = [];

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
  input.value = ""; //clear the input box
});
