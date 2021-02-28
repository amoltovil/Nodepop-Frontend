import dataService from '../services/DataService.js';
import BaseController from './BaseController.js';

export default class NewAnuncioFormController extends BaseController {

    constructor(element){
        super(element);
        this.checkIfUserIsLogged();
        this.attachEventListeners();
        this.focusInName();
        //this.focusInTextarea();
    }

    async checkIfUserIsLogged() {  // podriamos ponerlo en el baseController
        const userIsLogged = await dataService.isUserLogged();
        if (!userIsLogged) {
            window.location.href='/login.html?next=/new-anuncio.html';
        } else {
            this.publish(this.events.FINISH_LOADING);
        }
    }

    focusInTextarea() {
        const textarea = this.element.querySelector('textarea');
        textarea.focus();
    }

    focusInName() {
        const nameAnuncio = this.element.querySelector('.advname');
        nameAnuncio.focus();
    }

    attachEventListeners() {
      // Validación del Formulario para todos los campos obligatorios
      const button = this.element.querySelector('button');

      this.element.querySelectorAll('input[required]').forEach(input => {
            
        input.addEventListener('keyup', (event)=>{

            console.log('INPUT VALIDITY', input.validity);    
            // si el input es correcto, lo marco en verde o en rojo 
            if (input.validity.valid) {
                input.classList.add('is-success');
                input.classList.remove('is-danger');
            } else {
                input.classList.add('is-danger');
                input.classList.remove('is-success');
            }

            // valido si todo el formulario es ok
            if (this.element.checkValidity()) {
                button.removeAttribute('disabled'); // activamos el botón
                //button.setAttribute('disabled', false) // es lo mismo habilita el botón
            } else {
                button.setAttribute('disabled', true); // desactivamos el botón
            }
            });
        });

        // controlamos cuando se envia el formulario con los campos obligatorios y los rellenados 
        this.element.addEventListener('submit', async event => {
            event.preventDefault(); // cancelamos el envío del formulario (comportamiento por defecto)
            let tipoAnuncio = true;
            if (this.element.elements[3].value ==='Venta') {
                tipoAnuncio = true;
            } else {
                tipoAnuncio = false;
            }
            // seleccion de tags estáticos
            let tagsAnuncio = [];
            const selectedCollection = this.element.elements[4].selectedOptions;
            for (let i = 0; i<= selectedCollection.length -1; i++) {
                tagsAnuncio[i] = selectedCollection[i].value;
            }
            
             // seleccion de tags dinámicos, elimino los posibles espacios 
            const nuevosTags = this.element.elements[5].value.replace(/\s+/g, '');
            debugger;
          
            let newTags=[];
            if (nuevosTags.includes(';')) {
                newTags = nuevosTags.replace(';', ',');
            } else {
                newTags = nuevosTags;
            }
            if (newTags.includes(',')) {
                newTags = newTags.split(',');
            } else {
                newTags = nuevosTags;
            }
          
            // Obtengo los tags existentes en BD 
          
            this.publish(this.events.START_LOADING);
            try {
                const tags = await dataService.getTags(); 
                if (!tags.includes(newTags)) {
                    tagsAnuncio.push(newTags);
                }
            } catch (error) {
                this.publish(this.events.ERROR, error)
                console.error('ERROR AL RECUPERAR LOS TAGS');
            } finally {
                this.publish(this.events.FINISH_LOADING);
            }

            const anuncio = {
                nombre: this.element.elements.nameanuncio.value,
                desc: this.element.elements.descanuncio.value,
                precio: this.element.elements.priceanuncio.value,
                venta: tipoAnuncio,
                tags: tagsAnuncio, 
                foto: null
            }
            if (this.element.elements.file.files.length > 0) {
                anuncio.foto = this.element.elements.file.files[0];
            }
            this.publish(this.events.START_LOADING);
            try {
                await dataService.saveAnuncio(anuncio);
                window.location.href='/?mensaje=anuncioOK';
            } catch (error) {
                this.publish(this.events.ERROR, error)
            } finally {
                this.publish(this.events.FINISH_LOADING);
            }
        });
    
    }
}