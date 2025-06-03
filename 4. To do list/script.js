document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const emptyImage = document.querySelector('.empty-image');
    const todoContainer = document.querySelector('.todo-container');
    const progressBar = document.querySelector('.progress');
    const progressNumber = document.getElementById('numbers');

    const toggleEmptystate = () => {
        emptyImage.style.display = taskList.children.length === 0 ? 'block' : 'none';
        todoContainer.style.width = taskList.children.length > 0 ? '100%' : '50%';
    };

    const updateProgressBar = () => {
        const totalTasks = taskList.children.length;
        const completedTasks = Array.from(taskList.children).filter(li => li.querySelector('.checkbox').checked).length;
        progressBar.style.width = totalTasks > 0 ? `${(completedTasks / totalTasks) * 100}%` : '0%';
        progressNumber.textContent = totalTasks > 0 ? `${completedTasks} / ${totalTasks}` : '0 / 0';
        progressBar.style.backgroundColor = completedTasks === totalTasks && totalTasks > 0 ? '#4CAF50' : '#2196F3';
    };

    const addTask = (event) => {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        if (!taskText) {
            alert('Please enter a task.');
            return;
        }

        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" class="checkbox">
            <span>${taskText}</span>
            <div class="task-buttons">
                <button class="edit-btn" type="button"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="delete-btn" type="button"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;

        const editbtn = li.querySelector('.edit-btn');
        const checkbox = li.querySelector('.checkbox');
        editbtn.addEventListener('click', () => {
            if (!checkbox.checked) {
                taskInput.value = li.querySelector('span').textContent;
                li.remove();
                updateProgressBar();
                toggleEmptystate();
            }
        });

        checkbox.addEventListener('change', () => {
            const ischecked = checkbox.checked;
            li.classList.toggle('completed', ischecked);
            editbtn.disabled = ischecked;
            editbtn.style.opacity = ischecked ? '0.5' : '1';
            editbtn.style.pointerEvents = ischecked ? 'none' : 'auto';
            updateProgressBar();
        });

        li.querySelector('.delete-btn').addEventListener('click', () => {
            li.remove();
            updateProgressBar();
            toggleEmptystate();
        });

        taskList.appendChild(li);
        taskInput.value = '';
        updateProgressBar();
        toggleEmptystate();
    };

    document.querySelector('.input-area').addEventListener('submit', addTask);

    toggleEmptystate();
    updateProgressBar();
});