import React from 'react';
import { View, Text, ImageBackground, } from 'react-native';
// import {Button} from 'native-base';

const background = require('../../assets/bachgrund.png');
export default class MyProfile extends React.Component {
    render () {
        return (
            <ImageBackground source={background} style={styles.background}>
            <View style={styles.itemContainer}>
            <Text>My Profile page</Text> 
            </View>
            </ImageBackground>
        )
    }
}

const styles = {
    tabbyy: {
      color: 'red',
      flex: 1
    },
    container: {
      flex: 1,        // This makes the app span the screen
      // marginTop: 24   // Gives a little whitespace at the top of the screen
    },
    titleStyle: {
      fontSize: 30,
      color: 'blue'
    },
    background: {
      flex: 1         // We really want this, so the background takes up the whole background
    },
    itemContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    clickMe: {
      flex: 1,
      color: 'blue',
      alignItems: 'center'
    },
    buttonText: {
      color: '#0f0'
    },
    buttonStyle: {
      margin: 10
    }
  }
  