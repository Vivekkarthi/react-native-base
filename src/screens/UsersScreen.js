import moment from 'moment';
import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Avatar, Button, Card} from 'react-native-paper';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {SwipeListView} from 'react-native-swipe-list-view';

import AppStatusBar from '../components/AppStatusBar';
import StaticBottomTabs from '../components/StaticBottomTabs';
import {COLORS} from '../constants';
import styles from '../styles/AppStyles';

const UsersScreen = ({navigation, route}) => {
  const [listData, setListData] = useState(
    Array(5)
      .fill('')
      .map((_, i) => ({
        key: `${i}`,
        name: 'Leanne Graham',
        email: 'Sincere@april.biz',
        phone: '1-770-736-8031',
      })),
  );

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

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
            <Text style={styles.f18}>Users</Text>
          </Ionicons>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <Button
              style={{margin: 5}}
              mode="contained"
              onPress={() => navigation.goBack()}>
              Back
            </Button>
            <Button
              style={{margin: 5}}
              mode="contained"
              onPress={() => navigation.navigate('UserDetails')}>
              Add
            </Button>
          </View>
          <SwipeListView
            data={listData}
            renderItem={(data, rowMap) => (
              <View
                style={{
                  maxWidth: '100%',
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  backgroundColor: '#fff',
                  borderLeftColor: COLORS.secondary,
                  borderLeftWidth: 6,
                  marginVertical: 4,
                  borderRadius: 4,
                  justifyContent: 'center',
                  paddingLeft: 16,
                }}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Avatar.Icon
                    size={42}
                    color={COLORS.white}
                    icon="account"
                    style={{
                      backgroundColor: COLORS.secondary,
                      alignSelf: 'center',
                    }}
                  />
                  <View
                    style={{
                      flexDirection: 'column',
                      marginLeft: 10,
                      width: '100%',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#333',
                        fontWeight: 'bold',
                      }}>
                      Name: {data.item.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#a3a3a3',
                        marginTop: 2,
                      }}>
                      Email: {data.item.email}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#a3a3a3',
                        marginTop: 2,
                      }}>
                      Mobile: {data.item.phone}
                    </Text>
                  </View>
                </View>
              </View>
            )}
            renderHiddenItem={(data, rowMap) => (
              <View style={styles.rowBack}>
                <TouchableOpacity
                  style={[styles.backRightBtn, styles.backRightBtnLeft]}
                  onPress={() => closeRow(rowMap, data.item.key)}>
                  <Ionicons
                    name="md-close-circle-outline"
                    size={36}
                    color={COLORS.white}
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'flex-start',
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.backRightBtn, styles.backRightBtnRight]}
                  onPress={() => deleteRow(rowMap, data.item.key)}>
                  <Ionicons
                    name="md-trash-outline"
                    size={36}
                    color={COLORS.white}
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'flex-start',
                    }}
                  />
                </TouchableOpacity>
              </View>
            )}
            leftOpenValue={75}
            rightOpenValue={-75}
            previewRowKey={'0'}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            disableRightSwipe
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
      <StaticBottomTabs navigation={navigation} routeName={route.name} />
    </>
  );
};

export default UsersScreen;
