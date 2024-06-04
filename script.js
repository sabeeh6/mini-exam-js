
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    if (!name || !email || !password) {
      showMessage('Please fill in all fields.', 'message');
      return;
    }
  
    const users = JSON.parse(localStorage.getItem('users')) || [];
  
    if (users.find(user => user.email === email)) {
      showMessage('This email is already registered.', 'message');
      return;
    }
  
    const newUser = {
      name: name,
      email: email,
      password: password,
      uid: generateUID(),
      status: 'active',
      createdAt: new Date()
    };
  
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
  
    showMessage('Registration successful!', 'message', 'green');
    document.getElementById('registrationForm').reset();
  
    // Log user data to the console
    console.log('Registered User:', newUser);
    console.log('All Users:', users);
  
    // Show success message in alert
    alert('Registration successful!');
  });
  
  document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
  
    if (!email || !password) {
      showMessage('Please fill in all fields.', 'loginMessage');
      return;
    }
  
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);
  
    if (!user) {
      // Show toast notification using Toastify
      Toastify({
        text: "Invalid email or password",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#ff0000",
        stopOnFocus: true
      }).showToast();
      return;
    }
  
    // Show logged-in user's email at the top right of the page
    document.getElementById('loggedInUserEmail').textContent = `Logged in as: $ {user.email}`;
  
    showMessage('Login successful!', 'loginMessage', 'green');
    document.getElementById('loginForm').reset();
  
    // Log login data to the console
    console.log('Logged in User:', user);
  });
  
  function generateUID() {
    return 'uid-' + Math.random().toString(36).substr(2, 16);
  }
  
  function showMessage(message, elementId, color = 'red') {
    const messageDiv = document.getElementById(elementId);
    messageDiv.textContent = message;
    messageDiv.style.color = color;
  }

            // TO DO
            // Object to store to-do items
        let todos = [];

        // Function to generate a unique ID
        function generateId() {
            return '_' + Math.random().toString(36).substr(2, 9);
        }

        // Function to add a to-do item
        function addTodo(title, description, date) {
            const todo = {
                id: generateId(),
                title: title,
                description: description,
                date: date,
                status: "Pending", // You can add more statuses like "Completed", "In Progress", etc.
                createdAt: new Date(),
                user_id: "current_user_id" // Replace "current_user_id" with the actual user's ID
            };
            todos.push(todo);
            displayTodos();
        }

        // Function to display all to-do items
        function displayTodos() {
            const todoList = document.getElementById('todo-list');
            todoList.innerHTML = '';
            todos.forEach(todo => {
                const row = `
                    <tr>
                        <td>${todo.title}</td>
                        <td>${todo.description}</td>
                        <td>${todo.date}</td>
                        <td>${todo.status}</td>
                    </tr>
                `;
                todoList.insertAdjacentHTML('beforeend', row);
            });
        }

        // Event listener for form submission
        document.getElementById('todo-form').addEventListener('submit', function(event) {
            event.preventDefault();
            const title = document.getElementById('title').value;
            const description = document.getElementById('description').value;
            const date = document.getElementById('date').value;
            addTodo(title, description, date);
            document.getElementById('title').value = '';
            document.getElementById('description').value = '';
            document.getElementById('date').value = '';
        });
