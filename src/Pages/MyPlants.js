// First thing you see on the plants tab. 
// It holds the rooms, shows all plants by default, and allows filtering by room
// \ MyPlants *
//  \ Rooms 
//   \ Plants

// import 'react-native-gesture-handler'; // supposedly required; mine is running fine without it.
import React, { useState } from 'react';
import { View, ImageBackground, ScrollView, } from 'react-native';
import dummyPlants from '../variables/dummyPlants';
import { Button, Segment, Text, Card, CardItem } from 'native-base';

const background = require('../../assets/bachgrund.png');

export default function MyPlants() {

  // The useState hook lets us use state in a functional component.
  // const [pieceOfState, methodToUpdateState] = useState(valueOfPieceOfState)

  const [currentTab, updateTab] = useState(0);
  const [currentRoom, updateRoom] = useState('All');

  return (
    <ImageBackground source={background} style={styles.background}>
    <View>
        
    <Text style={styles.titleStyle}>My Plants</Text>

    {/* Scrolling tabs */}
    {/* If the current tab is selected, it becomes active. */}
    {/* Clicking one updates the state of current tab and makes the tab you clicked active */}

        <View style={styles.itemContainer}>
        <Segment style={{overflow: 'auto', width: 300}}>
          {dummyRooms.map((room)=>{
            const index = dummyRooms.indexOf(room);
            return (
            <Button 
              active={currentTab === index}
              key={index}
              onPress={()=>{
                updateTab(index);
                updateRoom(room.name);
              }}
            >
              <Text>{room.name}</Text>
            </Button>)
          })}
        </Segment>
        </View>

    {/* Plants */}
    

      <ScrollView>
      {dummyPlants.map((plant)=>{
        return (
          <View>
            {/* If current room is all, show all. Otherwise, if current room matches plant room, just show those. */}
            <Card style={(currentRoom==='All') ? {} : (currentRoom===plant.room) ? {} : styles.hiddenCard}>

              {/* If the plant needs watering, the title background turns yellow; if they're all good, it's green   */}
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
          </View>
        )
      })}
      </ScrollView>
    </View>
  </ImageBackground>
  )
}


const styles = {
  hiddenCard: {
    display: 'none'
  },
  needsWater: {
    backgroundColor: 'yellow',
  },
  hasWater: {
    backgroundColor: 'blue',
  },
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

// We'll be getting some real data from our backend. For now, I'll use this for the cards.
const dummyRooms = [
  {
    name: 'All'
  },
  {
    name: 'Kitchen'
  },
  {
    name: 'Hall'
  },
  {
    name: 'LivingRoom'
  },
  {
    name: 'Bedroom'
  },
  {
    name: 'Bathroom'
  },
];