import dataService from '../services/DataService.js';
import BaseController from './BaseController.js';

export default class NewAnuncioOrLoginController extends BaseController {

    constructor(element) {
        super(element);
        this.checkIfUserIsLogged();
    }

    async checkIfUserIsLogged() {
        const userIsLogged = await dataService.isUserLogged();
        if (userIsLogged) { // mostrar botón de nuevo anuncio
            const newAnuncioButton = this.element.querySelector('.new-anuncio-button');
            newAnuncioButton.classList.remove('is-hidden');

            const newLogOutButton = this.element.querySelector('.logout-button');
            newLogOutButton.classList.remove('is-hidden');
            
        } else { // mostrar botón de login o de registro
            const loginRegisterButtons = this.element.querySelector('.login-register-buttons');
            loginRegisterButtons.classList.remove('is-hidden');

            const newLogOutButton = this.element.querySelector('.logout-button');
            newLogOutButton.classList.add('is-hidden');
        }
    }

}