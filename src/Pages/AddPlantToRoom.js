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
import { AppContext } from '../../Context';
const API = "http://192.168.1.132:5000/api/rooms/user/1";
const API2 = 'http://192.168.1.132:5000/app/plant'

export default class AddPlantsRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      currentRoomId: '',
      initialPage: 0,
      activeTab: 0,
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
      .get(API)
      .then(response => {
        console.log(response);
        console.log(response.data);
        this.setState({ rooms: response.data }, () => {});
      })
      .catch(error => {
        console.error(error);
      });
  }

  addPlantToRoom(){
    axios.post(`${API2}`, {
        userid: 1,
        roomid: this.state.currentRoomId,
        plantinfoid: this.state.plant.id,
        plantname: this.state.plant.commonname
    }, {
        headers: {
          Authorization: `BEARER ${this.context.loggedIn}`
        }
  })
  console.log('inserted')
}


  renderRooms() {
    {
      this.state.rooms.map(room => {
        return (
          <ListItem
            thumbnail
            style={{ margin: 6, marginLeft: 0, paddingLeft: 0 }}
            onPress={() =>
              this.setState({currentRoomId: room.roomid}, () => {
                  this.addPlantToRoom()
              })
            
            }
          >
            <Left style={{ marginLeft: 0, paddingLeft: 0 }}>
              <Thumbnail
                style={{
                  marginLeft: 0,
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
                // source={{ uri: plant.photo }}
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
      });
    }
  }

  render() {
    let plant = this.state.plant;
    return (
    
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
            {this.state.rooms.map(room => {
              return (
                <ListItem
                  thumbnail
                  style={{ margin: 6, marginLeft: 0, paddingLeft: 0 }}
                  onPress={() =>
                    this.setState({currentRoomId: room.roomid}, () => {
                        this.addPlantToRoom()
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
                      source={{ uri: plant.photo }}
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
    );
  }
}

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
