const todoList = JSON.parse(localStorage.getItem("todoList")) || [];
console.log(todoList);
renderTodoList();

function renderTodoList() {
    let todoListHTML = '';
    for (let i = 0; i < todoList.length; i++) {
        const {name, dueDate} = todoList[i];
        const html = `
            <div>${name}</div>
            <div>${dueDate}</div>
            <button class = "delete-todo-button" onclick = "
                todoList.splice(${i}, 1);
                renderTodoList();
            ">Delete</button>
        `;
        todoListHTML += html;
    }
    document.querySelector(".js-todo-list")
        .innerHTML = todoListHTML;
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

function addTodo() {

    const inputElement = document.querySelector(".js-name-input");
    const name = inputElement.value;

    const dueDateInputElement = document.querySelector(".js-due-date-input");
    const dueDate = dueDateInputElement.value;
    
    todoList.push({name, dueDate});
    renderTodoList();

    inputElement.value = "";
    dueDateInputElement.value = "";
}