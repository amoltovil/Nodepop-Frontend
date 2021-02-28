import { errorView } from '../views.js';
import BaseController from './BaseController.js';

export default class ErrorController extends BaseController {

    constructor(element) {
        super(element);
        this.subscribe(this.events.ERROR, (error)=>{
            this.showError(error);
        })
    }
    showError(errorMessage) {
        this.element.innerHTML = errorView(errorMessage);
        this.element.classList.remove('hidden');
        this.element.addEventListener('click', (event)=>{
            console.log('CLICK PARA CERRAR', event);
            // se borra si clickamos sobre global-errors y si clickamos sobre el botón de cerrar el mensaje
            if (event.target == this.element || event.target.classList.contains('delete')) {
                this.element.classList.add('hidden');
            }
            
        });
        document.body.addEventListener('keydown', (event)=>{
            console.log('PULSA TECLA', event.key, event.keyCode);
             if (event.keyCode === 27 || event.key ==="Escape") {
                 this.element.classList.add('hidden');
             }
            
        });
    }
}