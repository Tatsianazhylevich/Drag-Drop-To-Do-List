let inputTask = document.querySelector(".add_text");
const placeholders = document.querySelectorAll('.placeholder');
const buttonAddTask = document.querySelector(".add_button");
const buttonDeleteAll = document.querySelector(".del_button");

 const startedList = document.querySelector('.started');
// const inProgressList = document.querySelector('.inProgress');
// const finishList = document.querySelector('.finish');
let draggedItem;

const todoKey = 'todo';
const inProgressKey = 'inProgress';
const finishKey = 'finish';

// Проверка хранилища
const todoFromLS = localStorage.getItem(todoKey) ? JSON.parse(localStorage.getItem(todoKey)) : [];
const inProgressFromLS = localStorage.getItem(inProgressKey) ? JSON.parse(localStorage.getItem(inProgressKey)) : [];
const finishFromLS = localStorage.getItem(finishKey) ? JSON.parse(localStorage.getItem(finishKey)) : [];

function addTaskToLocalStorage(key, taskList) {
    localStorage.setItem(`${key}`, JSON.stringify(taskList));
}

for (let item of todoFromLS) {
    createNewTask(item);
}
for (let item of inProgressFromLS) {
    createNewTask(item);
}
for (let item of finishFromLS) {
    createNewTask(item);
}

buttonAddTask.addEventListener('click', () => {
    if (inputTask.value !== "") {
        todoFromLS.push(inputTask.value);
        addTaskToLocalStorage(todoKey, todoFromLS);
        createNewTask(inputTask.value);
        inputRemove();
    }
})

buttonDeleteAll.addEventListener('click', () => {
    removeAllTasks();
    localStorage.clear();
  
})

function createNewTask(text) {
    let task = document.createElement('div');
    task.classList.add('item');
    task.setAttribute('draggable', true);
    startedList.append(task);

    task.append(document.createTextNode(text));

    let removeBtn = document.createElement('div');
    removeBtn.classList.add('remove_btn');
    removeBtn.append(document.createTextNode('X'));
    task.append(removeBtn);

    task.addEventListener('dragstart', dragstart);
    task.addEventListener('dragend', dragend);

    removeBtn.addEventListener('click', removeTask);

    function removeTask() {
        task.remove();
    }
}

for (const placeholder of placeholders) {
    placeholder.addEventListener('dragover', dragover);
    placeholder.addEventListener('dragenter', dragenter);
    placeholder.addEventListener('dragleave', dragleave);
    placeholder.addEventListener('drop', dragdrop);
}

function dragstart (event) {
    draggedItem = event.target;
    event.target.classList.add('hold');
    setTimeout(() => event.target.classList.add('hide'), 0)
}

function dragend (event) {
    event.target.className = 'item';
}

function dragover (event) {
    event.preventDefault();
}

function dragenter (event) {
    event.target.classList.add('hovered');
}

function dragleave (event) {
    event.target.classList.remove('hovered');
}

function dragdrop (event) {
    event.target.classList.remove('hovered');
    event.target.append(draggedItem);
}


function inputRemove() {
    inputTask.value = "";
}

function removeAllTasks () {
    placeholders.forEach(placeholder => placeholder.innerHTML = "");
}



