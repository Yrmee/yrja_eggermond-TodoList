const API_URL = "http://localhost:3000";

// GET Request to get Tasks
async function getTodos() {
  try {
    const response = await fetch(API_URL, {method: 'GET', headers: {'Content-Type': 'application/json'}});

    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

// POST Request to create a Task
async function createTodo(description) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        description: description,
        done: false
      })
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

// DELETE Request to delete a Task
async function deleteTodo(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    return response.status === 204;
  } catch (error) {
    console.log(error);
  }
}

// PUT Request to update a Task
async function updateTodo(id, description, done) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        description: description,
        done: done
      })
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
