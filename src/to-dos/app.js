import todoStore from '../store/todo.store';
import html from './app.html?raw';
import { renderTdos } from './use-cases';

const ElementIDs = {
  TodoList: '.todo-list',
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
}