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
    }

    getDataFull = async() => {
        datas = await this.getCurrentDatas();
        if (datas.toProcess === true)
        {
            lines_persave = 1000;
            nbIdx = datas.lineNumber / 1000;
            listCols = [];
            allDates = [];
            for (cols of datas.columns)
            {
                obj = {};
                obj.name = cols;
                obj.datas = [];
                if (cols != 'CREATEDATE') listCols.push(obj);
            }
            for (j = 0; j < nbIdx; j++)
            {
                datasLines = JSON.parse(await AsyncStorage.getItem(datas.storageIndex + '_line_' + j))
                if (datasLines != null) 
                {
                    for (lines of datasLines.lines)
                    {
                        i = 1;
                        allDates.push(lines[0]);
                        for (cols of listCols)
                        {
                            if (typeof(lines[i] !== 'undefined'))
                            {
                                if (lines[i] === ' ')
                                {
                                    lines[i] = 0;
                                }
                                cols.datas.push(parseFloat(lines[i]));
                            }
                            i++;
                        }
                    }
                }
            }
            res = JSON.stringify({ cols : listCols, dateList : allDates })
            await AsyncStorage.setItem(datas.storageIndex + "_avg_full", res);
        }
    }

    getDataRose = async() => {
        datas = await this.getCurrentDatas();
        allreadyGet = await AsyncStorage.getItem(datas.storageIndex + "_rose");
        if (datas.toProcess === true && allreadyGet == null)
        {
            lines_persave = 1000;
            nbIdx = datas.lineNumber / 1000;
            listDir = [{ nb : 8, total : 0, posLength : 360 / 8, hits : []}, { nb : 16, total : 0,  posLength : 360 / 16, hits : []},{ nb : 32, total : 0,  posLength : 360 / 32, hits : []}];
            i = 0;
            idx = i;
            for (cols of datas.columns)
            {
                if (cols === 'LOCAL_WD_2MIN_MNM')
                {
                    idx = i;
                    break;
                }
                i++
            }
            for (j = 0; j < nbIdx; j++)
            {
                datasLines = JSON.parse(await AsyncStorage.getItem(datas.storageIndex + '_line_' + j))
                if (datasLines != null) 
                {
                    for (lines of datasLines.lines)
                    {
                        if (typeof(lines[idx]) != 'undefined')
                        {
                            if (lines[i] === ' ')
                            {
                                lines[i] = 0;
                            }
                            for (dir of listDir)
                            {
                                rosePos = parseInt(lines[idx] / dir.posLength);
                                if (typeof(dir.hits[rosePos]) !== 'undefined') dir.hits[rosePos]++;
                                else dir.hits[rosePos] = 1;
                                dir.total++;
                            }
                        }   
                    }
                }
            }
            //console.log(listDir);
            for (dir of listDir)
            {
                for (i = 0; i < dir.nb; i++)
                {
                    if (typeof(dir.hits[i] !== 'undefined')) dir.hits[i] = (parseInt(dir.hits[i]) / parseInt(dir.total)) * 100;
                }
            }
            res = JSON.stringify(listDir);
            await AsyncStorage.setItem(datas.storageIndex + "_rose", res);
        }
    }
}