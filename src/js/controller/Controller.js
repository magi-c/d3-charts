import Model from '../model/Model.js';
import View from '../view/View.js';

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    init() {
        const dataUrl = 'data.json';
        this.model.getFormattedData(dataUrl)
            .then((data) => this.view.init(data));   
    }
}

export default Controller;