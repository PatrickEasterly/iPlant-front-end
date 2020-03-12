import React, { useState, useEffect } from "react";
import {
  View,
  Segment,
  Text,
  Button,
  Card,
  CardItem,
  Container,
  Header,
  Content,
  Thumbnail,
  Icon,
  Left,
  Body,
  Right,
  List,
  ListItem
} from "native-base";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
const Stack = createStackNavigator();
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import { AppContext } from "../../Context";
const office = require('../../assets/rooms/office.jpg')
const hall = require('../../assets/rooms/hallway.jpg')
const kitchen = require('../../assets/rooms/kitchen.jpg')
const bathroom = require('../../assets/rooms/bathroom.jpg')
const porch = require('../../assets/rooms/porch.jpg')
const balcony = require('../../assets/rooms/balcony.jpg')
const livingroom = require('../../assets/rooms/livingroom.jpg')
const patio = require('../../assets/rooms/patio.jpg')
const bedroom = require('../../assets/rooms/bedroom.jpg')
const images = {
  patio,
  office,
  hall,
  kitchen,
  bathroom,
  porch,
  balcony,
  livingroom,
  patio,
  bedroom,
}

// import { AppContext } from '../..';
const API = "http://10.150.41.136:5000/app/room/";
const API2 = 'http:/10.150.41.136:5000/app/plant'

class AddPlantToRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      currentRoomId: '',
      initialPage: 0,
      activeTab: 0,
      roomimg: [],
      currentRoomsPlants: [],
      plant: this.props.route.params.plant
    };
    this.getRoom = this.getRoom.bind(this);
  }


  componentDidMount() {
    this.getRoom();
  }

  getRoom() {
    axios
      .get(API, {
        headers: {
          Authorization: `BEARER ${this.context.loggedIn}`
        }
  })
      .then(response => {
        console.log(response);
        console.log(response.data);
        this.setState({ rooms: response.data })
      })
      .catch(error => {
        console.error(error);
      });
  }

  addPlantToRoom(){
    const { navigation } = this.props;
   return (axios.post(API2 , {
        "roomid": this.state.currentRoomId,
        "plantinfoid": this.state.plant.id,
        "plantname": this.state.plant.commonname
    }, {
        headers: {
          Authorization: `BEARER ${this.context.loggedIn}`
        }
  }))
  console.log('inserted')
  console.log(this.state.currentRoomId)
  console.log(this.state.plant.id)
  console.log(this.state.plant.commonname)
  console.log('.')
 
}


  render() {
    let plant = this.state.plant;
    const {TopLevelNavigation} = this.props;
    
    return (
    <AppContext.Consumer>
      {context => (

        <Content>
        <View style={{margin: 20}}>
        <ListItem>
            <Left>
                <Text >What Room Will Your Plant Live In</Text>
            </Left>
            <Right>
                <Button transparent>
                    <Icon name="add-circle"></Icon>                
                </Button>
            </Right>
        </ListItem>
        </View>
        <List>
          <ScrollView>
            {this.state.rooms.map((room, i) => {
                return (
                  <ListItem
                    thumbnail
                    style={{ margin: 6, marginLeft: 0, paddingLeft: 0 }}
                    onPress={() =>
                      this.setState({currentRoomId: room.id}, async () => {
                          await this.addPlantToRoom()
                          context.setShouldUpdate(true)
                          TopLevelNavigation.navigate({name: 'MyPlants' })
                      })
                    }
                  >
                    <Left style={{ marginLeft: 0, paddingLeft: 0 }}>
                      
                      <Thumbnail
                        style={{
                          marginLeft: 10,
                          paddingLeft: 0,
                          borderRadius: 5,
                          height: 70,
                          width: 70,
  
                          shadowColor: "#0000",
                          shadowOffset: { width: 0, height: 1 },
                          shadowOpacity: 0.8,
                          shadowRadius: 50
                        }}
                        square
                        source={{ uri: images[room.roomname] }}
                        onError={() => {
                          this.setState({
                            roomimg: patio
                          })
                        }}
                      />
                    </Left>
                    <Body>
                      <Text style={{ padding: 2, textTransform: "capitalize" }}>
                        {room.roomname}
                      </Text>
                      <Text
                        style={{ padding: 3, textTransform: "capitalize" }}
                        note
                        numberOfLines={1}
                      >
                        {/* {plant.latinname} */}
                      </Text>
                    </Body>
                    <Right>
                      <Button transparent>
                        <Icon name="arrow-forward" />
                      </Button>
                    </Right>
                  </ListItem>
                );
            
              
            })}
          </ScrollView>
        </List>
      </Content>
      )}

    </AppContext.Consumer>
    );
  }
}

AddPlantToRoom.contextType = AppContext;

export default AddPlantToRoom;

const styles = {
  hiddenCard: {
    display: "none"
  },
  needsWater: {
    backgroundColor: "yellow"
  },
  hasWater: {
    backgroundColor: "blue"
  },
  tabbyy: {
    color: "red",
    flex: 1
  },
  container: {
    flex: 1, // This makes the app span the screen
    // marginTop: 24   // Gives a little whitespace at the top of the screen
    flexWrap: "wrap"
  },
  titleStyle: {
    fontSize: 30,
    color: "blue",
    textAlign: "center",
    marginTop: 24,
    marginBottom: 10
  },
  background: {
    flex: 1 // We really want this, so the background takes up the whole background
  },
  itemContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  clickMe: {
    flex: 1,
    color: "blue",
    alignItems: "center"
  },
  buttonText: {
    color: "#0f0"
  },
  buttonStyle: {
    margin: 10
  }
};


plants: [ {}]