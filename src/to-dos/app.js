import todoStore from '../store/todo.store';
import html from './app.html?raw';
import { renderTdos } from './use-cases';

const ElementIDs = {
  TodoList: '.todo-list',
  NewTodoImput: '#new-todo-input',
}
/**
 * 
 * @param {*} elementId 
 */
export const App = (elementId) => {

  const displayTodos = () => {
    const todos = todoStore.getTodos(todoStore.currentFilter());
    renderTdos(ElementIDs.TodoList, todos);
  }

  //Cuando la funcion App() se llama
  (() => {
    const app = document.createElement('div');
    app.innerHTML = html;
    document.querySelector(elementId).append(app);
    displayTodos();
  })();

  //Referencias HTML
  const newDesciptionInput = document.querySelector(ElementIDs.NewTodoImput);
  const todoListUL = document.querySelector(ElementIDs.TodoList);
  const destroyTodo = document.querySelector(ElementIDs.TodoList);

  //events
  newDesciptionInput.addEventListener('keyup', (event) => {
    if(event.keyCode !== 13){
      return;
    }
    if(event.target.value.trim().length === 0){
      return;
    }
    todoStore.addTodo(event.target.value);
    displayTodos();
    event.target.value = '';
  });

  todoListUL.addEventListener('click', (event) => {
    const element = event.target.closest('[data-id]');
    todoStore.toggleTodo(element.getAttribute('data-id'));
    displayTodos();
  });

  destroyTodo.addEventListener('click', (event) => {
    const element = event.target.closest('[data-id]');
    if(event.target.className==="destroy"){
      todoStore.deleteTodo(element.getAttribute('data-id'));
    }
    displayTodos();
  });
}