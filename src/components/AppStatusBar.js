import React from 'react';
import {StatusBar, Platform, View} from 'react-native';
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 35 : StatusBar.currentHeight;

const AppStatusBar = props => {
  switch (props.colorPalete) {
    case 'WHITE':
      return (
        <View
          style={Platform.OS === 'ios' ? {backgroundColor: '#F9F9F7'} : null}>
          <View style={{height: STATUSBAR_HEIGHT}}>
            <StatusBar
              translucent={true}
              animated={true}
              backgroundColor="#F9F9F7"
              barStyle="dark-content"
            />
          </View>
        </View>
      );

    case 'BLACK':
      return (
        <View
          style={Platform.OS === 'ios' ? {backgroundColor: '#161616'} : null}>
          <View style={{height: STATUSBAR_HEIGHT}}>
            <StatusBar
              translucent={true}
              animated={true}
              backgroundColor="#161616"
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
          <View style={{height: STATUSBAR_HEIGHT}}>
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
