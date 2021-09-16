// selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

// Event Listener
todoButton.addEventListener('click', addTodo); // Add a Task


// Load todos
getTodos().then(todos => {
    todos.forEach((todo => appendTodoItem(todo._id, todo.description, todo.done)));
});


// Functions
function addTodo(event) {
    event.preventDefault();

    createTodo(todoInput.value)
      .then(todo => appendTodoItem(todo._id, todo.description))

    todoInput.value = "";
}

function appendTodoItem(id, description, done) {
    // Todo Task in a DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    todoDiv.setAttribute('data-id', id)

    if (done) {
        todoDiv.classList.add('completed');
    }

    // Completed Task Button to mark your Task
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
    completedButton.classList.add('complete-btn');
    completedButton.addEventListener('click', checkTodoItem)
    todoDiv.appendChild(completedButton);

    // Create new Li for a Task
    const newTodo = document.createElement('li');
    newTodo.innerText = description;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // Delete Task Button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add('delete-btn');
    deleteButton.addEventListener('click', deleteTodoItem)
    todoDiv.appendChild(deleteButton);

    // Append Task to Todo List
    todoList.appendChild(todoDiv);
}

function deleteTodoItem(event) {
    const todo = event.target.parentElement;

    deleteTodo(todo.getAttribute('data-id'))
      .then(() => todo.remove());
}

function checkTodoItem(event) {
    const todo = event.target.parentElement;
    const identifier = todo.getAttribute('data-id');
    const description = todo.getElementsByTagName('li')[0].innerText;
    const done = !todo.classList.contains('completed');

    updateTodo(identifier, description, done)
      .then(() => todo.classList.toggle('completed'));
}
