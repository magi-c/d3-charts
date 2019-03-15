import Chart from './Chart.js';

class View {
    init(data) {
        for (let i = 0; i < data.length; i++){
            this.createChart(data[i]);  
        }
    }
    createChart(singleData) {
        const chart = new Chart(singleData);
        chart.init();
    }
    initSlider() {
        //TODO add slider logic
    }
} 

export default View;  