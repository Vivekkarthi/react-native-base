import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, Text} from 'react-native';
import {Button} from 'react-native-paper';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AppStatusBar from '../components/AppStatusBar';
import StaticBottomTabs from '../components/StaticBottomTabs';
import {COLORS} from '../constants';
import {Card} from 'react-native-paper';
import moment from 'moment';

const ContactScreen = ({navigation, route}) => {
  const [notifyDate] = useState(new Date());
  return (
    <>
      <SafeAreaView
        style={{flex: 1, backgroundColor: COLORS.background, padding: 8}}>
        <AppStatusBar colorPalete="WHITE" bg={COLORS.white} />
        <Ionicons
          name="ios-people-outline"
          size={23}
          color={COLORS.primary}
          style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'Lato-Regular',
              color: COLORS.primary,
            }}>
            {' '}
            Contact Us
          </Text>
        </Ionicons>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          <Button
            style={{margin: 5}}
            mode="contained"
            onPress={() => navigation.navigate('ContactDetails')}>
            Add
          </Button>
        </View>
        <Card style={{marginBottom: 5}}>
          <Card.Title
            title={moment(new Date(notifyDate)).format('MMMM DD, YYYY')}
            titleStyle={{fontSize: 18, alignSelf: 'center'}}
            subtitleStyle={{fontSize: 16, alignSelf: 'center'}}
            left={props => (
              <Ionicons
                name="arrow-back-circle-outline"
                size={30}
                onPress={() => {}}
              />
            )}
            right={props => (
              <Ionicons
                style={{paddingRight: 12}}
                name="arrow-forward-circle-outline"
                size={30}
                onPress={() => {}}
              />
            )}
          />
        </Card>
        <Card style={{backgroundColor: '#82d4ff', marginBottom: 5}}>
          <Card.Title title={'Billing'} titleStyle={{fontSize: 14}} />
        </Card>
        <Card style={{backgroundColor: '#c682ff', marginBottom: 5}}>
          <Card.Title title={'Technical Support'} titleStyle={{fontSize: 14}} />
        </Card>
        <Card style={{backgroundColor: '#ff8282', marginBottom: 5}}>
          <Card.Title title={'Others'} titleStyle={{fontSize: 14}} />
        </Card>
      </SafeAreaView>
      <StaticBottomTabs navigation={navigation} routeName={route.name} />
    </>
  );
};

export default ContactScreen;
