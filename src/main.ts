import './style.css';

interface Todo {
  title:string;
  isCompleted:boolean;
  readonly id: string;
}

let todos:Todo[] = [];

const todosContiner = document.querySelector(
  ".todo-container"
) as HTMLDivElement;

const todoInput = document.getElementsByName("title")[0] as HTMLInputElement;

const myForm = document.getElementById("myForm") as HTMLElement;

document.addEventListener("DOMContentLoaded", () => {
  const storedTodos = localStorage.getItem("todos");
  if (storedTodos) {
    todos = JSON.parse(storedTodos);
    renderTodo(todos);
  }
});

myForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const todo:Todo = {
    title: todoInput.value                                                                                                                                                                                                                                                                           ,
    isCompleted: false,
    id: String(Math.random()*100),
  };

  todos.push(todo);
  saveTodosToLocalStorage();
  todoInput.value = "";
  // console.log(todos);

  renderTodo(todos);
});

const generateTodoItems = (title:string, isCompleted:boolean, id:string) => {
  const todo:HTMLDivElement = document.createElement("div");
  todo.className = "todo";

  const div:HTMLDivElement = document.createElement("div");
  div.className = "aDiv";

  //creating checkbox
  const checkbox:HTMLInputElement = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.className = "isCompleted";
  checkbox.checked = isCompleted;
  checkbox.onchange = () => {
    todos.find(item => {
      if(item.id === id) item.isCompleted = checkbox.checked;
    })
    paragraph.className = isCompleted ? "textCut" : "";
    saveTodosToLocalStorage();
  }

  //creating p for title
  const paragraph:HTMLParagraphElement = document.createElement("p");
  paragraph.className = checkbox.checked ? "textCut" : "";
  paragraph.innerText = title;

  //creating Delete button
  const btn: HTMLButtonElement = document.createElement("button");
  btn.innerText="X";
  btn.className="deleteBtn";
  btn.onclick = () => {
    deleteTodo(id);
  }

  //Appending All to todoItem
  div.append(checkbox, paragraph)
  todo.append(div, btn);

  todosContiner.append(todo);

}

const deleteTodo = (id:string) => {
  const idx = todos.findIndex(item => item.id === id);
  todos.splice(idx, 1);
  saveTodosToLocalStorage();

  renderTodo(todos);
}

const renderTodo = (todos:Todo[]) => {
  todosContiner.innerText = "";
  todos.forEach(item => {
    generateTodoItems(item.title, item.isCompleted, item.id);
  })
}


const saveTodosToLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};
