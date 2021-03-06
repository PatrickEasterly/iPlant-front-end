// When a room is clicked, the room you choose renders here
// \ MyPlants
//  \ Rooms *
//   \ Plants
import React from 'react';
import { View, Text, } from 'react-native';
import {  ImageBackground, ScrollView } from 'react-native';
import { Card, CardItem } from 'native-base';
const background = require('../../../assets/greenPlant1.png');
import dummyPlants from '../../variables/dummyPlants';

export default function Hall({route}) {
  const thisRoomsPlants = dummyPlants.filter((plant)=> plant.room === route.params.name)
    return (
        <ImageBackground source={background} style={styles.background}>
          <View>
          <Text style={styles.titleStyle}>{route.params.name} Plants</Text>
            <ScrollView>
            {thisRoomsPlants.map((plant)=>{

              return (
                <Card>
                  {/* If the plant needs watering, the title background turns yellow; if they're all good, it's green */}
                  <CardItem bordered style={(plant.needsWatering) ? styles.needsWater : styles.hasWater}>
                    <Text>{plant.name}</Text>
                  </CardItem>
                  <CardItem bordered>
                      <CardItem style={styles.container}>
                        <Text>{plant.info}</Text>
                      </CardItem>
                      <CardItem style={styles.container}>
                        <Text>{plant.room}</Text>
                      </CardItem>
                  </CardItem>
                </Card>
              )
            })}
            </ScrollView>
          </View>
        </ImageBackground>
    )
}
const styles = {
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
    needsWater: {
      backgroundColor: 'yellow',
    },
    hasWater: {
      backgroundColor: 'blue',
    }
  }
  