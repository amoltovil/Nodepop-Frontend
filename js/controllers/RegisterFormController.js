import BaseController from './BaseController.js';
import dataService from '../services/DataService.js';

export default class RegisterFormController extends BaseController {

    constructor(element){
        super(element);
        this.attachEventListener(); // ponemos el manejador de eventos
    }

    async makePost(user) {
        const data = await dataService.registerUser(user);
        console.log('USUARIO REGISTRADO!', data)   
        //alert('Usuario registrado correctamente');
        this.publish(this.events.SUCCESS, 'Usuario registrado correctamente');    
        window.location.href='/login.html'; // redirige al usuario a la página login 
    }

    checkInputErrors() {
        // Validación del Formulario
        this.element.querySelectorAll('input').forEach(input => {
            const button = this.element.querySelector('button');
            // si el input es correcto, lo marco en verde o en rojo 
            if (input.validity.valid) {
                input.classList.add('is-success');
                input.classList.remove('is-danger');
            } else {
                input.classList.add('is-danger');
                input.classList.remove('is-success');
                console.error(input.validationMessage);
            }
            // valido si todo el formulario es ok para activar o desactivar el botón
            if (this.element.checkValidity()) {
                button.removeAttribute('disabled'); // activamos el botón
                //button.setAttribute('disabled', false) // es lo mismo habilita el botón
            } else {
                button.setAttribute('disabled', true); // desactivamos el botón
            }
            //console.log('ESTA ESCRIBIENDO', this.element.checkValidity());
        });
    }

    attachEventListener(){
        this.element.addEventListener('submit', async (event)=> {
            event.preventDefault(); // evita que se envíe el formulario (comportamiento por defecto)
            
            console.log('SE ENVIA EL FORMULARIO DE REGISTRO', this.element.elements); // HTMLfORMeLEMENT
            // tendremos que recuperar los datos del formulario para enviarlos al backend
            const user = {
                username : this.element.elements.email.value, 
                password : this.element.elements.password.value
            };
            console.log('SE ENVIA EL FORMULARIO DE REGISTRO', user); // HTMLfORMeLEMENT
            
            this.publish(this.events.START_LOADING);
             try {
                await this.makePost(user);
              } catch (error) {
                    console.error('NO SE HA REGISTRADO EL USUARIO CORRECTAMENTE', error);    
                    this.publish(this.events.ERROR, error);     
              } finally { 
                    this.publish(this.events.FINISH_LOADING);
              }
        });

        // Validación del Formulario
        this.element.querySelectorAll('input').forEach(input => {
            const button = this.element.querySelector('button');

            input.addEventListener('keyup', (event)=>{

                console.log('INPUT VALIDITY', input.validity);    
                this.checkInputErrors();
               
            });
        });

        // Validación de los campos de password
        this.element.querySelectorAll('input[type="password"]').forEach(input=>{
            const button = this.element.querySelector('button');
            input.addEventListener('keyup', (event)=>{
                const passInput = this.element.elements['password'];
                const passConfirmInput = this.element.elements['password-confirm'];
                if (passInput.value !== passConfirmInput.value) {
                    passInput.setCustomValidity('Las password no coinciden'); // marco el input como erróneo
                    passConfirmInput.setCustomValidity('Las password no coinciden');
                } else {
                    passInput.setCustomValidity(''); // el input es ok
                    passConfirmInput.setCustomValidity(''); // el input confirmado es ok
                }
                this.checkInputErrors();
            });
        })
    }

}
