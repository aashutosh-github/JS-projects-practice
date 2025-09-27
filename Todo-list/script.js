document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("todo-input");
  const addTaskButton = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

  //doing all this once the DOM gets loaded so that we can successfully load the items from the
  //local storage to this array
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
    //new tasks are added to local storage but only get displayed once the DOM gets reloaded so we are
    //reloading the DOM after clicking on this button so that the list items show up.
    window.location.reload();
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
    // if (task.completed) li.classList.toggle("completed");
    todoList.appendChild(li);
  }
});
