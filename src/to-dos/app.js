import todoStore, {Filters} from '../store/todo.store';
import html from './app.html?raw';
import { renderTdos, renderPendingTodos } from './use-cases';

const ElementIDs = {
  TodoList: '.todo-list',
  NewTodoImput: '#new-todo-input',
  ClearCompleted: '.clear-completed',
  TodoFilters: '.filtro',
  PendingCount: '#pending-count',
}
/**
 * 
 * @param {*} elementId 
 */
export const App = (elementId) => {

  const displayTodos = () => {
    const todos = todoStore.getTodos(todoStore.currentFilter());
    renderTdos(ElementIDs.TodoList, todos);
    updatePendingCount();
  }

  const updatePendingCount = () =>{
    renderPendingTodos(ElementIDs.PendingCount);
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
  const clearCompleted = document.querySelector(ElementIDs.ClearCompleted);
  const filtersUL = document.querySelectorAll(ElementIDs.TodoFilters);

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

  clearCompleted.addEventListener('click', (event) => {
    todoStore.deleteCompleted();
    displayTodos();
  });

  filtersUL.forEach(element => {
    element.addEventListener('click', (element) => {
      filtersUL.forEach(ele => ele.classList.remove('selected'));
      element.target.classList.add('selected'); 
      switch (element.target.text) {
        case 'Todos':
          todoStore.setFilter(Filters.All);
          break;
        case 'Pendientes':
          todoStore.setFilter(Filters.Pending);
          break;
        case 'Completados':
          todoStore.setFilter(Filters.Completed);
          break;
        default:
          break;
      }
      displayTodos();
    })
  });
}
