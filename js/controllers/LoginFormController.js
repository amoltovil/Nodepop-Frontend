import dataService from '../services/DataService.js';
import BaseController from './BaseController.js';

export default class LoginFormController extends BaseController {

    constructor(element){
        super(element);
        this.attachEventListener(); // ponemos el manejador de eventos
    }

    attachEventListener(){
        this.element.addEventListener('submit', async (event)=> {
            event.preventDefault(); // evita que se envíe el formulario (comportamiento por defecto)
            
            console.log('SE ENVIA EL FORMULARIO DE LOGIN', this.element.elements); 
            // tendremos que recuperar los datos del formulario para enviarlos al backend
            const user = {
                username : this.element.elements.email.value, 
                password : this.element.elements.password.value
            };
            console.log('SE ENVIA EL FORMULARIO DE LOGIN CON LOS DATOS DEL USUARIO', user); 
            
            this.publish(this.events.START_LOADING);
             try {
                const data = await dataService.login(user);
                console.log('USUARIO LOGGEADO', data.accessToken);   
                dataService.saveToken(data.accessToken);
                // TODO: MEJORAR el control de los query params
                let next ='/'; // página principal
                const queryParams = window.location.search.replace('?',''); // ?next=otrapagina -> next=otrapagina
                const queryParamsParts = queryParams.split('=');
                if (queryParamsParts.length >= 2 && queryParamsParts[0]==='next') {
                    next = queryParamsParts[1];
                }
                window.location.href = next; 
                //alert('Usuario registrado correctamente');
                this.publish(this.events.SUCCESS, 'Usuario loggeado correctamente');    
                this.publish(this.events.SHOW_LOGOUT);
              } catch (error) {
                    console.error('NO SE HA REGISTRADO EL USUARIO CORRECTAMENTE', error);    
                    this.publish(this.events.ERROR, error);     
                    this.publish(this.events.HIDE_LOGOUT);
                } finally { 
                   this.publish(this.events.FINISH_LOADING);
                }
        });

        // Validación del Formulario
        this.element.querySelectorAll('input').forEach(input => {
            
            const button = this.element.querySelector('button');

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
    }

    parseQueryParams(){
        this.queryParams= {};
        const queryParams = window.location.search.replace('?',''); // ?next=otrapagina -> next=otrapagina
        queryParams.split('&').forEach(keyAndValue => {
            const parts = keyAndValue.split('=');
            if (parts.length === 2 ) {
                const [key, value] = parts;
                this.queryParams[key] =value;
            }
        })
    }


}
