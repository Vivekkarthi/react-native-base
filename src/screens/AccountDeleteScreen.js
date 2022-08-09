import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {Button} from 'react-native-paper';
import StaticBottomTabs from '../components/StaticBottomTabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  logoutSuccess,
  memberDeleteuserAccount,
} from '../redux/actions/AuthState';
import AppStatusBar from '../components/AppStatusBar';
import {COLORS} from '../constants';
import styles from '../styles/AppStyles';
import {useSelector, useDispatch} from 'react-redux';

const AccountDeleteScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const hasSupportData = route.params && route.params.state;
  const {loggedMember} = useSelector(state => state.AuthState);
  const [loader, setLoader] = useState(false);

  const deleteAccount = () => {
    setLoader(true);
    memberDeleteuserAccount(loggedMember)
      .then(resp => {
        if (resp === 'Success') {
          //Good
          dispatch(logoutSuccess());
          setLoader(false);
        } else {
          // Not Good
          setLoader(false);
        }
      })
      .catch(error => {
        setLoader(false);
      });
  };

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: COLORS.background}}>
        <AppStatusBar colorPalete="WHITE" bg={COLORS.white} />
        <View style={styles.MainContainer}>
          <MaterialCommunityIcons
            name="delete-alert-outline"
            size={23}
            color={COLORS.primary}
            style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
            <Text style={styles.f18}>Delete Account</Text>
          </MaterialCommunityIcons>
          <Text style={{fontSize: 18, marginTop: 30, color: '#0059b3'}}>
            User Name: {loggedMember.LoginNAME}
          </Text>
          <Text style={{fontSize: 18, marginTop: 10, color: '#0059b3'}}>
            Controller: {loggedMember.ControllerName}
          </Text>
          <Text style={{fontSize: 18, marginTop: 30}}>
            The deactivate process will delete all the users associated with
            this account and the changes can not be reverted. Do you want to
            continue?
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 5,
              marginTop: 10,
            }}>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('HomeStack')}
              style={{
                alignSelf: 'flex-end',
                marginTop: 20,
                backgroundColor: '#f17012',
              }}>
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={deleteAccount}
              //disabled={btnDisable}
              style={{
                alignSelf: 'flex-end',
                marginTop: 20,
                marginRight: 10,
                backgroundColor: '#990000',
              }}>
              Delete
            </Button>
          </View>
        </View>
      </SafeAreaView>
      <StaticBottomTabs navigation={navigation} routeName={route.name} />
    </>
  );
};

export default AccountDeleteScreen;
