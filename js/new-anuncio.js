import LoaderController from './controllers/LoaderController.js';
import ErrorController from './controllers/ErrorController.js';
import SuccessController from './controllers/SuccessController.js';
import NewAnuncioFormController from './controllers/NewAnuncioFormController.js';
import LogoutController from './controllers/LogoutController.js';

window.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.lds-default');
    const loaderController = new LoaderController(loader);

    const errorsElement = document.querySelector('.global-errors');
    const errorController = new ErrorController(errorsElement);

    const successElement = document.querySelector('.global-sucess');
    const successController = new SuccessController(successElement);

    const formElement = document.querySelector('form');
    new NewAnuncioFormController(formElement);

    const logOutElement = document.querySelector('.logout');
    new LogoutController(logOutElement);
});
