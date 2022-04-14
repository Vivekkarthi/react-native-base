import React from 'react';
import {View, Modal, ActivityIndicator} from 'react-native';

const Loader = () => {
  return (
    <Modal transparent={true} visible={true} style={{zIndex: 1100}}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'space-around',
          backgroundColor: '#rgba(0, 0, 0, 0.5)',
          zIndex: 1000,
        }}>
        <ActivityIndicator animating color="#f17316" size="large" />
      </View>
    </Modal>
  );
};

export {Loader};
