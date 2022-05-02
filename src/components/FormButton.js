import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../constants';
import {windowHeight, windowWidth} from '../utils/Dimentions';

const FormButton = ({isPrimary, style, buttonTitle, ...rest}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        paddingVertical: SIZES.base * 1.5,
        backgroundColor: isPrimary ? '#002060' : COLORS.primary,
        borderWidth: 1.5,
        borderColor: isPrimary ? '#002060' : COLORS.black,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
        marginVertical: SIZES.base,
        ...style,
      }}
      {...rest}>
      <Text
        style={{
          color: isPrimary ? COLORS.white : COLORS.black,
          fontSize: 20,
          fontWeight: 'bold',
        }}>
        {buttonTitle}
      </Text>
    </TouchableOpacity>
  );
};

export default FormButton;

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: SIZES.base * 2,
    marginTop: 10,
    width: '100%',
    height: windowHeight / 15,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'Lato-Regular',
  },
});
