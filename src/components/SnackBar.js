import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Snackbar} from 'react-native-paper';

const SnackBar = ({visible, status, message, onDismissSnackBar}) => {
  return (
    <View style={styles.container}>
      <Snackbar
        theme={{
          colors: {
            onSurface: status === 'error' ? '#D83F50' : '#31bb1b',
            surface: status === 'error' ? 'white' : 'black',
          },
        }}
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Close',
          labelStyle: {fontWeight: 'bold', color: '#040202'},
          onPress: () => {
            onDismissSnackBar();
          },
        }}>
        {message}
      </Snackbar>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SnackBar;
