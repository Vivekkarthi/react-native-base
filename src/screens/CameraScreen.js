import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Text,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import CustomHeader from '../components/CustomHeader';
import {sliderData} from '../model/data';

const {width: screenWidth} = Dimensions.get('window');

const CameraScreen = ({navigation}) => {
  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);

  const goForward = () => {
    carouselRef.current.snapToNext();
  };

  useEffect(() => {
    setEntries(sliderData);
  }, []);

  const renderItem = ({item, index}, parallaxProps) => {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{uri: item.illustration}}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#dfe1eb'}}>
      <ScrollView style={{padding: 20}}>
        <CustomHeader navigation={navigation} />
        <Text style={{textAlign: 'center'}}>Intenal Camera</Text>
        <View style={styles.container}>
          {/* <Ionicons
            name="arrow-forward-circle-outline"
            size={30}
            onPress={goForward}
          /> */}
          <Carousel
            ref={carouselRef}
            sliderWidth={screenWidth - 40}
            itemWidth={500}
            data={entries}
            renderItem={renderItem}
            hasParallaxImages={true}
          />
        </View>
        <Text style={{textAlign: 'center', top: 10}}>External Camera</Text>
        <View style={styles.container}>
          {/* <Ionicons
            name="arrow-forward-circle-outline"
            size={30}
            onPress={goForward}
          /> */}
          <Carousel
            ref={carouselRef}
            sliderWidth={screenWidth - 40}
            itemWidth={500}
            data={entries}
            renderItem={renderItem}
            hasParallaxImages={true}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: screenWidth - 60,
    height: 250,
    top: 20,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
});
