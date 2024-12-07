let toDoList = [];
    let taskList = [];
    function addToDoList() {
        let taskName = document.querySelector('.list').value;
        toDoList.push(taskName);
        document.querySelector('.list').value = '';
        let taskDate = document.querySelector('.dateSelector').value;
        document.querySelector('.dateSelector').value = '';
        const taskDeleteButton = 'Delete';
        taskList.push([taskName, taskDate, taskDeleteButton]);
        displayTasks(taskList);

    }

    function displayTasks(taskList) {
        document.querySelector('.result').innerHTML = '';
        for (let i = 0; i < taskList.length; i++) {
            for (let j = 0; j < taskList[i].length; j++) {
                if (j === 0) {
                    document.querySelector('.result').innerHTML += `<button class="result-todo">${taskList[i][j]}</button>`;
                }
                else if (j === 1) {
                    document.querySelector('.result').innerHTML += `<button class="result-date">${taskList[i][j]}</button>`;
                }
                else {
                    document.querySelector('.result').innerHTML += `<button class="del-btn" onclick="deleteTask(${1});">${taskList[i][j]}</button><br>`;

                }
            }
        }
    }

    function deleteTask(n) {
        for (let i = 0; i < n; i++) {
            taskList.pop();
        }
        displayTasks(taskList);
    }
