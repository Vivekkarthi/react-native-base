import React from 'react';
import {View, Modal, ActivityIndicator, Dimensions} from 'react-native';
import LottieView from 'lottie-react-native';
const {height, width} = Dimensions.get('window');

const Loader = () => {
  return (
    <Modal transparent={true} visible={true} style={{zIndex: 1100}}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'space-around',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000,
        }}>
        {/* <ActivityIndicator animating color="#f17316" size="large" /> */}
        <LottieView
          source={require('../../assets/loading-box.json')}
          autoPlay
          loop
          style={{
            justifyContent: 'center',
            alignSelf: 'center',
            width: '100%',
            // height: '50%',
          }}
          resizeMode="cover"
        />
      </View>
    </Modal>
  );
};

export {Loader};
