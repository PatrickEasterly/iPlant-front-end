
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, ImageBackground, ScrollView, TouchableOpacity, Image} from 'react-native';
import { Button, Segment, Text, Card, CardItem, Container, Header, Tabs, ScrollableTab, Tab, Left, Right } from 'native-base';
import SinglePlant from '../MyPlants/SinglePlant';
import axios from 'axios';
import moment from 'moment';
import { AppContext } from '../../Context';
// import _ from 'lodash';

const API = 'http://192.168.0.150:5000/app/user/'; 
// const background = require('../../assets/bachgrund.png');
 
// const API = 'http://833a33e6.ngrok.io/api/users/2'; 
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
    this.getPlantData()
  }
  //checkWater takes in a plant object with waters array.
  // returns true if plant needs water.
  // returns false if plant doesn't need water.

  getPlantData = () => {
    console.log(this.context)
    axios.get(API, {
      headers: {
        Authorization: `BEARER ${this.context.loggedIn}`
      }
    }
    )
    .then((res) => {
      console.log(res)
      let rooms = res.data.plants.map((plant)=>plant.room.roomname)
      rooms = [...new Set(rooms)]
      let plants = [...res.data.plants];
      console.log(plants)
      plants.map((item)=>item.needsWater=this.checkWater(item))
      // console.log(plants)
      this.setState({ user: res.data, rooms: ["All", ...rooms], plants });
      
    })
  }

  checkWater(plant) {
    // console.log(plant)
    // console.log('inside')
    let now = moment();
    if(plant.waters.length == 0){
        return true;
    }
    let recentWater = moment(plant.waters[plant.waters.length-1].watertime);
    // console.log(moment(recentWater));
    if (plant.plantInfo.waterneeds.includes("high")){
        if (recentWater > now.subtract(3, 'days')){
            return false;
        }
        return true;
    }
    if (plant.plantInfo.waterneeds.includes("moderate")){
        if (recentWater > now.subtract(8, 'days')){
            return false;
        }
        return true;
    }
    if (plant.plantInfo.waterneeds.includes("low")){
        if (recentWater > now.subtract(3, 'weeks')){
            return false;
        }
        return true;
    }
    if(plant.plantInfo.waterneeds.includes("dry")){
        return false;
    }
    return true;
}

  async addWater(plant) {
    // Run the waterplant post, and then confirm it
    await axios.post(`http://833a33e6.ngrok.io/app/water`, 
    {"plantid": plant.id}, {
      headers: {
        Authorization: `BEARER ${this.context.loggedIn}`
      }
    })
    // Get the plant, set needsWater to false in state
    let current = {...this.state};
    let changedPlant = current.plants[current.plants.indexOf(plant)]
    changedPlant.needsWater = false;
    console.log(plants)
    this.setState({
      ...current
    })
  }

  render() {
    if(this.props.route?.params?.shouldUpdate) {
      debugger
      this.getPlantData()
    }
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
            <TouchableOpacity 
            key={plant.id} 
            onPress={()=>navigation.navigate('SinglePlant', {plant: plant})}>
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
        <AppContext.Consumer>
          {context => {
            if (context.shouldUpdate) {
              this.getPlantData()
              context.setShouldUpdate(false)
            }
            return (
            <View style={styles.itemContainer}>
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

          }}
          </AppContext.Consumer>







      )
    }
  }

PlantsFirstScreen.contextType = AppContext;

export default function MyPlants() {
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator headerMode="float" mode="modal">
          <Stack.Screen name={'PlantsFirstScreen'} component={PlantsFirstScreen}
          options={{headerShown: false}} />
          <Stack.Screen name={'SinglePlant'} component={SinglePlant} />
          {/* <Stack.Screen name={'FuckIt'}>
            {props=><FuckIt></FuckIt>}
          </Stack.Screen> */}
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