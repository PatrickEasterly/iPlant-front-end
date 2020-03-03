import React from 'react';
import { View, Text, ImageBackground, ScrollView } from 'react-native';
import { Card, CardItem, Button } from 'native-base';

// We'll be getting some real data from our backend. For now, I'll use this for the cards.

const dummyPlants = [
  {
    id: 1,
    name: 'Aloe',
    needsWatering: false,
    info: 'lorem plant information there is a lot to know about plants. ',
    location: 'kitchen',
    moisture: '',
    temperature: '',
    light: '',
    humidity: ''
  },
  {
    id: 2,
    name: 'Not Aloe',
    needsWatering: true,
    info: 'lorem plant information there is a lot to know about plants. ',
    location: 'kitchen',
    moisture: '',
    temperature: '',
    light: '',
    humidity: ''
  },
  {
    id: 3,
    name: 'Not Aloe',
    needsWatering: true,
    info: 'lorem plant information there is a lot to know about plants. ',
    location: 'kitchen',
    moisture: '',
    temperature: '',
    light: '',
    humidity: ''
  },
  {
    id: 4,
    name: 'Not Aloe',
    needsWatering: true,
    info: 'lorem plant information there is a lot to know about plants. ',
    location: 'kitchen',
    moisture: '',
    temperature: '',
    light: '',
    humidity: ''
  },
]

const background = require('../../assets/bachgrund.png');
export default class MyPlants extends React.Component {
    render () {
        return (
            <ImageBackground source={background} style={styles.background}>
            <View>
            <Text style={styles.titleStyle}>My Plants page</Text>
            <ScrollView>
            {dummyPlants.map((plant)=>{
              return (
                <Card>
                  <CardItem bordered>
                    <Text>{plant.name}</Text>
                  </CardItem>
                  <CardItem bordered>
                      <CardItem style={styles.container}>
                        <Text>{plant.info}</Text>
                      </CardItem>
                      <CardItem style={styles.container}>
                        <Text>{plant.info}</Text>
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
  