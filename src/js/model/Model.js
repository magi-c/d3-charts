class Model {
    constructor(url) {
        this.url = url;
    }
    getFormattedData() {
        return this.loadData()
            .then(this.formatData)

    }
    loadData() {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            const url = `${this.url}?nocache=${(new Date()).getTime()}`;
            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    if (this.response) {
                        const res = JSON.parse(this.response);
                        resolve(res);
                    }
                } else {
                    if (this.error) {
                        error(xhr);
                        reject();
                    }
                }
            };
            xhr.open("GET", url, true);
            xhr.send();
        });
    }
    formatData(data) {
        data.forEach((obj, index) => {
            obj.index = index;
            obj.catNamesArr = [];
            obj.catPercentagesArr = []
            Object.keys(obj.catData).forEach((key) => {
                obj.catNamesArr.push(obj.catData[key].cat);
                obj.catPercentagesArr.push(obj.catData[key].percent);
            });
        });
        return data;
    }
}
export default Model;