import './style.css';
import { createAppController } from './controllers/AppController';

const app = document.querySelector<HTMLDivElement>('#app');
if (!app) {
  throw new Error('No se encontró el contenedor #app');
}

const controller = createAppController(app);
controller.init();
