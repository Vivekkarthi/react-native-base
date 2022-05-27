import React, {useState, useRef} from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
  Text,
} from 'react-native';

import AppStatusBar from '../components/AppStatusBar';

import {Loader} from '../components/Loader';
import Feather from 'react-native-vector-icons/Feather';
import {COLORS} from '../constants';
import StaticBottomTabs from '../components/StaticBottomTabs';
import styles from '../styles/AppStyles';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import {isEmpty} from 'lodash';
const viewConfigRef = {viewAreaCoveragePercentThreshold: 95};

const PackageDetailsScreen = ({navigation, route}) => {
  const deliverData = route.params && route.params.deliverData;
  let photosArray = [];
  if (!isEmpty(deliverData)) {
    photosArray = [
      'https://www.koimoi.com/wp-content/new-galleries/2022/01/when-kgf-fame-yash-ran-from-him-house-with-just-300-rupees-in-his-pocket-to-pursue-his-dream-to-be-an-actor-001.jpg',
      'https://www.koimoi.com/wp-content/new-galleries/2022/01/when-kgf-fame-yash-ran-from-him-house-with-just-300-rupees-in-his-pocket-to-pursue-his-dream-to-be-an-actor-001.jpg',
      'https://www.koimoi.com/wp-content/new-galleries/2022/01/when-kgf-fame-yash-ran-from-him-house-with-just-300-rupees-in-his-pocket-to-pursue-his-dream-to-be-an-actor-001.jpg',
      'https://www.koimoi.com/wp-content/new-galleries/2022/01/when-kgf-fame-yash-ran-from-him-house-with-just-300-rupees-in-his-pocket-to-pursue-his-dream-to-be-an-actor-001.jpg',
      'https://www.koimoi.com/wp-content/new-galleries/2022/01/when-kgf-fame-yash-ran-from-him-house-with-just-300-rupees-in-his-pocket-to-pursue-his-dream-to-be-an-actor-001.jpg',
    ];
  }
  const [loader, setLoader] = useState(false);
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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
      <TouchableOpacity key={index}>
        <View style={{flex: 1}}>
          <Image
            style={[styles.cameraImage, styles.mt5, styles.mb5]}
            source={
              item
                ? {
                    uri: item,
                  }
                : require('../../assets/images/no-image.jpg')
            }
          />
        </View>
        <Text
          style={{
            textAlign: 'center',
            color: '#000000',
            fontWeight: 'bold',
            lineHeight: 35,
          }}>
          {deliverData.DateX}
        </Text>
      </TouchableOpacity>
    );
  };

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
            <Text style={styles.f18}> Images</Text>
          </Feather>
          <FlatList
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
            data={[{ID: '1'}]}
            keyExtractor={item => `${item.ID}`}
            renderItem={() => (
              <View style={{flexDirection: 'column'}}>
                {photosArray.length ? (
                  <>
                    <FlatList
                      data={photosArray}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={renderItem}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      pagingEnabled
                      // ref={ref => {
                      //   flatListRef.current = ref;
                      // }}
                      // viewabilityConfig={viewConfigRef}
                      onViewableItemsChanged={onViewRef.current}
                    />

                    {photosArray.length > 1 && (
                      <View style={styles.packageDotView}>
                        {photosArray.map(({}, index) => (
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

export default PackageDetailsScreen;
