import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
// import { AppContext } from '../../Context';
/*This is an Example of Grid View in React Native*/
//import rect in our project
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
//import all the components we will need

import Autocomplete from "native-base-autocomplete"; /* eslint-disable-line import/no-unresolved */
import {
  Button,
  Segment,
  Text,
  Card,
  CardItem,
  Container,
  Header,
  Tabs,
  ScrollableTab,
  Tab,
  StyleProvider
} from "native-base";
// import { StackNavigator } from "react-navigation";
import axios from "axios";
import {
  Content,
  Item,
  Input,
  Icon,
  ListItem,
  Thumbnail,
  Body,
  Left,
  Right,
  ActionSheet, 
  Title,

} from "native-base";
const office = require('../../assets/rooms/office.jpg')
const API = "http://192.168.0.151:5000/app/room/";
const Stack = createStackNavigator();
const dark = require('../../assets/lightConditions/dark.jpg')
const shade = require('../../assets/lightConditions/shade.jpg')
const partsun = require('../../assets/lightConditions/partsun.jpg')
const fullsun = require('../../assets/lightConditions/fullsun.jpg')

import { AppContext } from "../../Context";

class LightConditions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
         selectedLightCondition: {},
         room: this.props.route.params.room,
         lightConditions: [
            {name: 'Dark', img: dark },
            {name: 'Shade', img: shade },
            {name: 'Part sun, part shade', img: partsun},
            {name: 'Full sun', img: fullsun }
        ]
      }
    }

    componentDidMount() {
      console.log(this.props.route)
    }

    determineLightCondition() {
        if (this.state.selectedLightCondition.name === 'Dark') {
           this.addDarkRoom()
        }
        if (this.state.selectedLightCondition.name  === 'Shade') {
            this.addShadeRoom()
        }
        if (this.state.selectedLightCondition.name  === 'Part Sun, Part Shade') {
            this.addPartSunPartShadeRoom()
        }
        if (this.state.selectedLightCondition.name  === 'Full Sun') {
            this.addFullSunRoom()
        }
    }
    
    addDarkRoom() {
        axios.post(API,
        {
          "roomimg": this.state.room.roomimg,
          "roomname": this.state.room.roomname,
          "hightemp": this.state.room.hightemp,
          "lowtemp": this.state.room.lowtemp,
          "lightamount": this.state.selectedLightCondition.name
        }, {
          headers: {
            Authorization: `BEARER ${this.context.loggedIn}`
          }
        })
        .then((res) => {
          console.log('Dark Room added')
          console.log(this.state.selectedLightCondition)

        })
    }
    
        
    

    addShadeRoom() {
      axios.post(API,
        {
          "roomimg": this.state.room.roomimg,
          "roomname": this.state.room.roomname,
          "hightemp": this.state.room.hightemp,
          "lowtemp": this.state.room.lowtemp,
          "lightamount": this.state.selectedLightCondition.name
        }, {
          headers: {
            Authorization: `BEARER ${this.context.loggedIn}`
          }
        })
        .then((res) => {
          console.log('Shade Room added')
          console.log(this.state.selectedLightCondition)

        })
    }
    

    addPartSunPartShadeRoom() {
      axios.post(API,
        {
          "roomimg": this.state.room.roomimg,
          "roomname": this.state.room.roomname,
          "hightemp": this.state.room.hightemp,
          "lowtemp": this.state.room.lowtemp,
          "lightamount": this.state.selectedLightCondition.name
        }, {
          headers: {
            Authorization: `BEARER ${this.context.loggedIn}`
          }
        })
        .then((res) => {
          console.log('Part Sun Room added')
          console.log(this.state.selectedLightCondition)

        })
    }
    

    addFullSunRoom() {
      axios.post(API,
        {
          "roomimg": this.state.room.roomimg,
          "roomname": this.state.room.roomname,
          "hightemp": this.state.room.hightemp,
          "lowtemp": this.state.room.lowtemp,
          "lightamount": this.state.selectedLightCondition.name
        }, {
          headers: {
            Authorization: `BEARER ${this.context.loggedIn}`
          }
        })
        .then((res) => {
          console.log('Full Sun Room added')
          console.log(this.state.selectedLightCondition)

        })
    }


 
  render() {
    const {TopLevelNavigation} = this.props;
    return (
    
      <AppContext.Consumer>
        {context => (
          
          <Container>
            <StyleProvider style={getTheme(material)}>
                <View style={styles.MainContainer}>
                <FlatList
                  data={this.state.lightConditions}
                  renderItem={({ item }) => (
                    <View
                    style={{ flex: 1, flexDirection: 'column', margin: 15, justifyContent: 'center'}}>
              
                        <ListItem thumbnail
                        onPress={
                          () => this.setState({selectedLightCondition: item}, async () => {
                              // console.log(this.state.selectedLightCondition)
                              await this.determineLightCondition()
                              // navigation.navigate('MyPlants')
                              context.setShouldUpdate(true)
                              TopLevelNavigation.navigate({name: 'MyPlants' })
                            })
                  } 
                        >
                          <Left>
                            <Thumbnail style={styles.imageThumbnail} square source={item.img} />
                          </Left>
                          <Body style={{height:110, justifyContent: 'center'}}>
                            <Text>{item.name}</Text>
                            <Text note numberOfLines={1}>Its time to build a difference . .</Text>
                          </Body>
                          <Right>
                            {/* <Button transparent>
                              <Text>View</Text>
                            </Button> */}
                          </Right>
                        </ListItem>
                    </View>
                  )}
                  //Setting the number of column
                  numColumns={1}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>

            </StyleProvider>
          </Container>
          
        )}
      </AppContext.Consumer>

        
    );
  }

}

LightConditions.contextType = AppContext;


export default LightConditions

const styles = {
    MainContainer: {
      justifyContent: 'center',
      flex: 1,
      paddingTop: 30,
    },
    imageThumbnail: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 110,
      width: 110,
      marginTop: 10,
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.00,
      
      elevation: 24,
      }
  };