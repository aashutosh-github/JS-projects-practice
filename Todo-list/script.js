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
  //since all the previous data of local storage is overridden completely when we update it,
  //we can safely save the tasks to local storage without worrying about the data being copied multiple times
  //as the previous data gets wiped out and then the new data gets updated.
  saveToLocalStorage(tasks);
  input.value = ""; //clear the input box
});

function saveToLocalStorage(array) {
  //since the local storage only accepts the key value pairs (both of them) in the form of strings,
  //we have to convert the array to JSON format
  localStorage.setItem("tasks", JSON.stringify(array));
}
