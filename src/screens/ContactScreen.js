import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, Text, FlatList} from 'react-native';
import {Avatar, Button} from 'react-native-paper';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AppStatusBar from '../components/AppStatusBar';
import {getColorCode, getTypeOfMsg} from '../utils/Handlers';
import StaticBottomTabs from '../components/StaticBottomTabs';
import {COLORS} from '../constants';
import {Card} from 'react-native-paper';
import moment from 'moment';
import styles from '../styles/AppStyles';

const ContactScreen = ({navigation, route}) => {
  const [notifyDate] = useState(new Date());
  const [supportType, setSupportType] = useState([
    {id: 1, name: 'Billing'},
    {id: 2, name: 'Technical Support'},
    {id: 3, name: 'Others'},
  ]);
  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: COLORS.background}}>
        <View style={styles.MainContainer}>
          <AppStatusBar colorPalete="WHITE" bg={COLORS.white} />
          <Ionicons
            name="ios-people-outline"
            size={23}
            color={COLORS.primary}
            style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
            <Text style={styles.f18}> Contact Us</Text>
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

          <FlatList
            data={supportType}
            keyExtractor={(item, index) => index.toString()}
            renderItem={support => (
              <View
                style={{
                  maxWidth: '100%',
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  backgroundColor: '#fff',
                  marginVertical: 4,
                  borderRadius: 4,
                  borderLeftColor: getColorCode(support.item.id),
                  borderLeftWidth: 6,
                  justifyContent: 'center',
                  paddingLeft: 16,
                }}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Avatar.Icon
                    size={42}
                    color={COLORS.white}
                    icon="notification-clear-all"
                    style={{
                      backgroundColor: getColorCode(support.item.id),
                    }}
                  />
                  <View
                    style={{
                      justifyContent: 'center',
                      marginLeft: 10,
                    }}>
                    <Text
                      style={[
                        styles.f20,
                        {
                          color: '#333',
                          fontWeight: 'bold',
                        },
                      ]}>
                      {support.item.name}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </SafeAreaView>
      <StaticBottomTabs navigation={navigation} routeName={route.name} />
    </>
  );
};

export default ContactScreen;
