
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, ImageBackground, ScrollView, TouchableOpacity, } from 'react-native';
// import dummyPlants from '../variables/dummyPlants';
import { Button, Segment, Text, Card, CardItem, Container, Header, Tabs, ScrollableTab, Tab } from 'native-base';
import SinglePlant from '../MyPlants/SinglePlant';
import axios from 'axios';

const API = 'http://192.168.1.67:6000/api/users/1'; 
const background = require('../../assets/bachgrund.png');
const Stack = createStackNavigator();

class PlantsFirstScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: [],
      rooms: [],
      plants: []
    }
  }

  // didmount
  componentDidMount() {
    axios.get(API)
    .then((res) => {
      console.log(res.data)
      let rooms = res.data.plants.map((plant)=>{
        return plant.room.roomname;
      })
      console.log(rooms)
      let plants = res.data.plants/*.map((plant)=>{
        return ({
          // Strip out the important bits and save them in one object
        })
      })*/
      this.setState({ user: res.data, rooms: ["All", ...rooms], plants });
    })
  }



  // render
  // if it jitters again, see https://github.com/GeekyAnts/NativeBase/issues/1198
    render() {
      const {navigation} = this.props;

        const roomList = this.state.rooms.map((room)=>{
          let plants = [...this.state.plants];
          if(room!=="All") {
            plants = plants.filter(function(plant) {
              return plant.room.roomname===room;
            })
            }
            console.log(room)
            console.table(plants)
            console.log('************did it filter?')
            plants = plants.map((plant)=>{
              return (
                <TouchableOpacity onPress={()=>navigation.navigate('SinglePlant', {name: `${plant.name}`})}>
              <Card>
                <CardItem bordered >
                  <Text>{plant.plantInfo.commonname}</Text>
                </CardItem>
                <CardItem bordered>
                    <CardItem style={styles.container}>
                      <Text>{plant.room.roomname}</Text>
                    </CardItem>
                    <CardItem style={styles.container}>
                      <Text>{plant.plantInfo.photo}</Text>
                    </CardItem>
                </CardItem>
              </Card>
              </TouchableOpacity>
              )
            })

          return (
            <Tab heading={room}>
                <ScrollView>
                  {plants}
                </ScrollView>
            </Tab>
          )
        })
      return (
        <View style={styles.itemContainer}>
          {/* Tabs */}
          {/* <Header hasTabs /> */}
          {this.state.plants.length > 0 && 
          <Tabs renderTabBar={() => <ScrollableTab/>}>
            {/* <Tab heading={"lol"}>
            <View>
              <ScrollView>
                {<PlantList room={"All"}
                plants={this.state.plants}
                />}
              </ScrollView>
            </View>
            </Tab> */}
            {roomList}
            {roomList}
          </Tabs>
          }
        </View>
      )
    }
}

// function PlantList ({room, plants}) {
//   if(room!=="All") {
//   plants.filter(function(plant) {
//     return plant.room.roomname===room;
//   })
//   }
//   return (plants.map((plant)=>{ 
//     console.log(plant)
//     return (
//         <TouchableOpacity onPress={()=>navigation.navigate('SinglePlant', {name: `${plant.name}`})}>
//       <Card>
//         <CardItem bordered >
//           <Text>{plant.plantInfo.commonname}</Text>
//         </CardItem>
//         <CardItem bordered>
//             <CardItem style={styles.container}>
//               <Text>{plant.room.roomname}</Text>
//             </CardItem>
//             <CardItem style={styles.container}>
//               <Text>{plant.plantInfo.photo}</Text>
//             </CardItem>
//         </CardItem>
//       </Card>
//       </TouchableOpacity>
//       )
//     })
//   )
// }

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