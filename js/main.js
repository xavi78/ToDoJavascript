document.addEventListener('DOMContentLoaded',function(){

    const createElement = function(task){
        let node=document.createElement('div');
        let template= function(task){
            return `<span>${task}</span>`;

        };
        node.innerHTML = template(task);

        return node.firstChild;

    }

    const printTask= function(task){
        let taskItemNode = createElement(task);
        document.querySelector('.taskList').appendChild(taskItemNode);
    }

    document.querySelector('.addSection input').addEventListener('keyup'
        ,function (evento){
            let texto= evento.target.value.trim();
            if (evento.keyCode===13){
                if(texto===''){
                    alert("Nada que guardar")
                }else {
                    localStorage.setItem("item",texto);
                    printTask(texto);
                }
            }

        });
});
