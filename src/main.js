import './style.css'
import {App} from './to-dos/app';
import todoStore from './store/todo.store';
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'

todoStore.initStore();

App('#app');