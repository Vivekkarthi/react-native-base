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
          style={styles.cameraImage}
          source={{
            uri: `${CONFIG.IMAGE_URL}/${item.Filename}`,
          }}
        />
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
      </TouchableOpacity>
    );
  };

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: COLORS.background}}>
        <View style={styles.MainContainer}>
          <AppStatusBar colorPalete="WHITE" bg={COLORS.white} />
          <FlatList
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
            data={[{ID: '1'}]}
            keyExtractor={item => `${item.ID}`}
            renderItem={() => (
              <View style={{flexDirection: 'column'}}>
                <Text style={[styles.tc, styles.f18]}>Intenal Camera</Text>
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
                <Text style={[styles.tc, styles.f18]}>External Camera</Text>
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
