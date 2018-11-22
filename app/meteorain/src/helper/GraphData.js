import { AsyncStorage, } from 'react-native';
export default class GraphData {
    getCurrentDatas = async () => {
        cur = await AsyncStorage.getItem('selected');
        data = await AsyncStorage.getItem(cur);
        return JSON.parse(data)
    }
    getDataAverrage = async() => {
        datas = await this.getCurrentDatas();
        if (datas.toProcess === true)
        {
            lines_persave = 1000;
            nbIdx = datas.lineNumber / 1000;
            listCols = [];
            curHour = 0;
            for (cols of datas.columns)
            {
                obj = {};
                obj.name = cols;
                obj.dayMin = -1;
                obj.dayMax = -1;
                obj.dayAvg = -1;
                obj.length = 0;
                obj.hoursMin = [];
                obj.hoursMax = [];
                obj.hoursAvg = [];
                obj.hoursCount = [];
                if (cols != 'CREATEDATE') listCols.push(obj);
            }
            for (j = 0; j < nbIdx; j++)
            {
                datasLines = JSON.parse(await AsyncStorage.getItem(datas.storageIndex + '_line_' + j))
                if (datasLines != null) 
                {
                    for (lines of datasLines.lines)
                    {
                        dt = lines[0].split(" ")[1];
                        hour = parseInt(dt.split(":")[0]);
                        if (hour != curHour)
                        {
                            curHour = hour;
                        }
                        i = 1;
                        for (cols of listCols)
                        {
                            if (lines[i] === ' ')
                            {
                                lines[i] = 0;
                            }
                            lines[i] = parseFloat(lines[i])
                            if (cols.dayMin == -1 || cols.dayMin > lines[i])
                            {
                                cols.dayMin = lines[i];  
                            }
                            if (cols.dayMax == -1 || cols.dayMax < lines[i])
                            {
                                cols.dayMax = lines[i];
                            }
                            if (cols.dayAvg == -1)
                            {
                                cols.dayAvg = lines[i];
                                cols.length++; 
                            }
                            else
                            {
                                cols.dayAvg += lines[i];
                                cols.length++;
                            }
                            if (typeof(cols.hoursMin[curHour]) === 'undefined' || cols.hoursMin[curHour] == null)
                            {
                                cols.hoursMin[curHour] = lines[i];
                                cols.hoursMax[curHour] = lines[i];
                                cols.hoursAvg[curHour] = lines[i];
                                cols.hoursCount[curHour] = 1;
                            }
                            else if (typeof(lines[i]) !== 'undefined')
                            {
                                if (cols.hoursMin[curHour] == -1 || cols.hoursMin[curHour] > lines[i])
                                {
                                    cols.hoursMin[curHour] = lines[i];  
                                }
                                if (cols.hoursMax[curHour] == -1 || cols.hoursMax[curHour] < lines[i])
                                {
                                    cols.hoursMax[curHour] = lines[i];
                                }
                                cols.hoursAvg[curHour] += lines[i];
                                cols.hoursCount[curHour]++;
                            }
                            i++;
                        }
                    }
                }
            }
            for (cols of listCols)
            {
                if (cols.length > 0) cols.dayAvg = cols.dayAvg / cols.length;
                for (i = 0; i < cols.hoursCount.length; i++)
                {
                    if (cols.hoursCount[i] > 0) cols.hoursAvg[i] = cols.hoursAvg[i] / cols.hoursCount[i];
                }
            }
            await AsyncStorage.setItem(datas.storageIndex + "_avg_graph", JSON.stringify(listCols));
        }
        
        return [
            {
                name: 'Minimum Days',
                data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 300000]
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
        ]
    }

    getDataFull = async() => {
        return [
            {
                name: 'Installation',
                data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 10000]
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
        ]
    }

    getDataRose() {
        return [
            {
                name: 'Installation',
                data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 900000]
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
        ]
    }
}