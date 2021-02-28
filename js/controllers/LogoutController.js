import dataService from '../services/DataService.js';
import BaseController from './BaseController.js';

export default class LogoutController extends BaseController {

    constructor(element){
        super(element);
        this.attachEventListener(); 
        this.subscribe(this.events.SHOW_LOGOUT, () => {
            this.showLogOut();
        });
        this.subscribe(this.events.HIDE_LOGOUT, () => {
            this.hideLogOut();
        });
    }

    showLogOut() {
        console.log('entro en mostrar botón de logout')
        this.element.classList.remove('is-hidden');
    }

    hideLogOut() {
        console.log('entro en ocultar botón de logout')
        this.element.classList.add('is-hidden');
    }

    attachEventListener(){
        this.element.addEventListener('click', async (event)=> {
            console.log('entro en evento click de logout');
            this.publish(this.events.START_LOADING);
            try {
                await dataService.logOutUser();
                window.location.href='/';
            } catch (error) {
                this.publish(this.events.ERROR, error)
            } finally {
                this.publish(this.events.FINISH_LOADING);
            }
        });
    }  

} 