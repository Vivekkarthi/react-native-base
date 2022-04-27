import moment from 'moment';
import React from 'react';
import {View, Text, SafeAreaView, ScrollView, FlatList} from 'react-native';
import {Avatar} from 'react-native-paper';
import {useSelector} from 'react-redux';
import AppStatusBar from '../components/AppStatusBar';
import {COLORS} from '../constants';

const NotificationsScreen = ({navigation, route}) => {
  const {homeDetails} = useSelector(state => state.HomeState);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 5,
        backgroundColor: '#dfe1eb',
      }}>
      <AppStatusBar colorPalete="WHITE" bg={COLORS.background} />
      <View style={{flex: 1, paddingTop: 10}}>
        {homeDetails.Notifications.length ? (
          <FlatList
            data={homeDetails.Notifications}
            keyExtractor={(item, index) => index.toString()}
            renderItem={notification => (
              <View
                style={{
                  maxWidth: '100%',
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  backgroundColor: '#fff',
                  marginVertical: 4,
                  borderRadius: 4,
                  borderLeftColor: '#ff3300',
                  borderLeftWidth: 6,
                  justifyContent: 'center',
                  paddingLeft: 16,
                }}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Avatar.Icon
                    size={42}
                    color={COLORS.white}
                    icon="notification-clear-all"
                    style={{backgroundColor: '#ff3300'}}
                  />
                  <View
                    style={{
                      flexDirection: 'column',
                      marginLeft: 10,
                      width: '75%',
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: '#333',
                        fontWeight: 'bold',
                      }}>
                      {moment(notification.item.Datex).format('MMMM DD, YYYY')}
                    </Text>
                    <Text
                      style={{fontSize: 16, color: '#a3a3a3', marginTop: 2}}>
                      {notification.item.Messagex}
                    </Text>
                  </View>
                  <View
                    style={{
                      alignSelf: 'center',
                      marginLeft: 10,
                      backgroundColor: '#0DA728',
                      borderRadius: 50,
                      height: 10,
                      width: 10,
                    }}></View>
                </View>
              </View>
            )}
          />
        ) : (
          <View
            style={{
              maxWidth: '100%',
              paddingHorizontal: 15,
              paddingVertical: 10,
              backgroundColor: '#fff',
              marginVertical: 4,
              borderRadius: 4,
              borderLeftColor: '#ff3300',
              borderLeftWidth: 6,
              justifyContent: 'center',
              paddingLeft: 16,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Avatar.Icon
                size={42}
                color={COLORS.white}
                icon="notification-clear-all"
                style={{backgroundColor: COLORS.primary}}
              />
              <View style={{alignSelf: 'center', marginLeft: 10}}>
                <Text style={{fontSize: 16, color: '#a3a3a3', marginTop: 2}}>
                  No notifications found.
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default NotificationsScreen;
