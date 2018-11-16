import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Text, View, Button } from 'react-native';
import { styles } from './src/styles/styles';

/*export default class App extends React.Component {
  render() {
    return (
      <View styles={styles.main}>
        <Burger/>
        <Text>Pouet</Text>
      </View>
    );
  }
}*/

class GraphScreen extends React.Component {
  render() {
    return (
      <View style={styles.graph}>
        <Text>Graph Screen</Text>
        <Button
          title="View uploaded files"
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
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Graph: GraphScreen,
    Upload: UploadScreen,
  },
  {
    initialRouteName: 'Graph',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}