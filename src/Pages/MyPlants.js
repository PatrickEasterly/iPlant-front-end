// First thing you see on the plants tab. It holds the rooms
// \ MyPlants
//  \ Rooms *
//   \ Plants

// import 'react-native-gesture-handler'; // supposedly required; mine is running fine without it.
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, ImageBackground, ScrollView, Button } from 'react-native';
import { Card, CardItem, } from 'native-base';
// Subcomponents for each room
import Hall from '../MyPlants/RoomComponents/Room';

// This is where the links for all the subcomponents live. 
const Stack = createStackNavigator();

// We'll be getting some real data from our backend. For now, I'll use this for the cards.
const dummyRooms = [
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

const background = require('../../assets/bachgrund.png');

function DefaultMyPlants({navigation}) {
  return (
    <ImageBackground source={background} style={styles.background}>
    <View>
        
    <Text style={styles.titleStyle}>My Rooms</Text>
      <ScrollView>
        {dummyRooms.map((room)=>{
          const name = room.name;
          return (
            <Card>
              <CardItem>
                <Text>{room.name}</Text>
              </CardItem>
              <CardItem>
                <Button
                  title="Go to Details"
                  onPress={() => navigation.navigate(name, {
                    name
                  })}
                />
              </CardItem>
            </Card>
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
        {/* https://reactnavigation.org/docs/headers/ holds the truth for styling headers*/}

        <Stack.Navigator 
        // clicking a link brings the body of the modal from the bottom and the header from the top. it looks real nice.
        headerMode="float"
        mode="modal" 
        >
            <Stack.Screen 
            name={'DefaultMyPlants'} 
            component={DefaultMyPlants} 
            options={{
              headerShown: false,
            }} 
            /> 
            <Stack.Screen name={'Kitchen'} component={Hall}
            options={modalHeaders} 
            />
            <Stack.Screen name={'LivingRoom'} component={Hall} options={modalHeaders}/>
            <Stack.Screen name={'Hall'} component={Hall} options={modalHeaders}/>
            <Stack.Screen name={'Bedroom'} component={Hall} options={modalHeaders}/>
            <Stack.Screen name={'Bathroom'} component={Hall} options={modalHeaders}/>
        </Stack.Navigator>
      </NavigationContainer>
    )
}

// Options object for the modals that get rendered in. Alter as you please.
const modalHeaders = {
  headerStyle: {backgroundColor: '#0ff', height: 40},
  headerTitleStyle: {
    color: '#000',
    fontWeight: 'bold',
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

