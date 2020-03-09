
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, ImageBackground, ScrollView, TouchableOpacity, Image} from 'react-native';
import { Button, Segment, Text, Card, CardItem, Container, Header, Tabs, ScrollableTab, Tab, Left, Right } from 'native-base';
import SinglePlant from '../MyPlants/SinglePlant';
import axios from 'axios';
// import _ from 'lodash';

// const API = 'http://192.168.0.119:6000/api/users/2'; 
const API = 'http://b51f797c.ngrok.io/api/users/2'; 
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

  // get rooms array, plants objects
  componentDidMount() {
    axios.get(API)
    .then((res) => {
      let rooms = res.data.plants.map((plant)=>plant.room.roomname)
      rooms = [...new Set(rooms)]
      let plants = [...res.data.plants];
      plants.map((item)=>item.needsWater=this.checkWater(item))
      // console.log(plants)
      this.setState({ user: res.data, rooms: ["All", ...rooms], plants });
    })
    // .then((res)=>{
    // })
  }

  checkWater(plant) {
    // Add the big switch statement later
    return plant.needsWater = true;
  }

  addWater(plant) {
    // Run the waterplant post, and then confirm it

    // Get the plant, set needsWater to false in state

    let current = {...this.state};
    let changedPlant = current.plants[current.plants.indexOf(plant)]
    changedPlant.needsWater = false;
    this.setState({
      ...current
    })
  }

  render() {
    const {navigation} = this.props;
    
    // Render the tabs heading as roomname and tab as the appropriate content
    const roomList = this.state.rooms.map((room)=>{
      let plants = this.state.plants;
      // Show all plants for selected room
      if(room!=="All") {
        plants = plants.filter(function(plant) {
          return plant.room.roomname===room;
      })
      }
      // Once the plants are filtered, make clickable elements for them
      plants = plants.map((plant)=>{
        return (
          <TouchableOpacity onPress={()=>navigation.navigate('SinglePlant', {plant: plant})}>
            <Card>
              <CardItem bordered style={styles.horizontalContainer}>
                <Left><Text>{plant.plantInfo.commonname}</Text></Left>
                {plant.needsWater ?
                <Right><Button warning onPress={()=>{
                  this.addWater(plant)
                }}>
                <Text>😩💧</Text></Button></Right> :
                <Right><Button  success><Text>😊✔️</Text></Button></Right>}
              </CardItem>
              <CardItem bordered>
                <CardItem style={styles.container}>
                  {/* <Text>{plant.room.roomname}</Text> */}
                  <Text>{plant.room.roomname}</Text>
                </CardItem>
                <CardItem style={styles.container}>
                  <Image source={{uri: plant.plantInfo.photo}} style={{height:50, width: 50}}/>
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
        <View>
          <Header hasTabs />
        </View>
        {this.state.plants.length > 0 && 
          <Tabs renderTabBar={() => <ScrollableTab/>}>
            {roomList}
          </Tabs>
        }
      </View>
    )
  }
}

function FuckIt() {
  return (
    <View><Text>Yeet</Text></View>
  )
}

// When you choose a plant, show it as a modal
export default function MyPlants() {
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator headerMode="float" mode="modal">
          <Stack.Screen name={'PlantsFirstScreen'} component={PlantsFirstScreen}
          options={{headerShown: false}} />
          <Stack.Screen name={'SinglePlant'} component={SinglePlant} />
          {/* <Stack.Screen name={'FuckIt'} component={FuckIt} /> */}
          <Stack.Screen name={'FuckIt'}>
            {props=><FuckIt></FuckIt>}
          </Stack.Screen>
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
      horizontalContainer: {
        flex: 1,
        flexDirection: 'row',
        // justifyContent: 'spaceBetween'
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