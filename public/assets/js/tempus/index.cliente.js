let xAxis;
let series;
let chart;

let yRenderer;
let yAxis;

console.log(user)

console.log(am5xy)

let root;

function t() {

    let data = []

    //Teste
    user.instituicao.utentes.map(utente => {


        data.push({
            // Set data
            name: utente.nome,
            value: 3, // Number(utente.f.split(',')[12]),
            bulletSettings: {
                src: utente.img ? utente.img.url : "/assets/img/logo.png"
            }
        })
        console.log(utente)

    })
    xAxis.data.setAll(data);
    series.data.setAll(data);






    document.getElementById('titulo').innerHTML = "Tempo de Utilização (min)"

}

function d() {
    let data = []

    //Teste
    user.instituicao.utentes.map(utente => {


        data.push({
            // Set data
            name: utente.nome,
            value: parseFloat(utente.f.split(":")[1].split(',')[1]),
            bulletSettings: {
                src: utente.img ? utente.img[0].url : "/assets/img/logo.png"
            }
        })
        console.log(utente, utente.f.split(':')[1].split(','))

    })
    xAxis.data.setAll(data);
    series.data.setAll(data);

    document.getElementById('titulo').innerHTML = "Taxa de acerto (%)"





}




function tempo() {
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    let root = am5.Root.new("chartdiv");

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
        am5themes_Animated.new(root)
    ]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none"
    }));

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xRenderer = am5xy.AxisRendererX.new(root, {
        minGridDistance: 30
    });

    xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
        maxDeviation: 0,
        categoryField: "name",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {})
    }));

    xRenderer.grid.template.set("visible", false);

    yRenderer = am5xy.AxisRendererY.new(root, {});
    yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        maxDeviation: 0,
        min: 0,
        max: 80,
        extraMax: 0.1,
        renderer: yRenderer
    }));

    yRenderer.grid.template.setAll({
        strokeDasharray: [2, 2]
    });

    // Create series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    series = chart.series.push(am5xy.ColumnSeries.new(root, {
        name: "Series 1",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        sequencedInterpolation: true,
        categoryXField: "name",
        tooltip: am5.Tooltip.new(root, {
            dy: -25,
            labelText: "{valueY}"
        })
    }));


    series.columns.template.setAll({
        cornerRadiusTL: 5,
        cornerRadiusTR: 5
    });

    series.columns.template.adapters.add("fill", (fill, target) => {
        return chart.get("colors").getIndex(series.columns.indexOf(target));
    });

    series.columns.template.adapters.add("stroke", (stroke, target) => {
        return chart.get("colors").getIndex(series.columns.indexOf(target));
    });

    let data = []

    //Teste
    user.instituicao.utentes.map(utente => {


        data.push({
            // Set data
            name: utente.nome,
            value: Number(utente.f.split(":")[1].split(',')[0]),
            bulletSettings: {
                src: utente.img ? utente.img[0].url : "/assets/img/logo.png"
            }
        })

        console.log(utente)

    })

    series.bullets.push(function() {
        return am5.Bullet.new(root, {
            locationY: 1,
            sprite: am5.Picture.new(root, {
                templateField: "bulletSettings",
                width: 50,
                height: 50,
                centerX: am5.p50,
                centerY: am5.p50,
                shadowColor: am5.color(0x000000),
                shadowBlur: 4,
                shadowOffsetX: 4,
                shadowOffsetY: 4,
                shadowOpacity: 0.6
            })
        });
    });

    xAxis.data.setAll(data);
    series.data.setAll(data);

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(100);
    chart.appear(100, 0);

}

am5.ready(function() {

    tempo()
        // desempenho()
}); // end am5.ready()
