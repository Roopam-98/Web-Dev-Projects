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

/*     //display task list on screen
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
    */

    function displayTasks(taskList){
        let showResult = document.querySelector('.result');       //displaying task on screen in simpler way.
        showResult.innerHTML =  '';
        taskList.forEach(function(task,index){
            showResult.innerHTML += `<p class="result-todo">${task[0]}</p>`;
            showResult.innerHTML += `<p class="result-date">${task[1]}</p>`;
            showResult.innerHTML += `<button class="del-btn" onclick="deleteTask(${index});">${task[2]}</button>`;
        });
    }

    function deleteTask(i) {
        taskList.splice(i,1);
        displayTasks(taskList);
    }
