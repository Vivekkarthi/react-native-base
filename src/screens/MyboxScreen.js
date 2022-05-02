import React, {useState, useEffect, useCallback} from 'react';
import {View, SafeAreaView, Text, FlatList, RefreshControl} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {useToast} from 'react-native-toast-notifications';

import {useSelector, useDispatch} from 'react-redux';
import {
  callOpenCloseBox,
  fetchHomeData,
  saveMemberHomeDetails,
} from '../redux/actions/HomeState';
import {Card, Button, Avatar} from 'react-native-paper';

import {COLORS} from '../constants';
import AppStatusBar from '../components/AppStatusBar';

import {Loader} from '../components/Loader';
import StaticBottomTabs from '../components/StaticBottomTabs';
import {getColorCode, getTypeOfMsg} from '../utils/Handlers';
import ReactSpeedometer from 'react-d3-speedometer';

export default function MyboxScreen({navigation, route}) {
  const dispatch = useDispatch();
  const toast = useToast();
  const {loggedMember} = useSelector(state => state.AuthState);
  const {homeDetails} = useSelector(state => state.HomeState);

  const [loader, setLoader] = useState(true);
  const [notifyDate, setNotifyDate] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);

  const getHomeData = useCallback(
    currentDate => {
      setLoader(true);
      const convertDate = moment(currentDate).format('YYYY-MM-DD');
      fetchHomeData(
        loggedMember.LoginID,
        loggedMember.ControllerID,
        convertDate,
      )
        .then(async resp => {
          if (resp.LastSyncDate) {
            //Good
            dispatch(saveMemberHomeDetails(resp));
            setLoader(false);
          } else {
            // Not Good
            setLoader(false);
            toast.show(resp, {
              type: 'custom_type',
              animationDuration: 100,
              data: {
                type: 'error',
                title: 'Invalid data',
              },
            });
          }
        })
        .catch(error => {
          setLoader(false);
          toast.show(error.message, {
            type: 'custom_type',
            animationDuration: 100,
            data: {
              type: 'error',
              title: 'Invalid data',
            },
          });
        });
    },
    [dispatch, loggedMember.ControllerID, loggedMember.LoginID, toast],
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    getHomeData(new Date());
    setRefreshing(false);
  }, [getHomeData]);

  useEffect(() => {
    getHomeData(new Date());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: COLORS.background}}>
        <View style={{flex: 1, padding: 15, marginTop: -15}}>
          <AppStatusBar colorPalete="WHITE" bg={COLORS.white} />
          {loader ? <Loader /> : null}
          <Ionicons
            name="ios-home-outline"
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
              Mybox
            </Text>
          </Ionicons>
          <FlatList
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                colors={[COLORS.secondary, COLORS.white]}
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            data={[{ID: '1'}]}
            keyExtractor={item => `${item.ID}`}
            renderItem={() => (
              <>
                <View
                  style={{
                    paddingTop: 10,
                    paddingBottom: 10,
                    flexDirection: 'row',
                    alignSelf: 'center',
                  }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Card
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        width: '48%',
                      }}>
                      <Card.Actions
                        style={{
                          justifyContent: 'center',
                        }}>
                        <Button>Take a photo</Button>
                      </Card.Actions>
                    </Card>
                    <Card
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        width: '48%',
                      }}>
                      <Card
                        style={{
                          alignSelf: 'center',
                          width: '100%',
                          height: 160,
                        }}
                      />
                    </Card>
                  </View>
                </View>
                <View
                  style={{
                    paddingTop: 30,
                    paddingBottom: 10,
                    flexDirection: 'row',
                    alignSelf: 'center',
                  }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Card
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        width: '48%',
                      }}></Card>
                    <Card
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        width: '48%',
                      }}>
                      <Card
                        style={{
                          alignSelf: 'center',
                          width: '100%',
                          height: 150,
                        }}
                      />
                    </Card>
                  </View>
                </View>
              </>
            )}
          />
          <ReactSpeedometer
            maxValue={500}
            value={473}
            needleColor="red"
            startColor="green"
            segments={10}
            endColor="blue"
          />
        </View>
      </SafeAreaView>
      <StaticBottomTabs navigation={navigation} routeName={route.name} />
    </>
  );
}
