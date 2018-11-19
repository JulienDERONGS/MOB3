import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Text, View, Button } from 'react-native';
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
  render() {
    return (
      <View style={styles.upload}>
        <Text>Upload Screen</Text>
        <Button 
          title="Upload a new file"
          onPress={ this.pickDocument }
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
      var InfosSaved = {};
      contentToUp = await FileSystem.readAsStringAsync(result.uri);
      contentToUp = contentToUp.split("\n")
      InfosSaved.stationName = contentToUp[0];
      InfosSaved.lineNumber = contentToUp.length - 2;
      InfosSaved.columns = contentToUp[1].split("\t");
      InfosSaved.lines = [];
      for (i = 2; i < contentToUp.length; i++)
      {
        lineIdx = i - 2;
        temp = contentToUp[i].split("\t");
        InfosSaved.lines[lineIdx] = temp;
      }
      console.log(InfosSaved.lines[0]);
    }
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