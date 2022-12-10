// Поиск элементов на странице
const form = document.querySelector('#form');
const taskInput = form.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

// Массив для сохраниения данных в localStorage.
let tasks = [];

// Если что-то есть в localStorage, то помещаем в массив (который описывает состояние).
if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));

    // Отрисовываем на страницу все данные из localStorage.
    tasks.forEach(task => renderTask(task));
}

checkEmptyList();

// Проверка хранится ли что-нибудь в localStorage по ключу taskHTML ПРИ ЗАГРУЗКУ СТРАНИЦЫ.
// if (localStorage.getItem('tasksHTML')) {
//     tasksList.innerHTML = localStorage.getItem('tasksHTML');
// }

// Функция добавления новых задач.
const addTask = event => {
    event.preventDefault(); // - отменяет стандартное поведение.

    // Достаем текст задачи из поля ввода.
    const taskText = taskInput.value;

    // Описываем задачу в виде обекта.
    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false,
    };

    // Добавляем задачу в массив с задачами.
    tasks.push(newTask);

    saveToLocalStorage();

    renderTask(newTask);

    // Очистка поля ввода.
    taskInput.value = '';
    taskInput.focus();

    // Скрываем блок указывающий на пустоту списка.
    // if (tasksList.children.length > 1) {
    //     emptyList.classList.add('none');
    // }

    // saveHTMLToLocalStorage();

    checkEmptyList();
};

// Добавляем задачу по клику по отправке формы.
form.addEventListener('submit', addTask);

// Функция удаления задачи.
const deleteTask = event => {
    if (event.target.dataset.action === 'delete') {    // Проверка по дата-атрибуту.
        const parentNode = event.target.closest('.list-group-item');    // closest() - ищет по родителям где вложен элемент.

        // Определяем ID задачи.
        const id = parentNode.id;  // вернет строку.

        // Фильтрует массив, удаляя задачу по ID из массива, которую мы удалили из разметки со страницы.
        tasks = tasks.filter(task => task.id !== parseInt(id));

        saveToLocalStorage();

        // Удаляем задачу из разметки.
        parentNode.remove();
    }

    // Показываем блок указывающий на пустоту списка, если не осталось задач.
    // if (tasksList.children.length === 1) {
    //     emptyList.classList.remove('none');
    // }

    // saveHTMLToLocalStorage();

    checkEmptyList();
};

// Удаление задачи.
tasksList.addEventListener('click', deleteTask);

// Функция, которая помечает выполненную задачу.
const doneTask = event => {
    if (event.target.dataset.action === 'done') {    // Проверка по дата-атрибуту.
        const parentNode = event.target.closest('.list-group-item');

        // Определяем ID задачи.
        const id = parentNode.id;  //  вернет строку.

        // Определяем задачу по ID.
        const task = tasks.find(task => task.id === parseInt(id));

        // Меняем состояние задачи (done: false/true) в массиве tasks.
        task.done = !task.done;  // получаем ОБРАТНОЕ значение.

        saveToLocalStorage();

        const taskTitle = parentNode.querySelector('.task-title');
        taskTitle.classList.toggle('task-title--done');
    }

    // saveHTMLToLocalStorage();
};

// Помечаем задачу завершенной.
tasksList.addEventListener('click', doneTask);




// Функция, которая сохраняет разметку в localStorage. (anti pattern)
// function saveHTMLToLocalStorage() {
//     localStorage.setItem('tasksHTML', tasksList.innerHTML);
// }

function checkEmptyList() {
    // Проверка содержит состояние массив tasks.
    if (tasks.length === 0) {
        const emptyListHTML = `
            <li id="emptyList" class="list-group-item empty-list">
                <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
                <div class="empty-list__title">Список дел пуст</div>
            </li>
        `;

        tasksList.insertAdjacentHTML('afterbegin', emptyListHTML);
    } else if (tasks.length > 0) {
        const emptyListElement = document.querySelector('#emptyList');
        emptyListElement ? emptyListElement.remove() : null;
    }
}

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTask(task) {
    // Формируем css класс для задачи, который будет отмечать выполнена задача или нет.
    const cssClass = task.done ? "task-title task-title--done" : "task-title";

    // Разметка для задачи.
    const taskHTML = `
        <li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
            <span class="${cssClass}">${task.text}</span>
            <div class="task-item__buttons">
                <button type="button" data-action="done" class="btn-action">
                    <img src="./img/tick.svg" alt="Done" width="18" height="18">
                </button>
                <button type="button" data-action="delete" class="btn-action">
                    <img src="./img/cross.svg" alt="Done" width="18" height="18">
                </button>
            </div>
        </li>
    `;

    // Формируем новую задачу на странице.
    tasksList.insertAdjacentHTML('beforeend', taskHTML);
}




















