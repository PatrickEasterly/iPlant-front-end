// First thing you see on the plants tab. 
// It holds the rooms, shows all plants by default, and allows filtering by room
// \ MyPlants *
//  \ Rooms 
//   \ Plants

// import 'react-native-gesture-handler'; // supposedly required; mine is running fine without it.
import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, ImageBackground, ScrollView, TouchableOpacity, } from 'react-native';
import dummyPlants from '../variables/dummyPlants';
import { Button, Segment, Text, Card, CardItem } from 'native-base';
import SinglePlant from '../MyPlants/SinglePlant';

const background = require('../../assets/bachgrund.png');

const Stack = createStackNavigator();

// get all the plants for the user
// http://localhost:5000/api/plants/user/1
 
function PlantsFirstScreen({navigation}) {

  // The useState hook lets us use state in a functional component.
  // const [pieceOfState, methodToUpdateState] = useState(valueOfPieceOfState)

  const [currentTab, updateTab] = useState(0);
  const [currentRoom, updateRoom] = useState('All');
  const [userPlants, getUserPlants] = useState([]);
  const [currentPlant, updateCurrentPlant] = useState('noplant');

  useEffect(()=>{
    async function goGetIt() {
        // change the userid on this dynamically
        const response = await fetch(`http://localhost:5000/api/plants/user/1`);
        const result = await response.json();
        console.log(result)
        getUserPlants(result);
    }
    goGetIt();
}, [])

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
            <TouchableOpacity onPress={()=>navigation.navigate('SinglePlant', {name: `${plant.name}`})}>
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
            </TouchableOpacity>
          </View>
        )
      })}
      </ScrollView>
    </View>
  </ImageBackground>
  )
}


export default function MyPlants() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator headerMode="float" mode="modal">
        <Stack.Screen name={'PlantsFirstScreen'} component={PlantsFirstScreen}
        options={{headerShown: false}} />
        <Stack.Screen name={'SinglePlant'} component={SinglePlant} />
      </Stack.Navigator>
    </NavigationContainer>

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

