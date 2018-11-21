import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Data from './src/helper/GraphData';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { styles } from './src/styles/styles';
import { navBar } from './src/styles/navBar';
import { Graph } from './src/components/Graph';
import { AsyncStorage, FlatList, Text, View, Button } from 'react-native';
import { DocumentPicker, FileSystem } from 'expo'

const GraphData = new Data;

class UploadScreen extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      keys : [],
      current : "",
    };
    this.getDocuments()
    this.getCurrentElement()
    //AsyncStorage.clear()
  }
  render() {
    return (
      <View style={styles.upload}>
        <Text>Upload Screen</Text>
        <Button 
          title="Upload a new file"
          onPress={ this.pickDocument }
        />
        <Text> Current Element is : { this.state.current }</Text>
        <FlatList
          data={this.state.keys}
          renderItem={({item}) => <Button title = { item.key } onPress = { async() => { AsyncStorage.setItem('selected', item.key); this.getCurrentElement(); } } />}
        />
      </View>
    );
  }

  pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});

    if (result.type == 'cancel') {
      alert("Aucun Fichier n'a été renseigné !");
    }
    else {
      //chaine du contenu récupéré
      contentToUp = await FileSystem.readAsStringAsync(result.uri);
      contentToUp = contentToUp.split("\n")
      
      //infos a sauver dans le async storage
      var InfosSaved = {};
      
      InfosSaved.stationName = contentToUp[0];
      InfosSaved.lineNumber = contentToUp.length - 2;
      InfosSaved.columns = contentToUp[1].split("\t");
      InfosSaved.toProcess = true;
      InfosSaved.storageIndex = contentToUp[2].split("\t")[0].replace(" ", "_").split("_")[0];
      InfosJson = JSON.stringify(InfosSaved);

      AsyncStorage.setItem(InfosSaved.storageIndex, InfosJson);
      line_persaves = 1000;
      nbIndexes = parseInt(InfosSaved.lineNumber / line_persaves);
      limit = 0;
      for (h = 0; h < nbIndexes; h++) 
      {
        limit = (h + 1) * line_persaves + 2;
        iIdx = limit - line_persaves;
        if (limit + line_persaves > InfosSaved.lineNumber)
        {
          limit = InfosSaved.lineNumber;
        }

        dataLines = {}
        dataLines.storageBaseIdx = InfosSaved.storageIndex;
        dataLines.storageCurrentIdx = InfosSaved.storageIndex + '_line_' + h;
        dataLines.lines = [];
        for (i = iIdx; i < limit; i++)
        {
          dataLines.lines.push(contentToUp[i].split("\t"));
        }
        InfosJson = JSON.stringify(dataLines);
        AsyncStorage.setItem(dataLines.storageCurrentIdx, dataLines.storageCurrentIdx);
      }
    }
    this.getDocuments()
  }

  getDocuments = async() => {
    keys = await AsyncStorage.getAllKeys();
    ret = [];
    for (Fkey of keys)
    {
      if (Fkey.indexOf("_line_") < 0 && Fkey != 'selected')
      {
        ret.push({key : Fkey});
      }
    }
    this.setState({keys : ret});
  }

  getCurrentElement = async() =>  {
    cur = await AsyncStorage.getItem('selected');
    console.log(cur);
    this.setState( { current : cur });
  }
}

class GraphDayScreen extends React.Component {
  render() {
    return (
      <View style={styles.graph}>
        <Text>Day informations</Text>
      </View>
    );
  }
}

class GraphAverageScreen extends React.Component {
  render() {
    return (
      <View style={styles.graph}>
        <Graph
          graphData={GraphData.getData('average')}
          type='spline'
          name='Average by hour'
          legend={true}
        />
      </View>
    );
  }
}

class GraphFullScreen extends React.Component {
  render() {
    return (
      <View style={styles.graph}>
        <Graph
          graphData={GraphData.getData('full')}
          type='spline'
          name='Full data'
          legend={true}
        />
      </View>
    );
  }
}

class GraphRoseScreen extends React.Component {
  render() {
    return (
      <View style={styles.graph}>
        <Graph
          graphData={GraphData.getData('rose')}
          type='spline'
          name='Wind rose'
          legend={true}
        />
      </View>
    );
  }
}

const BottomNav = createMaterialBottomTabNavigator(
  {
    Upload: {
      screen: UploadScreen,
      navigationOptions: {
        tabBarLabel: <Text style={{ fontSize: 10, color: navBar.activeColor }}> Uploaded files </Text>,
        tabBarIcon: ({ focused }) => (
          <MaterialCommunityIcons name='file-upload-outline' color={focused ? navBar.activeColor : navBar.inactiveColor} size={24} />
        )
      }
    },
    Day: {
      screen: GraphDayScreen,
      navigationOptions: {
        tabBarLabel: <Text style={{ fontSize: 10, color: navBar.activeColor }}> Day informations </Text>,
        tabBarIcon: ({ focused }) => (
          <MaterialCommunityIcons name='grid' color={focused ? navBar.activeColor : navBar.inactiveColor} size={24} />
        )
      }
    },
    Average: {
      screen: GraphAverageScreen,
      navigationOptions: {
        tabBarLabel: <Text style={{ fontSize: 10, color: navBar.activeColor }}> Average by hour </Text>,
        tabBarIcon: ({ focused }) => (
          <MaterialCommunityIcons name='tilde' color={focused ? navBar.activeColor : navBar.inactiveColor} size={24} />
        )
      }
    },
    Full: {
      screen: GraphFullScreen,
      navigationOptions: {
        tabBarLabel: <Text style={{ fontSize: 10, color: navBar.activeColor }}> Full data </Text>,
        tabBarIcon: ({ focused }) => (
          <MaterialCommunityIcons name='filter-outline' color={focused ? navBar.activeColor : navBar.inactiveColor} size={24} />
        )
      }
    },
    Rose: {
      screen: GraphRoseScreen,
      navigationOptions: {
        tabBarLabel: <Text style={{ fontSize: 10, color: navBar.activeColor }}> Wind rose </Text>,
        tabBarIcon: ({ focused }) => (
          <MaterialCommunityIcons name='weather-windy' color={focused ? navBar.activeColor : navBar.inactiveColor} size={24} />
        )
      }
    },
  },
  {
    shifting: true,
    initialRouteName: 'Average',
    barStyle: { backgroundColor: '#9e9a75' },
  }
);

export default class App extends React.Component {
  render() {
    return <BottomNav />;
  }
}