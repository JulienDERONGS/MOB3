import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Text, View, Button } from 'react-native';
import { styles } from './src/styles/styles';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

const activeTintLabelColor = '#005555';
const inactiveTintLabelColor = '#808080';

class UploadScreen extends React.Component {
  render() {
    return (
      <View style={styles.upload}>
        <Text>Upload Screen</Text>
      </View>
    );
  }
}

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

const BottomNav = createMaterialBottomTabNavigator(
  {
    Upload: {
      screen: UploadScreen,
      navigationOptions: {
        tabBarLabel: <Text style={{ fontSize: 10, color: activeTintLabelColor }}> Uploaded files </Text>,
        tabBarIcon: ({ focused }) => (
          <MaterialCommunityIcons name='format-list-bulleted' color={focused ? activeTintLabelColor : inactiveTintLabelColor} size={24} />
        )
      }
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
    shifting: true,
    initialRouteName: 'Upload',
    //activeColor: '#f0edf6',
    //inactiveColor: '#3e2465',
    activeTintColor: '#ffffff',
    inactiveTintColor: '#2f2f2f2f',
    barStyle: { backgroundColor: '#694fad' },

    /*navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Upload') {
          iconName = `add-circle-outline'${focused ? '' : '-outline'}`;
        } else if (routeName === 'Settings') {
          iconName = `ios-options${focused ? '' : '-outline'}`;
        }
        return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
      },
    }),*/
  }
);

export default class App extends React.Component {
  render() {
    return <BottomNav />;
  }
}