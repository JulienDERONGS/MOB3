import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Text, View, Button } from 'react-native';
import { styles } from './src/styles/styles';


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
          onPress={() => this.props.navigation.push('Upload')}
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
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Day: GraphDayScreen,
    Average: GraphAverageScreen,
    Full: GraphFullScreen,
    Rose: GraphRoseScreen,
    Upload: UploadScreen,
  },
  {
    initialRouteName: 'Day',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}