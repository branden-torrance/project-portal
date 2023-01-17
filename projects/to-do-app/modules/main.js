// JSON.parse will read through todos that are encoded as a JSON string
let todosArray = JSON.parse(localStorage.getItem("todos")) || [];

// Create event listener for page load
window.addEventListener("load", () => {
  const addTodoForm = document.querySelector("#add-todo-form");
  getActive();
  document.querySelector(".all-button").classList.add("active");

  // Listen for submit click
  addTodoForm.addEventListener("submit", (e) => {
    // Prevent page from reloading
    e.preventDefault();

    // Get data from the form and save as an Object
    const todo = {
      id: new Date().getTime(),
      content: e.target.elements.addTodo.value,
      completed: false,
    };

    // Add todo object into todos array
    todosArray.push(todo);

    // Stringify our todosArray and save array object as local storage item
    // We need to stringify because localStorage only allows primitive values
    localStorage.setItem("todos", JSON.stringify(todosArray));

    // Reset to clear form fields, allowing to enter another todo item
    e.target.reset();

    // Call displayTools() to show new item added when submit button is pressed
    getActive();
    displayTodos();
  });

  displayTodos();
});

function displayTodos() {
  const todoList = document.querySelector(".todo-list");

  todoList.innerHTML = "";

  todosArray.forEach((todo) => {
    // Create elements
    const todoItem = document.createElement("div");
    const label = document.createElement("label");
    const input = document.createElement("input");
    const content = document.createElement("div");
    const action = document.createElement("div");
    const deleteButton = document.createElement("button");

    // Add attributes to input element
    input.type = "checkbox";
    input.checked = todo.completed;

    // Add classes to elements
    todoItem.classList.add("todo-item");
    content.classList.add("todo-content");
    action.classList.add("action");
    deleteButton.classList.add("delete-button");

    // Add text to elements
    content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
    deleteButton.innerHTML = "x";

    // Add child elements to parent elements
    label.appendChild(input);
    action.appendChild(deleteButton);
    todoItem.appendChild(label);
    todoItem.appendChild(content);
    todoItem.appendChild(action);

    todoList.appendChild(todoItem);

    // Add class of "completed" if checkbox is checked
    if (todo.completed) {
      todoItem.classList.add("completed");
    }

    input.addEventListener("click", (e) => {
      todo.completed = e.target.checked;
      localStorage.setItem("todos", JSON.stringify(todosArray));
      if (todo.completed) {
        todoItem.classList.add("completed");
        getActive();
      } else {
        todoItem.classList.remove("completed");
        getActive();
      }
      displayTodos();
    });

    deleteButton.addEventListener("click", () => {
      todosArray = todosArray.filter((array) => array != todo);
      localStorage.setItem("todos", JSON.stringify(todosArray));
      getActive();
      displayTodos();
    });
  });
}

const allButton = document.querySelector(".all-button");
allButton.addEventListener("click", () => {
  activeButton.classList.remove("active");
  allButton.classList.add("active");
  completedButton.classList.remove("active");

  todosArray = JSON.parse(localStorage.getItem("todos"));

  const showSection = document.querySelector(".create-todo");
  showSection.style.display = "";

  getActive();
  displayTodos();
});

const activeButton = document.querySelector(".active-button");
activeButton.addEventListener("click", () => {
  activeButton.classList.add("active");
  allButton.classList.remove("active");
  completedButton.classList.remove("active");

  todosArray = JSON.parse(localStorage.getItem("todos"));
  todosArray = todosArray.filter((array) => array.completed === false);

  const hideSection = document.querySelector(".create-todo");
  hideSection.style.display = "none";

  getActive();
  displayTodos();
  hideElements();
});

const completedButton = document.querySelector(".completed-button");
completedButton.addEventListener("click", () => {
  activeButton.classList.remove("active");
  allButton.classList.remove("active");
  completedButton.classList.add("active");

  todosArray = JSON.parse(localStorage.getItem("todos"));
  todosArray = todosArray.filter((array) => array.completed === true);

  getCompleted();
  displayTodos();
  hideElements();
});

function getCompleted() {
  const completedArray = [];
  const tasksLeft = document.querySelector(".tasks-left");
  todosArray.forEach((todo) => {
    if (todo.completed === true) {
      completedArray.push(todo.completed);
    }
  });
  tasksLeft.innerHTML = `${completedArray.length} - tasks completed`;
}

function getActive() {
  const activeArray = [];
  const tasksLeft = document.querySelector(".tasks-left");
  todosArray.forEach((todo) => {
    if (todo.completed === false) {
      activeArray.push(todo.completed);
    }
  });
  tasksLeft.innerHTML = `${activeArray.length} - tasks left`;
}

function hideElements() {
  const hideDelete = document.querySelectorAll(".action");
  const hideSection = document.querySelector(".create-todo");
  const hideCheckbox = document.querySelectorAll("label");
  hideSection.style.display = "none";
  hideDelete.forEach((item) => {
    item.style.display = "none";
  });
  hideCheckbox.forEach((item) => {
    item.style.display = "none";
  });
}
