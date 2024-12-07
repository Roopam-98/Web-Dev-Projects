let taskList = [];
    function addToDoList() {
        let taskName = document.querySelector('.list');
        let taskDate = document.querySelector('.dateSelector');
        const taskDeleteButton = 'Delete';
        taskList.push([taskName.value, taskDate.value, taskDeleteButton]);
        //console.log(taskList);
        displayTasks(taskList);
        taskName.value = '';
        taskDate.value = '';
    }

    function displayTasks(taskList) {
        document.querySelector('.result').innerHTML = '';
        for (let i = 0; i < taskList.length; i++) {
            for (let j = 0; j < taskList[i].length; j++) {
                if (j === 0) {
                    document.querySelector('.result').innerHTML+= `<p class="result-todo">${taskList[i][j]}</p>`;
                }
                else if (j === 1) {
                    document.querySelector('.result').innerHTML += `<p class="result-date">${taskList[i][j]}</p>`;
                }
                else {
                    document.querySelector('.result').innerHTML += `<button class="del-btn" onclick="deleteTask(${i});">${taskList[i][j]}</button>`;

                }
            }
        }
    }

    function deleteTask(i) {
        taskList.splice(i,1);
        displayTasks(taskList);
    }
