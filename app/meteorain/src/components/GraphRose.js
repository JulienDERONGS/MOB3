import React from 'react';
import { AsyncStorage, } from 'react-native';
import ChartView from 'react-native-highcharts';
import Data from '../helper/GraphData';
 
var GraphData = new Data;

export class GraphRose extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories : [],
            graphData : {}
        }
        this.getSelectedDatas()
        this.getCategories()
    }

    getCategories = async() => {
        if (this.props.nbDir == 8)
        {
            this.setState({categories : ["N", "NE", "E", "SE", "S", "Sw", "w", "Nw"]})
        }
        if (this.props.nbDir == 16)
        {
            this.setState({categories : ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']})
        }
        if (this.props.nbDir == 32)
        {
            this.setState({categories : ['N', 'NNNE', 'NNE', 'NE', 'ENE', 'EENE', 'EEENE','E', 'EEESE', 'EESE', 'ESE', 'SE', 'SSE', 'SSSE', 'SSSSE', 'S', 'SSSSW', 'SSSW', 'SSW', 'SW', 'WSW', 'WWSW', 'WWWSW','W', 'WWNW', 'WNW', 'NW','NNW', 'NNNW', 'NNNNW']})
        }
    }
    render() {
       
        var Highcharts='Highcharts';
        
        console.log(this.state.categories)
        var conf={
                series: [{
                    data: this.state.graphData.series
                }],
                chart: {
                    polar: false,
                    type: 'column',
                    marginRight: 10,
                },
                title: {
                    text: this.props.name
                },
                xAxis: {
                    tickmarkPlacement: 'on',
                    categories : this.state.categories
                    
                },
                yAxis: {
                    min: 0,
                    endOnTick: false,
                    showLastLabel: true,
                    title: {
                        text: 'Frequency (%)'
                    },
                    labels: {
                        formatter: function () {
                            return this.value + '%';
                        }
                },
                    reversedStacks: false
                },
                tooltip: {
                    valueSuffix: '%'
                },
                legend: {
                    enabled: this.props.legend
                },
                exporting: {
                    enabled: true
                },
                plotOptions: {
                    series: {
                        stacking: 'normal',
                        shadow: false,
                        groupPadding: 0,
                        pointPlacement: 'on'
                    }
                }
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
    getSelectedDatas = async() => {
        await GraphData.getDataRose()
        cur   = await AsyncStorage.getItem('selected');
        data  = await AsyncStorage.getItem(cur);
        data  = JSON.parse(data);
        graph = await AsyncStorage.getItem(data.storageIndex + "_rose");
        fdata = [];
        cleanData = [];
        
        if (graph !== null)
        {
          data = JSON.parse(graph);
          for (i = 0; i < data.length; i++)
          {
            if (data[i].nb == this.props.nbDir) fdata = data[i].hits;
          }
        }
        for (i = 0; i < this.props.nbDir; i ++)
        {
            cleanData[i] = [i * (360 / this.props.nbDir), fdata[i]];
        }
        this.setState({ graphData : {  
          series : cleanData,
          nb : this.props.nbDir,
          length : 360 / this.props.nbDir }
        });
        console.log(this.state)
      }
}