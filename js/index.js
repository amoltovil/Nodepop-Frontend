
import AnunciosListController from './controllers/AnunciosListController.js';
import LoaderController from './controllers/LoaderController.js';
import ErrorController from './controllers/ErrorController.js';
import SuccessController from './controllers/SuccessController.js';
import NewAnuncioOrLoginController from './controllers/NewAnuncioOrLoginController.js';
import SearhController from './controllers/SearchController.js';
import FilterController from './controllers/FilterController.js';
import LogoutController from './controllers/LogoutController.js';
import PageController from './controllers/PageController.js';

window.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM FULLY LOADED AND PARSED");
  
    // Controlador del Loader
    const loader = document.querySelector('.lds-default');
    const loaderController = new LoaderController(loader);
   
    // Controlador de la lista de anuncios
    const element = document.querySelector('.anuncios-list');
    const controller = new AnunciosListController(element);
    controller.loadAnuncios();

    const paginationElement = document.querySelector(".pagination");
    const pageController = new PageController(paginationElement);
    
    const errorsElement = document.querySelector('.global-errors');
    const errorController = new ErrorController(errorsElement);
    //errorController.showError('Que pasa madafaka!!');

    // Mensajes de éxito
    const successElement = document.querySelector('.global-success');
    const successController = new SuccessController(successElement);

    const newAnuncioButtons = document.querySelector('.new-anuncio');
    new NewAnuncioOrLoginController(newAnuncioButtons);

    const searchInput = document.querySelector('input[type="search"]');
    new SearhController(searchInput);

    const filterTags = document.querySelector(".filter-tags-anuncio");
    new FilterController(filterTags);
    
    const logOutElement = document.querySelector('.logout');
    new LogoutController(logOutElement);
});
