/*
 just trace two graphics  one for battry status and anther for signal
 */
function traceCourbe(tabBattry, tabSignal) {
    $(function () {
        $('#graphics').highcharts({
            chart: {
                type: 'area'
            },
            title: {
                text: 'Batterie & signal'
            },
            xAxis: {
            },
            credits: {
                enabled: false
            },
            yAxis: {
                title: {
                    text: 'niveaux'
                }
            },
            series: [{
                    name: 'Signal(dB)',
                    data: tabSignal
                }, {
                    name: 'Batterie(%)',
                    data: tabBattry
                }]
        });
    });
}

function tracerDynamicCourbe() {
    $(function () {
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });

        $('#containerDynamicCourbe').highcharts({
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: function () {

                        // set  up the updating of the chart each second
                        var series = this.series[0];
                        var series2 = this.series[1];
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                    yBatt = getBatterieLevel(),
                                    ySig = getSignalDbm();
                            series.addPoint([x, yBatt], true, false);
                            series2.addPoint([x, ySig], true, false);
                        }, 1000);
                    }
                }
            },
            title: {
                text: 'Signal & Batterie = F(temps)'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Niveau'
                },
                plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + ': ' + Highcharts.numberFormat(this.y, 0) +
                            '</b><br/>' +
                            Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>';
                }
            },
            legend: {
                enabled: true
            },
            exporting: {
                enabled: false
            },
            series: [{
                    name: 'Batterie(%)',
                    data: (function () {
                        // generate an array of random data
                        var data = [],
                                time = (new Date()).getTime(),
                                i;

                        for (i = -1; i <= 0; i += 1) {
                            data.push({
                                x: time + i * 1000,
                                y: getBatterieLevel()
                            });
                        }
                        return data;
                    }())
                }
                , {
                    name: 'Signal(dB)',
                    data: (function () {
                        // generate an array of random data
                        var data = [],
                                time = (new Date()).getTime(),
                                i;

                        for (i = -1; i <= 0; i += 1) {
                            data.push({
                                x: time + i * 1000,
                                y: getSignalDbm()
                            });
                        }
                        return data;
                    }())
                }]
        });
    });
}