import React from 'react';
import ChartView from 'react-native-highcharts';

export class Graph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        var Highcharts='Highcharts';
        var conf={
                chart: {
                    type: this.props.type,
                    marginRight: 10,
                },
                title: {
                    text: this.props.name
                },
                xAxis: {
                    type: 'datetime',
                    tickPixelInterval: 150
                },
                yAxis: {
                    /*title: {
                        text: 'Value'
                    },*/
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    formatter: function () {
                        return '<b>' + this.series.name + '</b><br/>' +
                            Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                            Highcharts.numberFormat(this.y, 2);
                    }
                },
                legend: {
                    enabled: this.props.legend
                },
                exporting: {
                    enabled: true
                },
                series: [
                    /*name: 'Random data',
                    /*data: (function () {
                        // generate an array of random data
                        var data = [],
                            time = (new Date()).getTime(),
                            i;
    
                        for (i = -19; i <= 0; i += 1) {
                            data.push({
                                x: time + i * 1000,
                                y: Math.random()
                            });
                        }
                        return data;
                    }())*/
                    {
                        name: 'Installation',
                        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
                    }, {
                        name: 'Manufacturing',
                        data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
                    }, {
                        name: 'Sales & Distribution',
                        data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
                    }, {
                        name: 'Project Development',
                        data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
                    }, {
                        name: 'Other',
                        data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
                    }
                ],
            };
    
        const options = {
            global: {
                useUTC: true
            },
            lang: {
                decimalPoint: ',',
                thousandsSep: '.'
            }
        };
    
        return (
            <ChartView
                style={{height:300, flex: 1}}
                originWhitelist={['']}
                config={conf}
                options={options}>
            </ChartView>
        );
    }
}