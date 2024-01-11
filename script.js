// Selecting elements using querySelector
let input = document.querySelector('.message');
let addButton = document.querySelector('.add');
let clearAllButton = document.querySelector('.clear-all'); // Selecting Clear All button
let todoList = document.querySelector('.todo');

// adding event listener to addButton. listening when the button is clicked and then executing the next function
addButton.addEventListener('click', function() {
    // getting the user input
    let taskText = input.value.trim(); // string method to delete white spaces

    // Check if the input is not empty
    if (taskText !== '') {
        // Create a new list item 
        let listItem = document.createElement('li');

        // Here we create checkbox for every task element
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
        listItem.appendChild(deleteButton);  // adding the delete button to the listItem

        // Add event listener to delete button (on click)
        deleteButton.addEventListener('click', function() {
            // Remove the listItem if the delete button was clicked
            listItem.remove();
            // Save the updated tasks to localStorage after deletion
            saveTasks();
        });

        // adding new task as a child to the list 
        todoList.appendChild(listItem);

        // clearing the user input field, so that after submitting user is able to write another task
        input.value = '';

        // Save the updated tasks to localStorage after adding
        saveTasks();
    } else {
        // if user input field is empty and user tries to submit- show him warning that field is empty
        alert('Please enter a task!');
    }
});

// Event listener for Clear All button(when the button is clicked all tasks are deleted including local storage)
clearAllButton.addEventListener('click', function() {
    todoList.innerHTML = ''; // Clear all tasks from the list
    localStorage.removeItem('tasks'); // Clear tasks from localStorage
});

// Function (saving tasks to localStorage)
function saveTasks() {
    let tasks = [];
    let lis = todoList.querySelectorAll('li');
    lis.forEach(li => {
        tasks.push(li.querySelector('span').textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage on page 
window.addEventListener('load', function() {
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
    deleteButton.addEventListener('click', function() {
        listItem.remove();
        saveTasks();
    });

    // Add event listener to checkbox (if the task is completed it is crossed by the line)
    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            listItem.classList.add('completed'); // + 'completed' class
        } else {
            listItem.classList.remove('completed'); // -'completed' class
        }
        saveTasks();
    });
    todoList.appendChild(listItem);
}
