import todoStore, { Filters } from "../../store/todo.store";

let element;
/**
 * 
 * @param {*} elementId 
 */
export const renderPendingTodos = (elementId) => {
  if(!element){
    element = document.querySelector(elementId);
  }
  if(!element){
    throw new Error(`Element with id ${elementId} not found`);
  }
  element.innerHTML = todoStore.getTodos(Filters.Pending).length;
}