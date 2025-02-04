import html from './app.html?raw';

/**
 * 
 * @param {*} elementId 
 */
export const App = (elementId) => {

  //Cuando la funcion App() se llama
  (() => {
    const app = document.createElement('div');
    app.innerHTML = html;
    document.querySelector(elementId).append(app);
  })();
}