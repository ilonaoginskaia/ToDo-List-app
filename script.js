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
        });

        // adding new task as a child to the list 
        todoList.appendChild(listItem);

        // clearing the user input field, so that after submitting user is able to write another task
        input.value = '';
    } else {
        // if user input field is empty and user tries to submit- show him warning that field is empty
        alert('Please enter a task!');
    }
});
