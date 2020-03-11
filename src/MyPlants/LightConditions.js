import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
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
  Tab
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
  ActionSheet
} from "native-base";
const office = require('../../assets/rooms/office.jpg')
const API = "http://192.168.0.150:5000/app/room";
const Stack = createStackNavigator();
const dark = require('../../assets/lightConditions/dark.jpg')

class LightConditions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
         selectedLightCondition: {},
         room: this.props.route.params.room,
         lightConditions: [
            {name: 'Dark', img: dark },
            {name: 'Shade', img:'' },
            {name: 'Part sun, part shade', img: ''},
            {name: 'Full sun', img:'' }
        ]
      }
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
            axios.post(API, {
                "userid": 1,
                "roomimg": this.state.room.roomimg,
                "roomname": this.state.room.roomname,
                "hightemp": this.state.room.hightemp,
                "lowtemp": this.state.room.lowtemp,
                "lightamount": this.state.selectedLightCondition
            }, () => {
                console.log('Dark Room added')
                console.log(this.state.selectedLightCondition)
            })
           
        
    }

    addShadeRoom() {
        this.setState({
            selectedLightCondition: 'Dark'
        }, () => {
            axios.post(API, {
                "userid": 1,
                "roomimg": this.state.room.roomimg,
                "roomname": this.state.room.roomname,
                "hightemp": this.state.room.hightemp,
                "lowtemp": this.state.room.lowtemp,
                "lightamount": this.state.selectedLightCondition
            })
            console.log('Dark Room added')
            console.log(this.state.selectedLightCondition)
        })
    }

    addPartSunPartShadeRoom() {
        this.setState({
            selectedLightCondition: 'Dark'
        }, () => {
            axios.post(API, {
                "userid": 1,
                "roomimg": this.state.room.roomimg,
                "roomname": this.state.room.roomname,
                "hightemp": this.state.room.hightemp,
                "lowtemp": this.state.room.lowtemp,
                "lightamount": this.state.selectedLightCondition
            })
            console.log('Dark Room added')
            console.log(this.state.selectedLightCondition)
        })
    }

    addFullSunRoom() {
        this.setState({
            selectedLightCondition: 'Dark'
        }, () => {
            axios.post(API, {
                "userid": 1,
                "roomimg": this.state.room.roomimg,
                "roomname": this.state.room.roomname,
                "hightemp": this.state.room.hightemp,
                "lowtemp": this.state.room.lowtemp,
                "lightamount": this.state.selectedLightCondition
            })
            console.log('Dark Room added')
            console.log(this.state.selectedLightCondition)
        })
    }


 
  render() {
    const {navigation} = this.props;
    return (
        <Container>
        <View style={styles.MainContainer}>
        <FlatList
          data={this.state.lightConditions}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={
                () => this.setState({selectedLightCondition: item}, () => {
                    // console.log(this.state.selectedLightCondition)
                    this.determineLightCondition()
                    // navigation.navigate('MyPlants')
            })
        } 
            style={{ flex: 1, flexDirection: 'column', margin: 15, justifyContent: 'center'}}>
              <Image style={styles.imageThumbnail} source={item.img} />
                <View style={{alignItems: 'center', marginTop: 10}} >
                    <Text>{item.name}</Text>
                </View>
            </TouchableOpacity>
          )}
          //Setting the number of column
          numColumns={1}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
        </Container>

        
    );
  }

}



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
      height: 100,
      width: 100
    },
  };