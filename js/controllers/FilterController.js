import BaseController from './BaseController.js';

export default class FilterController extends BaseController {

    constructor(element){
        super(element);
        this.element.addEventListener('keyup', event =>{
            
            const query = this.element.value;
            this.publish(this.events.FILTER, query);

        });

        this.element.addEventListener('change', event =>{
            
            const query = this.element.value;
            this.publish(this.events.FILTER, query);

        });
    }
}