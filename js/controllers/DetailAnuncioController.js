import BaseController from './BaseController.js';
import dataService from '../services/DataService.js';
import DeleteButtonController from './DeleteButtonController.js';
import {anuncioView} from '../views.js';
import {noDataView} from '../views.js';

export default class DetailAnuncioController extends BaseController {

    constructor(element){
        super(element);
        this.subscribe(this.events.ANUNCIO_DELETED, event =>{
            this.showMessage(); 
            this.loadAnuncio();
        });
    }

    render(anuncios) {
        this.element.innerHTML = ''; // borramos cualquier anuncio que pueda verse en pantalla
        const viewDetailButton = false;
        if (anuncios.length > 0) {
           for (const anuncio of anuncios) {
                const anuncioElement = document.createElement('article');
                anuncioElement.innerHTML = anuncioView(anuncio, viewDetailButton);
                this.element.appendChild(anuncioElement);
                const deleteButton = anuncioElement.querySelector('.btn_borrar');
                if (deleteButton) {
                    new DeleteButtonController(deleteButton, anuncio);
                }
            }
        } else {  // muestra vista de no hay datos y lo lleva a la página principal
            const anuncioElement = document.createElement('article');
            anuncioElement.innerHTML = noDataView();
            this.element.appendChild(anuncioElement);
           // window.location.href='/';
        }
    }; 

    async loadAnuncio() {
        this.publish(this.events.START_LOADING, {});
        try {
            const partsUrl = window.location.href.split('?');
            if (partsUrl.length === 2) {
               const idAnuncio = partsUrl[1];
               const anuncios = await dataService.getAnuncios(null, idAnuncio);
               this.render(anuncios);
            }
        } catch (error) {
            console.error('NO SE HA PODIDO CARGAR EL DETALLE DEL ANUNCIO', error);    
            this.publish(this.events.ERROR, error);
           
        } finally { 
            this.publish(this.events.FINISH_LOADING, {});
        }
    }

    showMessage() { // mostrar que el anuncio se ha borrado correctamente
        this.publish(this.events.SUCCESS, 'El anuncio se ha eliminado correctamente');
    }
}