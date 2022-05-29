import React, {useCallback, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {useDispatch, useSelector} from 'react-redux';
import {
  saveURLDetails,
  memberManualURL,
} from '../redux/actions/SupportTicketState';
import Toast from 'react-native-simple-toast';

function WebViewUI(props) {
  const dispatch = useDispatch();

  const {URLDetails} = useSelector(state => state.TicketStateState);
  const webviewRef = React.useRef(null);

  function webViewgoback() {
    if (webviewRef.current) webviewRef.current.goBack();
  }

  function webViewNext() {
    if (webviewRef.current) webviewRef.current.goForward();
  }

  function LoadingIndicatorView() {
    return (
      <ActivityIndicator
        color="#009b88"
        size="large"
        style={styles.ActivityIndicatorStyle}
      />
    );
  }

  const getManualURLData = useCallback(
    (currentDate, toDate) => {
      memberManualURL()
        .then(async resp => {
          dispatch(saveURLDetails(resp));
          setLoader(false);
        })
        .catch(error => {
          setLoader(false);
          Toast.showWithGravity(error.message, Toast.LONG, Toast.BOTTOM);
        });
    },
    [dispatch],
  );

  useEffect(() => {
    getManualURLData();
  }, [getManualURLData]);

  return (
    <>
      <SafeAreaView style={styles.flexContainer}>
        <WebView
          source={{uri: URLDetails}}
          renderLoading={LoadingIndicatorView}
          startInLoadingState={true}
          ref={webviewRef}
        />
        <View style={styles.tabBarContainer}>
          <TouchableOpacity onPress={webViewgoback}>
            <Text style={{color: 'green'}}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
            <Text style={{color: 'green'}}>Exit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={webViewNext}>
            <Text style={{color: 'green'}}>Next</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  flexContainer: {
    flex: 1,
  },
  tabBarContainer: {
    backgroundColor: '#d3d3d3',
    height: 56,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  button: {
    fontSize: 24,
  },
  arrow: {
    color: '#ef4771',
  },
  icon: {
    width: 20,
    height: 20,
  },
});
export default WebViewUI;
