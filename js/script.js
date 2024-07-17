document.addEventListener("DOMContentLoaded", function () {
  const tasks = document.querySelector(".tasks");
  const input = document.querySelector(".input-new-task");
  const btn = document.querySelector(".btn-add-task");

  //Create a new line
  function createLi() {
    const li = document.createElement("li");
    li.classList.add(
      "flex",
      "justify-between",
      "items-center",
      "p-2",
      "px-4",
      "text-white",
      "text-lg",
      "bg-gray-500",
      "rounded-lg",
      "mb-2"
    );
    return li;
  }

  //Press enter to add task
  input.addEventListener("keypress", function (e) {
    if (e.keyCode === 13) {
      if (!input.value) return;
      createTask(input.value);
    }
  });

  function createTask(textInput) {
    if (textInput.length > 30) {
      alert("Error: Task length cannot exceed 30 characters.");
      return;
    }
    const li = createLi();
    li.innerText = textInput;
    tasks.appendChild(li);
    clearInput();
    createDeleteButton(li);
    saveTasks();
  }

  function clearInput() {
    input.value = "";
    input.focus();
  }

  function createDeleteButton(li) {
    li.innerText += " ";
    const button = document.createElement("button");
    button.innerText = "Delete";
    button.setAttribute(
      "class",
      "bg-gray-700 text-white rounded-lg p-2 delete"
    );
    li.appendChild(button);
  }

  btn.addEventListener("click", function () {
    if (!input.value) return;
    createTask(input.value);
  });

  document.addEventListener("click", function (e) {
    const el = e.target;
    if (el.classList.contains("delete")) {
      const taskText = el.parentElement.innerText.replace("Delete", "").trim();
      deleteTask(taskText);
      el.parentElement.remove();
      saveTasks();
    }
  });

  function saveTasks() {
    const liTasks = tasks.querySelectorAll("li");
    const taskList = [];

    for (let task of liTasks) {
      let taskText = task.innerText;
      taskText = taskText.replace("Delete", "").trim();
      taskList.push(taskText);
    }

    const tasksJSON = JSON.stringify(taskList);
    localStorage.setItem("tasks", tasksJSON);
  }

  function addSavedTasks() {
    const tasks = localStorage.getItem("tasks");
    if (tasks) {
      const taskList = JSON.parse(tasks);
      for (let task of taskList) {
        createTask(task);
      }
    }
  }

  function deleteTask(taskText) {
    let deletedTasks = JSON.parse(localStorage.getItem("deletedTasks")) || [];
    deletedTasks.push(taskText);
    localStorage.setItem("deletedTasks", JSON.stringify(deletedTasks));
  }

  addSavedTasks();
});
