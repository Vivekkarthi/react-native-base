import React, {useState, useRef, useCallback} from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
  Text,
  RefreshControl,
} from 'react-native';

import AppStatusBar from '../components/AppStatusBar';

import {Loader} from '../components/Loader';
import Feather from 'react-native-vector-icons/Feather';
import {COLORS} from '../constants';
import {useSelector} from 'react-redux';
import StaticBottomTabs from '../components/StaticBottomTabs';
import styles from '../styles/AppStyles';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import moment from 'moment';
import {fetchHomeData, saveMemberHomeDetails} from '../redux/actions/HomeState';
import Toast from 'react-native-simple-toast';
import {useDispatch} from 'react-redux';

const viewConfigRef = {viewAreaCoveragePercentThreshold: 95};

const CameraScreen = ({navigation, route}) => {
  const dispatch = useDispatch();

  const [loader, setLoader] = useState(false);
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const {loggedMember} = useSelector(state => state.AuthState);
  const {homeDetails} = useSelector(state => state.HomeState);
  const [refreshing, setRefreshing] = useState(false);

  const onViewRef = useRef(({changed}) => {
    if (changed[0].isViewable) {
      setCurrentIndex(changed[0].index);
    }
  });

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
            setLoader(false);
            dispatch(saveMemberHomeDetails(resp));
          } else {
            // Not Good
            setLoader(false);
            Toast.showWithGravity(resp, Toast.LONG, Toast.BOTTOM);
          }
        })
        .catch(error => {
          setLoader(false);
          Toast.showWithGravity(error.message, Toast.LONG, Toast.BOTTOM);
        });
    },
    [dispatch, loggedMember.ControllerID, loggedMember.LoginID],
  );

  const scrollToIndex = index => {
    flatListRef.current?.scrollToIndex({animated: true, index: index});
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => {}} activeOpacity={1}>
        <View style={{flex: 1}}>
          <ReactNativeZoomableView
            maxZoom={2.5}
            minZoom={0.5}
            zoomStep={1.5}
            initialZoom={1}
            bindToBorders={true}>
            <Image
              style={[styles.cameraImage, styles.mt5, styles.mb5]}
              source={
                item.Filename
                  ? {
                      uri: item.Filename,
                    }
                  : require('../../assets/images/no-image.jpg')
              }
            />
          </ReactNativeZoomableView>
        </View>
        <Text
          style={{
            textAlign: 'center',
            color: '#000000',
            fontWeight: 'bold',
            lineHeight: 35,
          }}>
          {item.DateTimeX}
        </Text>
      </TouchableOpacity>
    );
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    getHomeData(new Date());
    setRefreshing(false);
  }, [getHomeData]);

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: COLORS.background}}>
        <View style={styles.MainContainer}>
          <AppStatusBar colorPalete="WHITE" bg={COLORS.white} />
          {loader ? <Loader /> : null}
          <Feather
            name="camera"
            size={23}
            color={COLORS.primary}
            style={{
              flexDirection: 'row',
              alignSelf: 'flex-start',
              marginBottom: 20,
            }}>
            <Text style={{fontSize: 23}}> Images</Text>
          </Feather>
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
              <View style={{flexDirection: 'column'}}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 18,
                    backgroundColor: COLORS.primary,
                    paddingBottom: 10,
                    paddingTop: 9,
                    color: COLORS.white,
                  }}>
                  Internal Camera
                </Text>
                {homeDetails.Photos.length ? (
                  <>
                    <FlatList
                      data={homeDetails.Photos}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={renderItem}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      pagingEnabled
                      ref={ref => {
                        flatListRef.current = ref;
                      }}
                      viewabilityConfig={viewConfigRef}
                      onViewableItemsChanged={onViewRef.current}
                    />

                    {homeDetails.Photos.length > 1 && (
                      <View style={styles.packageDotView}>
                        {homeDetails.Photos.map(({}, index) => (
                          <TouchableOpacity
                            key={index.toString()}
                            style={[
                              styles.packageCircle,
                              {
                                backgroundColor:
                                  index === currentIndex ? 'black' : 'grey',
                              },
                            ]}
                            onPress={() =>
                              scrollToIndex(index)
                            }></TouchableOpacity>
                        ))}
                        {/* <Modal visible={true} transparent={true}>
                          <ImageViewer imageUrls={image} />
                        </Modal> */}
                      </View>
                    )}
                  </>
                ) : (
                  <Image
                    style={[styles.cameraImage, styles.mt5, styles.mb5]}
                    source={require('../../assets/images/no-image.jpg')}
                  />
                )}
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 18,
                    backgroundColor: COLORS.primary,
                    color: COLORS.white,
                    paddingBottom: 10,
                    paddingTop: 9,
                  }}>
                  External Camera
                </Text>

                {homeDetails.ExternalPhotos.length ? (
                  <>
                    <FlatList
                      data={homeDetails.ExternalPhotos}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={renderItem}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      pagingEnabled
                      ref={ref => {
                        flatListRef.current = ref;
                      }}
                      viewabilityConfig={viewConfigRef}
                      onViewableItemsChanged={onViewRef.current}
                    />
                    {homeDetails.ExternalPhotos.length > 1 && (
                      <View style={styles.packageDotView}>
                        {homeDetails.ExternalPhotos.map(({}, index) => (
                          <TouchableOpacity
                            key={index.toString()}
                            style={[
                              styles.packageCircle,
                              {
                                backgroundColor:
                                  index === currentIndex ? 'black' : 'grey',
                              },
                            ]}
                            onPress={() =>
                              scrollToIndex(index)
                            }></TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </>
                ) : (
                  <Image
                    style={[styles.cameraImage, styles.mt5, styles.mb5]}
                    source={require('../../assets/images/no-image.jpg')}
                  />
                )}
              </View>
            )}
          />
        </View>
      </SafeAreaView>
      <StaticBottomTabs navigation={navigation} routeName={route.name} />
    </>
  );
};

export default CameraScreen;
