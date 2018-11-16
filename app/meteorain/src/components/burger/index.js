import React from 'react';
import { Button } from 'react-native';

export default class Burger extends React.Component {
  constructor(props) {
    this.openSidePanel = this.openSidePanel.bind(this)
  }

  getChildContext() {
    return {
      openSidePanel: this.openSidePanel
    };
  }

  toggleSidePanel() {
    this.refs.drawer.openDrawer();
  }

  render() {
    return (
      <Button
        onPress={this.toggleSidePanel()}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    );
  }
}