const cl=console.log;

const todoForm=document.getElementById("todoForm");
const todoContainer=document.getElementById("todoContainer");
const AddBtn=document.getElementById("AddBtn");
const updateBtn=document.getElementById("updateBtn");
const todoitemControl=document.getElementById("todoitem");

function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, 
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


let todoArr=[
    // {
    //     todoitem:"javascript",
    //     todoId:"120",
    // }
]

const snackbar=(title,icon)=>{
    swal.fire({
        title:title,
        icon:icon,
        timer:2500,
        confirmButtonColor:"#00ff00"
    })
}


const tempTodo=(arr)=>{
    let result=`<ul class="list-group">`;

    result+=todoArr.map(todo=>{
        return`
                <li class="list-group-item d-flex justify-content-between" id="${todo.todoId}">
                        <span>${todo.todoitem}</span>
                        <span>
                           <i class="fa-solid editBtn fa-pen-to-square text-info" onclick="onEdit(this)"></i>
                           <i class="fa-solid removeBtn fa-trash text-danger" onclick="onRemove(this)"></i>
                        </span>
                </li>
        `
    }).join("");

    result+=`<ul>`;

    todoContainer.innerHTML=result
}

if(localStorage.getItem("todoArr")){
   todoArr=JSON.parse(localStorage.getItem("todoArr"));
}   

if(todoArr.length > 0){
    tempTodo(todoArr);
}


const onEdit=(ele)=>{
    let editId=ele.closest("li").id;
    localStorage.setItem("editId", editId);
    let editObj=todoArr.find(todo=>todo.todoId===editId);
    
    todoitemControl.value=editObj.todoitem;

    AddBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");
    cl(editObj);
}


const onTodoForm=(ele)=>{
    ele.preventDefault();

    let todoObj={
        todoitem:todoitemControl.value,
        todoId:uuid(),
    }

    todoArr.unshift(todoObj);

    if(todoContainer.querySelector("ul")){
            let list=document.createElement("li");
            list.id=todoObj.todoId;
        
                    list.className=`list-group-item d-flex justify-content-between`;
            list.innerHTML=`
                                <span>${todoObj.todoitem}</span>
                                <span>
                                   <i class="fa-solid editBtn fa-pen-to-square text-info" onclick="onEdit(this)"></i>
                                   <i class="fa-solid removeBtn fa-trash text-danger" onclick="onRemove(this)"></i>
                                </span>
            
            `

            todoContainer.querySelector("ul").prepend(list);
    }else{
        tempTodo(todoArr);
    }

    localStorage.setItem("todoArr", JSON.stringify(todoArr));

    snackbar(`this ${todoObj.todoitem} item is Added successFully!`, `success`);
    ele.target.reset();
}

const onUpdateBtn=()=>{
    let updateId=localStorage.getItem("editId");

    cl(updateId);
    let updateObj={
        todoitem:todoitemControl.value,
        todoId:updateId,
    }

    let getIndex=todoArr.findIndex(todo=>todo.todoId===updateId);

    todoArr.splice(getIndex,1,updateObj);

    localStorage.setItem("todoArr", JSON.stringify(todoArr));


    let list=document.getElementById(updateId).firstElementChild;

    list.innerHTML=`<span>${updateObj.todoitem}</span>`;

    snackbar(`this ${updateObj.todoitem} item is update successFully!`, `success`);

    AddBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");

    cl(todoArr);

    cl(getIndex);

    todoForm.reset();
}


todoForm.addEventListener("submit" , onTodoForm);
updateBtn.addEventListener("click", onUpdateBtn);