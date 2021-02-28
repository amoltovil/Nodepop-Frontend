import BaseController from './BaseController.js';
import dataService from '../services/DataService.js';

export default class DeleteButtonController extends BaseController {

    constructor(element, anuncio){
        super(element);
        this.element.addEventListener('click', async event =>{
            const deleteConfirmed = confirm('¿Seguro que quieres eliminar el anuncio?');
            if (deleteConfirmed) {
                await dataService.deleteAnuncio(anuncio);
                this.publish(this.events.ANUNCIO_DELETED, anuncio);
            }
        });
    }
}