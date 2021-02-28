import BaseController from './BaseController.js';

export default class PageController extends BaseController {

    constructor(element){
        super(element);
        this.element.addEventListener('click', event =>{
            //debugger;
            console.log('click en el elemento', event.toElement);
            console.log('EVENT TARGET', event.target);
            
            if (event.target.classList.contains('next')) {
                let query = '&_start=10';
                this.publish(this.events.PAGINATION, query);
            }
            if (event.target.classList.contains('previous')) {
                let query = '&_start=1';
                this.publish(this.events.PAGINATION, query);
            }
            

        });
    }
}