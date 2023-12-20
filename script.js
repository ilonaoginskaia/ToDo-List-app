// Selecting elements using querySelector
let input = document.querySelector('.message');
let addButton = document.querySelector('.add');
let todoList = document.querySelector('.todo');

// adding event listener to addButton. listening when the button is clicket and then executing the next function
addButton.addEventListener('click', function() {
    // getting the user input
    let taskText = input.value.trim();//string method to delete white spaces

    // Check if the input is not empty
    if (taskText !== '') {
        // Create a new list item 
        let listItem = document.createElement('li');
        listItem.textContent = taskText; //adjusting text (user input) to listItem 

        // adding new task as a child to the list 
        todoList.appendChild(listItem);

        //clearing the user input field, so that after submitting user is able to write another task
        input.value = '';
    } else {
        // if user input field is empty and user tries to submit- show him warning that field is empty
        alert('Please enter a task!');
    }
});

