let taskList =JSON.parse(localStorage.getItem('taskList'))||[];

displayTasks(taskList);

const addButtonElement = document.querySelector('.js-add-btn');
addButtonElement.addEventListener('click',()=>{
    addToDoList();
})
    function addToDoList() {
        let taskName = document.querySelector('.list');
        let taskDate = document.querySelector('.dateSelector');
        let taskTime = document.querySelector('.timeSelector');
        const taskDeleteButton = 'Delete';
        taskList.push([taskName.value, taskDate.value, taskTime.value, taskDeleteButton]);
        [taskName.value, taskDate.value, taskTime.value] = ['','',''];

        displayTasks(taskList);
        saveToStorage();
    }

    function displayTasks(taskList){
        let showResult = document.querySelector('.result');
        showResult.innerHTML='';
        taskList.forEach((task,index) => {
            showResult.innerHTML += `<p class="result-todo">${task[0]}</p>`;
            showResult.innerHTML += `<p class="result-date">${task[1]}</p>`;
            showResult.innerHTML +=`<p class="result-time">${task[2]}</p>`;
            showResult.innerHTML += `<button class="del-btn js-del-btn">${task[3]}</button>`;
        });
        document.querySelectorAll('.js-del-btn').forEach((btn, index) => {
            btn.addEventListener('click', () => {
                deleteTask(index);
            });
        })
    }


    function deleteTask(i) {
        taskList.splice(i,1);
        displayTasks(taskList);
        saveToStorage();
    }

    function saveToStorage(){
        localStorage.setItem('taskList',JSON.stringify(taskList));
    }

