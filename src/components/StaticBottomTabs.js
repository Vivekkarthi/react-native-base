import React from 'react';
import {View, Text, Pressable} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {COLORS} from '../constants';

function StaticBottomTabs({navigation, routeName}) {
  return (
    <View style={{bottom: 0}}>
      <View
        style={{
          flexDirection: 'row',
          // justifyContent: 'space-around',
          alignSelf: 'center',
          width: '100%',
          height: 50,
          backgroundColor: COLORS.primary,
        }}>
        <Pressable
          onPress={() => navigation.navigate('Settings')}
          style={{
            flexDirection: 'column',
            alignSelf: 'flex-end',
            width: '33.5%',
          }}>
          {({pressed}) => (
            <>
              <Feather
                name="settings"
                color={
                  pressed
                    ? '#f17012'
                    : routeName === 'Settings'
                    ? '#f17012'
                    : '#FFFFFF'
                }
                size={26}
                style={{textAlign: 'center', paddingBottom: 3}}
              />
              <Text
                style={{
                  fontSize: 10,
                  color: pressed
                    ? '#f17012'
                    : routeName === 'Settings'
                    ? '#f17012'
                    : '#FFFFFF',
                  textAlign: 'center',
                }}>
                Settings
              </Text>
            </>
          )}
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('HomeStack')}
          style={{
            flexDirection: 'column',
            alignSelf: 'flex-end',
            width: '33.5%',
          }}>
          {({pressed}) => (
            <>
              <Feather
                name="home"
                color={
                  pressed
                    ? '#f17012'
                    : routeName === 'Home'
                    ? '#f17012'
                    : '#FFFFFF'
                }
                size={26}
                style={{textAlign: 'center', paddingBottom: 3}}
              />
              <Text
                style={{
                  fontSize: 10,
                  color: pressed
                    ? '#f17012'
                    : routeName === 'Home'
                    ? '#f17012'
                    : '#FFFFFF',
                  textAlign: 'center',
                }}>
                Home
              </Text>
            </>
          )}
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('Camera')}
          style={{
            flexDirection: 'column',
            alignSelf: 'flex-end',
            width: '33.5%',
          }}>
          {({pressed}) => (
            <>
              <Feather
                name="camera"
                color={
                  pressed
                    ? '#f17012'
                    : routeName === 'Camera'
                    ? '#f17012'
                    : '#FFFFFF'
                }
                size={26}
                style={{textAlign: 'center', paddingBottom: 3}}
              />
              <Text
                style={{
                  fontSize: 10,
                  color: pressed
                    ? '#f17012'
                    : routeName === 'Camera'
                    ? '#f17012'
                    : '#FFFFFF',
                  textAlign: 'center',
                }}>
                Images
              </Text>
            </>
          )}
        </Pressable>
      </View>
    </View>
  );
}

export default StaticBottomTabs;
