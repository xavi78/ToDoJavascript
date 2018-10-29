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
    }

    const printTask= function(task){
        let taskItemNode = createElement(task);
        taskItemNode.querySelector('[type="button"]')
            .addEventListener('click', removeTask);
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
