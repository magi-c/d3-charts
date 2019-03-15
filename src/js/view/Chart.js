import * as d3 from "d3";

class Chart {

  constructor(data) {
    this.chartData = data;
    this.width = 330;
    this.height = 330;
    this.radius = Math.min(this.width, this.height) / 2;
    this.colores = ["#3d691a", "#8bd446", "#294d61", "#6cc9df", "#b75824", "#f0c12c", "#109618", "#990099", "#0099c6"];
    this.chartArea;
    this.index = data.index * 2;
    this.totalSum = d3.sum(this.chartData.values);
  }

  init() {
    this.chartArea = d3.select(".slider__slides")
      .append("li")
      .append("svg")
      .attr({ "width": this.width, "height": this.height })
      .append("g")
      .attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")")

    this.appendLines();
    this.createDonutChart();
    this.createLinearChart();
    this.appendText();
  }

  appendLines() {
    const _this = this;
    const varticalLineData = {
      "className": "donut-chart_diameters",
      "x1": this.width / 2,
      "x2": this.width / 2,
      "y1": 50,
      "y2": (this.radius - 25) * 2,
      "transform": "translate(" + this.width / (-2) + "," + this.height / (-2) + ")",
    }
    const horizontalLineData = {
      "className": "donut-chart_diameters",
      "x1": 50,
      "x2": (_this.radius - 25) * 2,
      "y1": this.height / 2,
      "y2": this.height / 2,
      "transform": "translate(" + this.width / (-2) + "," + this.height / (-2) + ")",
    }

    function appendLine(line) {
      _this.chartArea
        .append("line")
        .attr({
          "class": line.className,
          "x1": line.x1,
          "x2": line.x2,
          "y1": line.y1,
          "y2": line.y2,
          "transform": line.transform
        });
    }

    appendLine(varticalLineData);
    appendLine(horizontalLineData);
  }

  createDonutChart() {
    const _this = this;
    const catValues = [];

    const pie = d3.layout.pie()
      .value((d) => { return +d; })
      .sort(null);

    const arc = d3.svg.arc()
      .innerRadius(this.radius - 60)
      .outerRadius(this.radius - 50);

    function countPercentValues() {
      for (let i = 0; i < _this.chartData.catPercentagesArr.length; i++) {
        catValues.push(_this.totalSum * _this.chartData.catPercentagesArr[i] / 100);
      }
    }

    function render() {
      const path = _this.chartArea.datum(catValues).selectAll("path")
        .data(pie)
        .enter()
        .append("path")
        .attr({
          "fill": (d, i) => _this.colores[i + _this.index],
          "d": arc
        });
    }
    countPercentValues();
    render();

  }
  createLinearChart() {
    const _this = this;
    const width = 200, height = 200;

    const x = d3.scale.linear()
      .range([0, width])
      .domain([0, this.chartData.values.length - 1]);

    const y = d3.scale.linear()
      .range([height / 2 - 20, 0])
      .domain([d3.min(this.chartData.values), d3.max(this.chartData.values)]);

    const line = d3.svg.area()
      .x((d, i) => x(i))
      .y1((d) => y(d))
      .y0(height)
      .interpolate('basis-open');

    function renderChartBg() {
      _this.chartArea
        .append("circle")
        .attr({
          "cx": _this.width / 2,
          "cy": _this.height / 2,
          "fill": "#fff",
          "r": 100,
          "transform": "translate(" + _this.width / (-2) + "," + _this.height / (-2) + ")"
        });
    }
    function renderChart() {
      _this.chartArea
        .append("foreignObject")
        .attr("class", "linear-chart__overlay")
        .append("svg")
        .attr({
          "height": height,
          "width": width,
          "viewBox": `0 -110 ${height} ${width}`
        })
        .append("path")
        .datum(_this.chartData.values)
        .attr({
          "class": "linear-chart__area",
          "fill": (d, i) => _this.colores[i + _this.index],
          "stroke": (d, i) => _this.colores[i + _this.index],
          "d": line
        });
    }

    renderChartBg();
    renderChart();
  }
  appendText() {
    const _this = this;

    function renderChartCategories() {
      _this.chartArea.selectAll("text")
        .data(_this.chartData.catData)
        .enter()
        .append("g")
        .append("text")
        .attr({
          "class": "donut-chart__text--category",
          "fill": (d, i) => _this.colores[i + _this.index],
          "y": "135px",
          "x": (d, i) => i * -165 || 120
        })
        .append("tspan")
        .text((d) => {
          return d.cat;
        })
    }

    function renderChartDescriptionPercent() {
      _this.chartArea.selectAll("text")
        .append("tspan")
        .attr({
          "class": "donut-chart__text--percent",
          "y": "160px",
          "x": (d, i) => i * -165 || 60
        })
        .text((d) => {
          return `${d.percent}% `;
        })
    }

    function renderChartDescriptionValue() {
      _this.chartArea.selectAll("text")
        .append("tspan")
        .attr({
          "class": "donut-chart__text--catValue",
          "y": "160px",
        })
        .text((d) => {
          return `${_this.totalSum * d.percent / 100}  ${d.unit}`;
        })
    }

    function renderChartTitle() {
      _this.chartArea.append("text")
        .attr("dy", "-20px")
        .attr("class", "donut-chart__title")
        .text((d) => { return `${_this.chartData.label}`; });
    }

    function renderChartSubtitle() {
      _this.chartArea.append("text")
        .attr("dy", "7px")
        .attr("class", "donut-chart__subtitle")
        .text((d) => `${_this.totalSum}${_this.chartData.unit}`);
    }
    renderChartCategories();
    renderChartDescriptionPercent();
    renderChartDescriptionValue();
    renderChartTitle();
    renderChartSubtitle();
  }
};

export default Chart;