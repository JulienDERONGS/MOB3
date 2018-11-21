import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { AsyncStorage, FlatList, Text, View, Button } from 'react-native';
import { styles } from './src/styles/styles';
import { DocumentPicker, FileSystem } from 'expo'

class GraphDayScreen extends React.Component {
  render() {
    return (
      <View style={styles.graph}>
        <Text>Day informations</Text>
        <Button
          title="View Average"
          onPress={() => this.props.navigation.navigate('Average')}
        />
      </View>
    );
  }
}

class GraphAverageScreen extends React.Component {
  render() {
    return (
      <View style={styles.graph}>
        <Text>Average / hour</Text>
        <Button
          title="View Full"
          onPress={() => this.props.navigation.navigate('Full')}
        />
      </View>
    );
  }
}

class GraphFullScreen extends React.Component {
  render() {
    return (
      <View style={styles.graph}>
        <Text>Full Data</Text>
        <Button
          title="View Rose"
          onPress={() => this.props.navigation.navigate('Rose')}
        />
      </View>
    );
  }
}

class GraphRoseScreen extends React.Component {
  render() {
    return (
      <View style={styles.graph}>
        <Text>Wind Rose</Text>
        <Button
          title="View uploaded files!"
          onPress={() => this.props.navigation.navigate('Upload')}
        />
      </View>
    );
  }
}

class UploadScreen extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      keys : [],
    };
    this.getDocuments()
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
        <FlatList
          data={this.state.keys}
          renderItem={({item}) => <Text>{item.key}</Text>}
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
      if (Fkey.indexOf("_line_") < 0)
      {
        ret.push({key : (new Date(Fkey)).toLocaleDateString() });
      }
    }
    console.log(ret)
    this.setState({keys : ret});
  }
}

const BottomNav = createMaterialBottomTabNavigator(
  {
    Upload: {
      screen: UploadScreen,
    },
    Day: {
      screen: GraphDayScreen,
    },
    Average: {
      screen: GraphAverageScreen,
    },
    Full: {
      screen: GraphFullScreen,
    },
    Rose: {
      screen: GraphRoseScreen,
    },
  },
  {
    initialRouteName: 'Upload',
    activeColor: '#f0edf6',
    inactiveColor: '#3e2465',
    barStyle: { backgroundColor: '#694fad' },
  }
);

export default class App extends React.Component {
  render() {
    return <BottomNav />;
  }
}