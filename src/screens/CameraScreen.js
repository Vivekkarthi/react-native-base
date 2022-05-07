import React, {useState, useRef} from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
  Text,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AppStatusBar from '../components/AppStatusBar';
import {CONFIG} from '../utils/Config';

import Feather from 'react-native-vector-icons/Feather';
import {COLORS} from '../constants';
import {useSelector} from 'react-redux';
import StaticBottomTabs from '../components/StaticBottomTabs';
import styles from '../styles/AppStyles';
import {Divider} from 'react-native-paper';
const viewConfigRef = {viewAreaCoveragePercentThreshold: 95};

const CameraScreen = ({navigation, route}) => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const {homeDetails} = useSelector(state => state.HomeState);

  const onViewRef = useRef(({changed}) => {
    if (changed[0].isViewable) {
      setCurrentIndex(changed[0].index);
    }
  });

  const scrollToIndex = index => {
    flatListRef.current?.scrollToIndex({animated: true, index: index});
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => {}} activeOpacity={1}>
        <Image
          style={[styles.cameraImage, styles.mt5, styles.mb5]}
          source={
            item.Filename
              ? {
                  uri: `${CONFIG.IMAGE_URL}/${item.Filename}`,
                }
              : require('../../assets/images/no-image.jpg')
          }
        />
        {homeDetails.Photos.length > 1 && (
          <View style={styles.packageDotView}>
            {homeDetails.Photos.map(({}, index) => (
              <TouchableOpacity
                key={index.toString()}
                style={[
                  styles.packageCircle,
                  {
                    backgroundColor: index === currentIndex ? 'black' : 'grey',
                  },
                ]}
                onPress={() => scrollToIndex(index)}></TouchableOpacity>
            ))}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: COLORS.background}}>
        <View style={styles.MainContainer}>
          <AppStatusBar colorPalete="WHITE" bg={COLORS.white} />
          <Feather
            name="camera"
            size={23}
            color={COLORS.primary}
            style={{
              flexDirection: 'row',
              alignSelf: 'flex-start',
              marginBottom: 20,
            }}>
            <Text style={styles.f18}> Photos</Text>
          </Feather>
          <FlatList
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
            data={[{ID: '1'}]}
            keyExtractor={item => `${item.ID}`}
            renderItem={() => (
              <View style={{flexDirection: 'column'}}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 18,
                    backgroundColor: COLORS.primary,
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
                  }}>
                  External Camera
                </Text>

                {homeDetails.Photos.length ? (
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
