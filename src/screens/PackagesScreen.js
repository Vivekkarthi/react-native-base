import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
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

const {width, height} = Dimensions.get('window');
const viewConfigRef = {viewAreaCoveragePercentThreshold: 95};

const PackagesScreen = ({navigation}) => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const {homeDetails} = useSelector(state => state.HomeState);

  const carouselItems = [
    {
      title: 'Photo 1',
      image: `${CONFIG.IMAGE_URL}/${homeDetails.photo1}`,
    },
    {
      title: 'Photo 2',
      image: `${CONFIG.IMAGE_URL}/${homeDetails.photo2}`,
    },
    {
      title: 'Photo 3',
      image: `${CONFIG.IMAGE_URL}/${homeDetails.photo3}`,
    },
    {
      title: 'Photo 4',
      image: `${CONFIG.IMAGE_URL}/${homeDetails.photo4}`,
    },
    {
      title: 'Photo 5',
      image: `${CONFIG.IMAGE_URL}/${homeDetails.photo5}`,
    },
  ];

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
          style={styles.image}
          source={{
            uri: item.image,
          }}
        />
        <View style={styles.footer}>
          <Text style={styles.footerText}>{item.title}</Text>
          <Text style={styles.footerText}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, padding: 10, backgroundColor: '#dfe1eb'}}>
      <AppStatusBar colorPalete="WHITE" bg={COLORS.background} />
      <Ionicons
        name="logo-dropbox"
        size={23}
        color={'#002060'}
        style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
        <Text
          style={{fontSize: 18, fontFamily: 'Lato-Regular', color: '#002060'}}>
          Packages
        </Text>
      </Ionicons>
      <View style={styles.container}>
        <FlatList
          data={carouselItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          ref={ref => {
            flatListRef.current = ref;
          }}
          style={styles.carousel}
          viewabilityConfig={viewConfigRef}
          onViewableItemsChanged={onViewRef.current}
        />

        <View style={styles.dotView}>
          {carouselItems.map(({}, index) => (
            <TouchableOpacity
              key={index.toString()}
              style={[
                styles.circle,
                {
                  backgroundColor: index === currentIndex ? 'black' : 'grey',
                },
              ]}
              onPress={() => scrollToIndex(index)}></TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PackagesScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    // backgroundColor: '#FFFFFF',
  },
  carousel: {
    maxHeight: 300,
  },
  image: {
    width: width - 20,
    height: 250,
    resizeMode: 'cover',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    paddingHorizontal: 40,
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  footerText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dotView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  circle: {
    width: 10,
    height: 10,
    backgroundColor: 'grey',
    borderRadius: 50,
    marginHorizontal: 5,
  },
});
