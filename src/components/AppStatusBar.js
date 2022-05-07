import React from 'react';
import {StatusBar, Platform, View} from 'react-native';
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 35 : StatusBar.currentHeight;

const AppStatusBar = props => {
  switch (props.colorPalete) {
    case 'WHITE':
      return (
        <View
          style={Platform.OS === 'ios' ? {backgroundColor: props.bg} : null}>
          <View>
            <StatusBar
              translucent={true}
              animated={true}
              backgroundColor={props.bg}
              barStyle="dark-content"
            />
          </View>
        </View>
      );

    case 'BLACK':
      return (
        <View
          style={Platform.OS === 'ios' ? {backgroundColor: props.bg} : null}>
          <View>
            <StatusBar
              translucent={true}
              animated={true}
              backgroundColor={props.bg}
              barStyle="light-content"
            />
          </View>
        </View>
      );

    case 'TRANSPARENT':
      return (
        <View
          style={
            Platform.OS === 'ios' ? {backgroundColor: 'transparent'} : null
          }>
          <View>
            <StatusBar
              translucent={true}
              animated={true}
              backgroundColor="transparent"
              barStyle="dark-content"
            />
          </View>
        </View>
      );
    default:
      return null;
  }
};

export default AppStatusBar;
