import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';

const Dots = ({selected}) => {
  let backgroundColor;

  backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

  return (
    <View
      style={{
        width: 6,
        height: 6,
        marginHorizontal: 3,
        backgroundColor,
      }}
    />
  );
};

const Skip = ({...props}) => (
  <TouchableOpacity style={{marginHorizontal: 10}} {...props}>
    <Text style={{fontSize: 16}}>Skip</Text>
  </TouchableOpacity>
);

const Next = ({...props}) => (
  <TouchableOpacity style={{marginHorizontal: 10}} {...props}>
    <Text style={{fontSize: 16}}>Next</Text>
  </TouchableOpacity>
);

const Done = ({...props}) => (
  <TouchableOpacity style={{marginHorizontal: 10}} {...props}>
    <Text style={{fontSize: 16}}>Done</Text>
  </TouchableOpacity>
);

const OnboardingScreen = ({navigation}) => {
  return (
    <Onboarding
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      DotComponent={Dots}
      onSkip={() => navigation.replace('Login')}
      onDone={() => navigation.navigate('Login')}
      pages={[
        {
          backgroundColor: '#a6e4d0',
          image: (
            <>
              <Image
                source={require('../../assets/images/icon.png')}
                style={{
                  alignSelf: 'center',
                  height: 150,
                  width: 280,
                }}
                resizeMode="stretch"
              />
              <Image
                style={{height: 330, width: 420}}
                source={{
                  uri: 'https://dbmobileapp.s3.us-west-1.amazonaws.com/images/db1.jpg',
                }}
              />
            </>
          ),
          title: "WORLD's No. 1 Package Delivery Box",
          subtitle: 'With Anti-Theft Alarm Protection.',
        },
        {
          backgroundColor: '#fdeb93',
          image: (
            <>
              <Image
                source={require('../../assets/images/icon.png')}
                style={{
                  alignSelf: 'center',
                  height: 150,
                  width: 280,
                }}
                resizeMode="stretch"
              />
              <Image
                style={{height: 330, width: 420}}
                source={{
                  uri: 'https://dbmobileapp.s3.us-west-1.amazonaws.com/images/db2.jpg',
                }}
              />
            </>
          ),
          title: 'Secured & Not Removable',
          subtitle: 'No More Stolen Packages Or Missed Deliveries.',
        },
        {
          backgroundColor: '#e9bcbe',
          image: (
            <>
              <Image
                source={require('../../assets/images/icon.png')}
                style={{
                  alignSelf: 'center',
                  height: 150,
                  width: 280,
                }}
                resizeMode="stretch"
              />
              <Image
                style={{height: 240, width: 420}}
                source={{
                  uri: 'https://dbmobileapp.s3.us-west-1.amazonaws.com/images/db3.jpg',
                }}
              />
            </>
          ),
          title: 'Weatherproof & Water Repellent',
          subtitle:
            'Made of premium High-Quality Water Repellent Polymer Material.',
        },
      ]}
    />
  );
};

export default OnboardingScreen;
