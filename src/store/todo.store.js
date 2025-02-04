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

export default {
  initStore,
}