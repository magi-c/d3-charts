import style from "./scss/main.scss";
import Controller from "./js/controller/Controller.js";
import Model from "./js/model/Model.js";
import View from "./js/view/View.js";

const model = new Model('data.json');
const view = new View();
const controller = new Controller(model, view);
controller.init();