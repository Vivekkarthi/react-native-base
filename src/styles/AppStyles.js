import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
import {COLORS} from '../constants';

const styles = StyleSheet.create({
  flex1: {flex: 1},
  fdRow: {
    flexDirection: 'row',
  },
  fdCol: {
    flexDirection: 'column',
  },
  container: {
    flex: 1,
  },
  MainContainer: {
    flex: 1,
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
    // marginTop: -15,
  },
  f14: {
    fontSize: 14,
    fontFamily: 'Lato-Regular',

    color: COLORS.primary,
  },
  f16: {
    fontSize: 16,
    fontFamily: 'Lato-Regular',

    color: COLORS.primary,
  },
  f18: {
    fontSize: 18,
    fontFamily: 'Lato-Regular',
    color: COLORS.primary,
  },
  f20: {
    fontSize: 20,
    fontFamily: 'Lato-Regular',

    color: COLORS.primary,
  },
  f22: {
    fontSize: 22,
    fontFamily: 'Lato-Regular',

    color: COLORS.primary,
  },
  f24: {
    fontSize: 24,
    fontFamily: 'Lato-Regular',

    color: COLORS.primary,
  },
  f26: {
    fontSize: 26,
    fontFamily: 'Lato-Regular',

    color: COLORS.primary,
  },
  f28: {
    fontSize: 28,
    fontFamily: 'Lato-Regular',

    color: COLORS.primary,
  },
  f30: {
    fontSize: 30,
    fontFamily: 'Lato-Regular',

    color: COLORS.primary,
  },
  tc: {
    textAlign: 'center',
  },
  jc: {
    justifyContent: 'center',
  },
  asc: {
    alignSelf: 'center',
  },

  pt5: {
    paddingTop: 5,
  },
  pt10: {
    paddingTop: 10,
  },
  pt15: {
    paddingTop: 15,
  },
  pt20: {
    paddingTop: 20,
  },

  pb5: {
    paddingBottom: 5,
  },
  pb10: {
    paddingBottom: 10,
  },
  pb15: {
    paddingBottom: 15,
  },
  pb20: {
    paddingBottom: 20,
  },

  pl5: {
    paddingLeft: 5,
  },
  pl10: {
    paddingLeft: 10,
  },
  pl15: {
    paddingLeft: 15,
  },
  pl20: {
    paddingLeft: 20,
  },

  pr5: {
    paddingRight: 5,
  },
  pr10: {
    paddingRight: 10,
  },
  pr15: {
    paddingRight: 15,
  },
  pr20: {
    paddingRight: 20,
  },

  mt5: {
    marginTop: 5,
  },
  mt10: {
    marginTop: 10,
  },
  mt15: {
    marginTop: 15,
  },
  mt20: {
    marginTop: 20,
  },
  mb5: {
    marginBottom: 5,
  },
  mb10: {
    marginBottom: 10,
  },
  mb15: {
    marginBottom: 15,
  },
  mb20: {
    marginBottom: 20,
  },

  ml5: {
    marginLeft: 5,
  },
  ml10: {
    marginLeft: 10,
  },
  ml15: {
    marginLeft: 15,
  },
  ml20: {
    marginLeft: 20,
  },

  mr5: {
    marginRight: 5,
  },
  mr10: {
    marginRight: 10,
  },
  mr15: {
    marginRight: 15,
  },
  mr20: {
    marginRight: 20,
  },
  cameraImage: {
    borderRadius: 4,
    width: width - 10,
    height: 200,
    resizeMode: 'cover',
  },
  packageImage: {
    borderRadius: 8,
    width: width - 10,
    height: 250,
    resizeMode: 'cover',
  },
  packageFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    paddingHorizontal: 40,
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  packagFooterText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  packageDotView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  packageCircle: {
    width: 10,
    height: 10,
    backgroundColor: 'grey',
    borderRadius: 50,
    marginHorizontal: 5,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    borderRadius: 4,
    alignItems: 'center',
    bottom: 5,
    justifyContent: 'center',
    position: 'absolute',
    top: 5,
    width: 35,
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 36,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
  trash: {
    height: 25,
    width: 25,
  },
});

export default styles;
