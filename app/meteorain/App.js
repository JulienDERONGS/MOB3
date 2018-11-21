import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Data from './src/helper/GraphData';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Text, View, Button } from 'react-native';
import { styles } from './src/styles/styles';
import { navBar } from './src/styles/navBar';
import { Graph } from './src/components/Graph';

const GraphData = new Data;

class UploadScreen extends React.Component {
  render() {
    return (
      <View style={styles.upload}>
        <Button
          title='Upload a file'
          onPress={() => this.props.navigation.navigate('TODO')}
        />
      </View>
    );
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