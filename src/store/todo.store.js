import {Todo} from '../to-dos/models/todo.model';

const Filters = {
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
  console.log(state);
  console.log('InitStore 🫔');
}

const loadStore = () => {
  throw new Error('Not implemented');
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
}

const toggleTodo = (todoId) => {
  state.todos = state.todos.map(todo => {
    if(todo.id === todoId){
      todo.done = !todo.done;
    }
    return todo;
  });
}

const deleteTodo = (todoId) => {
  state.todos = state.todos.filter(todo => todo.id !== todoId);
}

const deleteCompleted = () => {
  state.todos = state.todos.filter(todo => todo.done);
}

const setFilter = (newFilter = Filters.All) => {
  state.filter = newFilter;
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