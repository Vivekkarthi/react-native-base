import React from 'react';
import {View, TouchableOpacity, Image, Text, Modal} from 'react-native';

const Network = () => {
  return (
    <View>
      <Modal visible={true} transparent={true}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            width: '100%',
            height: '100%',
          }}></View>
        <View
          style={{
            flex: 1,
            marginTop: 20,
          }}>
          <View style={{padding: 15}}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                backgroundColor: '#E3473E',
                borderRadius: 4,
                padding: 10,
                alignItems: 'center',
              }}>
              <Image
                style={{width: 20, height: 20}}
                source={require('../../assets/images/noconnection.png')}
              />
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Lato-Regular',
                  marginLeft: 10,
                }}>
                Looking for a network connection...
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export {Network};
