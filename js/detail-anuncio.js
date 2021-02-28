import LoaderController from './controllers/LoaderController.js';
import ErrorController from './controllers/ErrorController.js';
import SuccessController from './controllers/SuccessController.js';
import DetailAnuncioController from './controllers/DetailAnuncioController.js';
import LogoutController from './controllers/LogoutController.js';

window.addEventListener("DOMContentLoaded", (event) => {
  
    // Controlador del Loader
    const loader = document.querySelector('.lds-default');
    const loaderController = new LoaderController(loader);

    const detailAnuncio = document.querySelector('.detail-anuncio');
    const detailController = new DetailAnuncioController(detailAnuncio);
    detailController.loadAnuncio();

    const errorsElement = document.querySelector('.global-errors');
    const errorController = new ErrorController(errorsElement);
    
    const successElement = document.querySelector('.global-success');
    const successController = new SuccessController(successElement);

    const logOutElement = document.querySelector('.logout');
   // console.log('LOGOUT ELEMENT detalle', logOutElement);
    new LogoutController(logOutElement);

});