// First thing you see on the plants tab. It holds the rooms
// \ MyPlants
//  \ Rooms *
//   \ Plants

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View, Text, ImageBackground, ScrollView } from 'react-native';
import { Card, CardItem, Button } from 'native-base';


const Stack = createStackNavigator();
// We'll be getting some real data from our backend. For now, I'll use this for the cards.

const dummyRooms = [
  {
    name: 'kitchen'
  },
  {
    name: 'hall'
  },
  {
    name: 'living room'
  },
  {
    name: 'bedroom'
  },
  {
    name: 'bathroom'
  },
];

const background = require('../../assets/bachgrund.png');

export default class MyPlants extends React.Component {
    render () {
        return (
            <ImageBackground source={background} style={styles.background}>
              <View>
              <Text style={styles.titleStyle}>My Rooms</Text>
                <ScrollView>
                  <Stack.Navigator>
                  {dummyRooms.map((room)=>{
                    return (
                      <Stack.Screen name={room.name} component={room.component} />
                    )
                  })}
                  </Stack.Navigator>
                </ScrollView>
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
      flexWrap: 'wrap'
    },
    titleStyle: {
      fontSize: 30,
      color: 'blue',
      textAlign: 'center',
      marginTop: 24,
      marginBottom: 10
    },
    background: {
      flex: 1,         // We really want this, so the background takes up the whole background
      
    },
    itemContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
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
  