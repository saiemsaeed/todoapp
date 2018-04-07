document.addEventListener('DOMContentLoaded', function (event) {
    fetch('/api/todos')
        .then(data => data.json())
        .then(todos => addTodos(todos))
        .catch(err => console.log(err));

    document.querySelector('#todoInput').addEventListener('keypress', function (event) {
        if (event.which === 13) {
            if (this.value === "")
                return false;
            fetch('/api/todos', {
                body: JSON.stringify({
                    text: this.value
                }),
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                }
            })
                .then(data => {
                    this.value = "";
                    return data.json();
                })
                .then(todo => {
                    addTodo(todo);
                })
                .catch(err => console.log(err))
        }
    });

    document.querySelector('.list').addEventListener('click', function (e) {
        if (e.target.nodeName === "LI") {
            let clickedId = e.target.dataset.id;
            let isCompleted = e.target.dataset.isCompleted;
            let obj;
            if(isCompleted == 'true'){
                obj = {
                    isCompleted: 'false',
                    completedOn: null
                };
                e.target.dataset.isCompleted = 'false';
            }
            else{
                obj = {
                    isCompleted: 'true',
                    completedOn: Date.now()
                };
                e.target.dataset.isCompleted = 'true';
            }
            fetch(`/api/todos/${clickedId}`, {
                body: JSON.stringify(obj),
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                }
            })
                .then(data => e.target.classList.toggle('done'))
                .catch(err => console.log(err))
        }
    });

    document.querySelector('.list').addEventListener('click', function (e) {
        if (e.target.nodeName === "SPAN") {
            e.stopPropagation();
            let clickedId = e.target.parentElement.dataset.id;
            fetch(`/api/todos/${clickedId}`, {
                method: "DELETE",
                headers: {
                    'content-type': 'application/json'
                }
            })
                .then(data => e.target.parentElement.remove())
                .catch(err => console.log(err))
        }
    });
});

function addTodos(todos) {
    todos.forEach(todo => {
        addTodo(todo);
    });
}

function addTodo(todo) {
    let list = document.querySelector('.list');
    let newTodo = document.createElement('li');
    newTodo.dataset.id = todo._id;
    newTodo.dataset.isCompleted = todo.isCompleted;
    newTodo.innerHTML = `${todo.text} <span>X</span>`;
    newTodo.setAttribute('class', 'task');
    if (todo.isCompleted)
        newTodo.setAttribute('class', 'task done');
    list.appendChild(newTodo);
}