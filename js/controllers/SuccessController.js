import { successView } from '../views.js';
import BaseController from './BaseController.js';

export default class SuccessController extends BaseController {

    constructor(element) {
        super(element);
        this.subscribe(this.events.SUCCESS, (message)=>{
            this.showMessage(message);
        })
    }

    showMessage(Message) {
        this.element.innerHTML = successView(Message);
        this.element.classList.remove('hidden');
        this.element.addEventListener('click', (event)=>{
            // se borra si clickamos sobre global-success y si clickamos sobre el botón de cerrar el mensaje
            if (event.target == this.element || event.target.classList.contains('delete')) {
                this.element.classList.add('hidden');
            }       
        });

        document.body.addEventListener('keydown', (event)=>{
            
             if (event.keyCode === 27 || event.key ==="Escape") {
                 this.element.classList.add('hidden');
             }
        });
    }
}