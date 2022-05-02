import React, {useState} from 'react';
import {View, SafeAreaView, Text, FlatList} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Card, Button} from 'react-native-paper';
import RNSpeedometer from 'react-native-speedometer';

import {COLORS} from '../constants';
import AppStatusBar from '../components/AppStatusBar';

import {Loader} from '../components/Loader';
import StaticBottomTabs from '../components/StaticBottomTabs';
import {windowWidth} from '../utils/Dimentions';

export default function MyboxScreen({navigation, route}) {
  const [loader] = useState(false);

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
                      <Card.Cover
                        style={{
                          alignSelf: 'center',
                          width: 100,
                          resizeMode: 'contain',
                        }}
                        source={require('../../assets/images/no-image.jpg')}
                      />
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
                      <Card.Cover
                        style={{
                          alignSelf: 'center',
                          width: 100,
                          resizeMode: 'contain',
                        }}
                        source={require('../../assets/images/no-image.jpg')}
                      />
                      <Card.Actions
                        style={{
                          justifyContent: 'center',
                        }}>
                        <Button>Take a photo</Button>
                      </Card.Actions>
                    </Card>
                  </View>
                </View>
                <View
                  style={{
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
                      <RNSpeedometer
                        value={50}
                        size={150}
                        wrapperStyle={{
                          marginTop: 20,
                          marginBottom: 20,
                          alignSelf: 'center',
                        }}
                        labelNoteStyle={{display: 'none'}}
                      />
                      <Card.Actions
                        style={{
                          justifyContent: 'center',
                        }}>
                        <Button>Battery</Button>
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
                          height: 150,
                        }}
                      />
                    </Card>
                  </View>
                </View>
              </>
            )}
          />
        </View>
      </SafeAreaView>
      <StaticBottomTabs navigation={navigation} routeName={route.name} />
    </>
  );
}
