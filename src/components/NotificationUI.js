import moment from 'moment';
import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {Card, Avatar} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import {COLORS} from '../constants';
import {getColorCode, getTypeOfMsg} from '../utils/Handlers';
import {useDispatch} from 'react-redux';
import {saveMemberHomeNotifications} from '../redux/actions/HomeState';

const NotificationUI = ({
  mobileNotifyDate,
  // setMobileNotifyDate,
  notificationData,
  getMobileNotifyData,
}) => {
  const dispatch = useDispatch();
  const getNextNotify = () => {
    // setMobileNotifyDate(moment(new Date(mobileNotifyDate)).add(1, 'days'));
    getMobileNotifyData(moment(new Date(mobileNotifyDate)).add(1, 'days'));
    dispatch(
      saveMemberHomeNotifications(
        true,
        moment(new Date(mobileNotifyDate)).add(1, 'days'),
      ),
    );
  };

  const getPreviousNotify = () => {
    // setMobileNotifyDate(moment(new Date(mobileNotifyDate)).subtract(1, 'days'));
    getMobileNotifyData(moment(new Date(mobileNotifyDate)).subtract(1, 'days'));
    dispatch(
      saveMemberHomeNotifications(
        true,
        moment(new Date(mobileNotifyDate)).subtract(1, 'days'),
      ),
    );
  };

  return (
    <View>
      <Card style={{marginBottom: 13, marginTop: 2, height: 105}}>
        <View
          style={{
            alignSelf: 'center',
            paddingBottom: 12,
            paddingTop: 12,
            backgroundColor: '#178b93',
            width: '100%',
          }}>
          <Foundation
            name="mobile-signal"
            size={16}
            style={{textAlign: 'center', justifyContent: 'center'}}
            color={COLORS.white}>
            {' '}
            Mobile Notifications
          </Foundation>
        </View>
        <Card.Title
          title={`${moment(new Date(mobileNotifyDate)).format(
            'MMMM DD, YYYY',
          )}`}
          titleStyle={{
            fontSize: 14,
            alignSelf: 'center',
            justifyContent: 'center',
          }}
          subtitleStyle={{fontSize: 16, alignSelf: 'center'}}
          left={props => (
            <Ionicons
              name="arrow-back-circle-outline"
              size={30}
              onPress={() => getPreviousNotify()}
            />
          )}
          right={props => (
            <Ionicons
              style={{paddingRight: 12}}
              name="arrow-forward-circle-outline"
              size={30}
              onPress={() => getNextNotify()}
            />
          )}
        />
      </Card>
      {notificationData.length ? (
        <FlatList
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
          data={notificationData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={notification => (
            <View
              style={{
                maxWidth: '100%',
                bottom: 13,
                paddingHorizontal: 15,
                paddingVertical: 10,
                backgroundColor: '#fff',
                marginVertical: 4,
                borderRadius: 4,
                borderLeftColor: getColorCode(notification.item.STATUSX),
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
                    backgroundColor: getColorCode(notification.item.STATUSX),
                  }}
                />
                <View
                  style={{
                    flexDirection: 'column',
                    marginLeft: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#333',
                      fontWeight: 'bold',
                    }}>
                    {notification.item.MsgTitle}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#333',
                    }}>
                    {notification.item.MessageX}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#a3a3a3',
                      marginTop: 2,
                    }}>
                    {notification.item.DateX}
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
      ) : (
        <Card style={{backgroundColor: '#eef1f6', bottom: 10}}>
          <Card.Title
            title={'No notifications found.'}
            titleStyle={{fontSize: 14}}
          />
        </Card>
      )}
    </View>
  );
};

export {NotificationUI};
