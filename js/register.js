import LoaderController from './controllers/LoaderController.js';
import ErrorController from './controllers/ErrorController.js';
import RegisterFormController from './controllers/RegisterFormController.js';
import SuccessController from './controllers/SuccessController.js';

window.addEventListener("DOMContentLoaded", (event) => {

    // Controlador del Loader
    const loader = document.querySelector('.lds-default');
    const loaderController = new LoaderController(loader);

    const errorsElement = document.querySelector('.global-errors');
    const errorController = new ErrorController(errorsElement);

    // Mensajes de éxito
    const successElement = document.querySelector('.global-success');
    const successController = new SuccessController(successElement);

    const formRegElement = document.querySelector('form');
    const formRegController = new RegisterFormController(formRegElement);
});