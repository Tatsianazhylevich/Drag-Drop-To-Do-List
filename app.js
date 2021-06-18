let inputTask = document.querySelector(".add_text");
const placeholders = document.querySelectorAll('.placeholder');
const buttonAddTask = document.querySelector(".add_button");
const buttonDeleteAll = document.querySelector(".del_button");

const startedList = document.querySelector('.started');
const inProgressList = document.querySelector('.inProgress');
const finishList = document.querySelector('.finish');

console.log(startedList)

buttonAddTask.addEventListener('click', () => {
    if (inputTask.value !== "") {
        createNewTask(inputTask.value);
        inputRemove();
    }

})

buttonDeleteAll.addEventListener('click', () => {
    removeAllTasks();
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

    for (const placeholder of placeholders) {
        placeholder.addEventListener('dragover', dragover)
        placeholder.addEventListener('dragenter', dragenter)
        placeholder.addEventListener('dragleave', dragleave)
        placeholder.addEventListener('drop', dragdrop)
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

    removeBtn.addEventListener('click', removeTask);
    function removeTask() {
        task.remove();
    }
}

function inputRemove() {
    inputTask.value = "";
}

function removeAllTasks () {
    placeholders.forEach(placeholder => placeholder.innerHTML = "")
}



