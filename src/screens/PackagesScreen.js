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
import {sliderData} from '../model/data';

const {width: screenWidth} = Dimensions.get('window');

const PackagesScreen = ({navigation}) => {
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
        <Text style={{textAlign: 'center'}}>Packages</Text>
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

export default PackagesScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: screenWidth - 60,
    height: 200,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
    top: 10,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
});