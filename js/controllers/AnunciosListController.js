import BaseController from './BaseController.js';
import DeleteButtonController from './DeleteButtonController.js';
import PageController from './PageController.js';
import dataService from '../services/DataService.js';
import {anuncioView} from '../views.js';
import {noDataView} from '../views.js';
//import {pagesView} from '../views.js';

export default class AnunciosListController extends BaseController {

    constructor(element) {
        super(element);
        this.subscribe(this.events.SEARCH, query =>{
            this.loadAnuncios(query);
        });
        this.subscribe(this.events.ANUNCIO_DELETED, event =>{
            this.loadAnuncios();
        });
        this.subscribe(this.events.FILTER, query =>{
            this.loadAnuncios(query);
        });
        this.subscribe(this.events.PAGINATION, query =>{
            this.loadAnuncios(query);
        });
    }

    render(anuncios) {
        this.element.innerHTML = ''; // borramos cualquier anuncio que pueda verse en pantalla
        if (anuncios.length > 0) {
            for (const anuncio of anuncios) {
                const anuncioElement = document.createElement('article');
                const viewDetailButton = true;
                anuncioElement.innerHTML = anuncioView(anuncio, viewDetailButton);

                const deleteButton = anuncioElement.querySelector('.btn_borrar');
                if (deleteButton) {
                    new DeleteButtonController(deleteButton, anuncio);
                }
                // 1ª Forma de hacerlo sin controlador de botón de borrar
                // if (deleteButton) {
                //     deleteButton.addEventListener('click', async evento =>{
                //         const deleteConfirmed = confirm('¿Seguro que quieres eliminar el anuncio?');
                //         if (deleteConfirmed) {
                //             // this.publish(this.events.ANUNCIO_DELETED, {});
                //              //console.log('BORRAR EL ANUNCIO', anuncio);
                //             await dataService.deleteAnuncio(anuncio);
                //             anuncioElement.remove(); // borramos el anuncio de la página web
                //             await this.loadAnuncios(); // recargamos los anuncios tras borrar       
                //         }
                //     });
                // }
                
                this.element.appendChild(anuncioElement);

                const detailButton = anuncioElement.querySelector('.btn_detalle');
                detailButton.addEventListener('click', (event) => {
                    event.stopPropagation();
                    window.location.href = `detail-anuncio.html?id=${anuncio.id}`;
                });

            }
        } else { // no se obtienen resultados del backend
            
            const anuncioElement = document.createElement('article');
            anuncioElement.innerHTML = noDataView();
            this.element.appendChild(anuncioElement);
        }
    }; 

    // renderPages(anuncios) { // función para renderizar el nº de páginas resultado
    //     if (anuncios.length > 0) { 
    //         let numPages = Math.ceil(anuncios.length / 10);
    //         console.log('Nº PAGINAS', numPages);
    //         for (let i =1; i <= numPages; i++) {
    //             const pageElement = document.createElement('li');
    //             pageElement.innerHTML = pagesView(i);
    //             this.element.appendChild(pageElement);
    //         }
    //     }
    // };

    async loadAnuncios(query=null) {
        this.publish(this.events.START_LOADING, {});
        try {
            const anuncios = await dataService.getAnuncios(query);
            this.render(anuncios);
        } catch (error) {
            console.error('NO SE HAN PODIDO CARGAR LOS ANUNCIOS', error);    
            this.publish(this.events.ERROR, error);
           
        } finally { // esto se ejecuta, vaya bien o mal
           // this.loader.hideLoading()
           this.publish(this.events.FINISH_LOADING, {});
        }
    }

}