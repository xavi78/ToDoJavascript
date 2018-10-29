document.addEventListener('DOMContentLoaded',function(){

    const createID = function(){
        return `taskId-${Date.now()}-${Math.round(Math.random()* 1000)}`;
    }
    const createElement = function(task){
        let node=document.createElement('div');
        let template= function(task){
               return `<div class="" id="${task.id}">
                        <span>${task.text}</span>
                        <input type="checkbox" name="completed" ${task.completed ?'checked':''}>
                        <input type="button" value="Remove">
                </div>`;

        };
        node.innerHTML = template(task);

        return node.firstChild;

    }
    const removeTask = function(evento){
        var taskItemNode = evento.target.parentNode;
        var id = taskItemNode.id;
        removeIdFromStorage(id);
        taskItemNode.remove();
    }

    const toggledCompleted = function(evento){
        let checkbox = evento.target;
        let taskItemNode= checkbox.parentNode;
        let id = taskItemNode.id;
        let completed = checkbox.checked;
        let todos = JSON.parse(localStorage.getItem('todos')||[]);
        todos = todos.map(task=>{
            if(task.id===id){
                task.completed= completed;
            }
            return task;
        })
        localStorage.setItem('todos',JSON.stringify(todos));
    }

    const printTask= function(task){
        let taskItemNode = createElement(task);
        taskItemNode.querySelector('[type="button"]')
            .addEventListener('click', removeTask);
        taskItemNode.querySelector('[type="checkbox"]')
            .addEventListener('change', toggledCompleted);
        document.querySelector('.taskList').appendChild(taskItemNode);
    }

    const saveToStorage = function(task){
        const todos= JSON.parse(localStorage.getItem('todos')) || [];
        todos.push(task);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    const removeIdFromStorage = function(id){
        var todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos = todos.filter( item => !(item.id===id));
        localStorage.setItem('todos',JSON.stringify(todos));
    }

    document.querySelector('.addSection input').addEventListener('keyup'
        ,function (evento){
            let texto= evento.target.value.trim();
            if (evento.keyCode===13){
                if(texto===''){
                    alert("Nada que guardar")
                }else {
                    let task={
                        text: texto,
                        date: new Date(),
                        completed: false,
                        id:createID()
                    }
                    saveToStorage(task);
                    printTask(task);
                    evento.target.value='';
                }
            }

        });
});
