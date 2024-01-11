// Selecting elements using querySelector
let input = document.querySelector('.message');
let addButton = document.querySelector('.add');
let clearAllButton = document.querySelector('.clear-all');
let todoList = document.querySelector('.todo');

// Adding event listener to addButton.
addButton.addEventListener('click', function () {
    // Getting the user input
    let taskText = input.value.trim();

    // Check if the input is not empty
    if (taskText !== '') {
        // Create a new list item
        let listItem = document.createElement('li');

        // Create checkbox for every task element
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        listItem.appendChild(checkbox);

        // Create a span for the task text
        let taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        listItem.appendChild(taskSpan);

        // Create a delete button for each task
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        listItem.appendChild(deleteButton);

        // Add event listener to delete button (on click)
        deleteButton.addEventListener('click', function () {
            // Remove the listItem if the delete button was clicked
            listItem.remove();
            // Save the updated tasks to localStorage after deletion
            saveTasks();
        });

        // Adding new task as a child to the list
        todoList.appendChild(listItem);

        // Clearing the user input field after submitting so that the user can write another task
        input.value = '';

        // Save the updated tasks to localStorage after adding
        saveTasks();
    } else {
        // If the user input field is empty and the user tries to submit, show a warning that the field is empty
        alert('Please enter a task!');
    }
});

// Event listener for Clear All button (when the button is clicked, all tasks are deleted including local storage)
clearAllButton.addEventListener('click', function () {
    todoList.innerHTML = ''; // Clear all tasks from the list
    localStorage.removeItem('tasks'); // Clear tasks from localStorage
});

// Function to save tasks to localStorage
function saveTasks() {
    let tasks = [];
    let lis = todoList.querySelectorAll('li');
    lis.forEach(li => {
        tasks.push(li.querySelector('span').textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage on page 
window.addEventListener('load', function () {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(task => {
            displayTask(task);
        });
    }
});

// Function to display a task
function displayTask(taskText) {
    let listItem = document.createElement('li');
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    listItem.appendChild(checkbox);
    let taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;
    listItem.appendChild(taskSpan);
    listItem.appendChild(document.createTextNode('       '));
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    listItem.appendChild(deleteButton);

    // Add event listener to checkbox
    checkbox.addEventListener('change', function () {
        saveTasks();
    });

    deleteButton.addEventListener('click', function () {
        listItem.remove();
        saveTasks();
    });

    todoList.appendChild(listItem);
}
