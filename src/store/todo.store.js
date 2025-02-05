import {Todo} from '../to-dos/models/todo.model';

export const Filters = {
  All: 'all',
  Completed: 'Completed',
  Pending: 'Pending',
}

const state = {
  todos: [
    new Todo('Piedra filosofal'),
    new Todo('Piedra del riñon'),
    new Todo('Piedra de la que se fuma'),
    new Todo('Piedra donde iba la espada'),
  ],
  filter: Filters.All,
}

const initStore = () =>{
  loadStore();
  console.log('InitStore 🫔');
}

const loadStore = () => {
  if (localStorage.getItem('state')){
    const {todos = [], filter = Filters.All} = JSON.parse(localStorage.getItem('state'));
    state.todos = todos;
    state.filter = filter;  
  }
}

const saveSateToLocalStorage = () => {
  localStorage.setItem('state', JSON.stringify(state));
}

const getTodos = (filter =Filters.All) => {
  switch (filter) {

    case Filters.All:
      return [...state.todos];

    case Filters.Completed:
      return state.todos.filter(todo => todo.done);

    case Filters.Pending:
      return state.todos.filter(todo => !todo.done);

    default:
      throw new Error(`Option ${filter} is not valid`);
  }
}

const addTodo = (description) => {
  if (!description) throw new Error('Description is required');

  state.todos.push(new Todo(description));
  saveSateToLocalStorage();
}

const toggleTodo = (todoId) => {
  state.todos = state.todos.map(todo => {
    if(todo.id === todoId){
      todo.done = !todo.done;
    }
    return todo;
  });
  saveSateToLocalStorage();
}

const deleteTodo = (todoId) => {
  state.todos = state.todos.filter(todo => todo.id !== todoId);
  saveSateToLocalStorage();
}

const deleteCompleted = () => {
  state.todos = state.todos.filter(todo => !todo.done);
  saveSateToLocalStorage();
}

const setFilter = (newFilter = Filters.All) => {
  state.filter = newFilter;
  saveSateToLocalStorage();

}

const currentFilter = () => {
  return state.filter;
}

export default {
  addTodo,
  currentFilter,
  deleteCompleted,
  deleteTodo,
  initStore,
  loadStore,
  setFilter,
  toggleTodo,
  getTodos,
}