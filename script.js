// Selecting elements using querySelector
let input = document.querySelector('.message');
let addButton = document.querySelector('.add');
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

        // Add multiple spaces between the task text and the delete button for increased spacing
        listItem.appendChild(document.createTextNode('       '));  // Seven spaces

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

// Function (saving tasks to localStorage)
function saveTasks() {
    let tasks = [];//it starts empty array with name "Tasks" and it will store the text for each task
    let lis = todoList.querySelectorAll('li');//selecting all list items <li> from todolist and then store in 'lis'
    lis.forEach(li => {
        // Extracting the text of <span > element within each list item
        tasks.push(li.querySelector('span').textContent);
    });
    // Save the tasks array to localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage on page 
window.addEventListener('load', function() { //when the whole page is loaded (f.e. css, js, images...) the function will be executed
    let tasks = JSON.parse(localStorage.getItem('tasks'));//retrive tasks from local storage
    if (tasks) { //checking if array is not empty 
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
    todoList.appendChild(listItem);
}
