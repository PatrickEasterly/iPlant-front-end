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
import { Font } from 'expo';

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
  StyleProvider,
  ImageBackground
} from "native-base";
import LightConditions from "../MyPlants/LightConditions";
// import MyPlants from "../Pages/MyPlants"
// import { StackNavigator } from "react-navigation";
// import axios from "axios";

const office = require('../../assets/rooms/office.jpg')
const hall = require('../../assets/rooms/hallway.jpg')
const kitchen = require('../../assets/rooms/kitchen.jpg')
const bathroom = require('../../assets/rooms/bathroom.jpg')
const porch = require('../../assets/rooms/porch.jpg')
const balcony = require('../../assets/rooms/balcony.jpg')
const livingroom = require('../../assets/rooms/livingroom.jpg')
const patio = require('../../assets/rooms/patio.jpg')
const bedroom = require('../../assets/rooms/bedroom.jpg')



const Stack = createStackNavigator();

class RoomsScreen1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
         dataSource: {},
         room: {},
        currentRoom: '',
        rooms: [
            {name: 'Office', img: office},
            {name: 'Hall', img: hall},
            {name: 'Kitchen', img: kitchen},
            {name: 'Bathroom', img: bathroom},
            {name: 'Porch', img: porch},
            {name: 'Balcony', img: balcony},
            {name: 'LivingRoom', img: livingroom},
            {name: 'Patio', img: patio},
            {name: 'Bedroom', img: bedroom},
        ]
      }
    }

    determineRoom() {
        if (this.state.currentRoom.name === 'Office') {
           this.addOffice()
        }
        if (this.state.currentRoom.name === 'Hall') {
            this.addHall()
        }
        if (this.state.currentRoom.name === 'Kitchen') {
            this.addKitchen()
        }
        if (this.state.currentRoom.name === 'Bathroom') {
            this.addBathroom()
        }
        if (this.state.currentRoom.name === 'Porch') {
            this.addPorch()
        }
        if (this.state.currentRoom.name === 'Balcony') {
            this.addBalcony()
        }
        if (this.state.currentRoom.name === 'LivingRoom') {
            this.addLivingroom()
        }
        if (this.state.currentRoom.name === 'Patio') {
            this.addPatio()
        }
        if (this.state.currentRoom.name === 'Bedroom') {
            this.addBedroom()
        }
    }
    
    addOffice() {
        const {navigation} = this.props;
        this.setState({
            room: {
                roomname: 'Office',
                hightemp: 77,
                lowtemp: 66,
                roomimg: office
            }
        }, () => {
            console.log('office added')
            console.log(this.state.room)
            navigation.navigate('LightConditions', {room: this.state.room})

        })
        
    }

    addHall() {
        const {navigation} = this.props;
        this.setState({
            room: {
                roomname: 'Hall',
                hightemp: 77,
                lowtemp: 66,
                roomimg: hall

            }
        }, () => {
            console.log('hall added')
            console.log(this.state.room)
            navigation.navigate('LightConditions', {room: this.state.room})
        })
    }

    addKitchen() {
        const {navigation} = this.props;
        this.setState({
            room: {
                roomname: 'Kitchen',
                hightemp: 77,
                lowtemp: 66,
                roomimg: kitchen

            }
        }, () => {
            console.log('kitchen added')
            console.log(this.state.room)
            navigation.navigate('LightConditions', {room: this.state.room})
        })
    }

    addBathroom() {
        const {navigation} = this.props;
        this.setState({
            room: {
                roomname: 'Bathroom',
                hightemp: 77,
                lowtemp: 66,
                roomimg: bathroom

            }
        }, () => {
            console.log('bathroom added')
            console.log(this.state.room)
            navigation.navigate('LightConditions', {room: this.state.room})
        })
    }

    addPorch() {
        const {navigation} = this.props;
        this.setState({
            room: {
                roomname: 'Porch',
                hightemp: 77,
                lowtemp: 66,
                roomimg: porch

            }
        }, () => {
            console.log('porch added')
            console.log(this.state.room)
            navigation.navigate('LightConditions', {room: this.state.room})
        })
    }

    addBalcony() {
        const {navigation} = this.props;
        this.setState({
            room: {
                roomname: 'Balcony',
                hightemp: 77,
                lowtemp: 66,
                roomimg: balcony

            }
        }, () => {
            console.log('balcony added')
            console.log(this.state.room)
            navigation.navigate('LightConditions', {room: this.state.room})
        })
    }

    addLivingroom() {
        const {navigation} = this.props;
        this.setState({
            room: {
                roomname: 'Livingroom',
                hightemp: 77,
                lowtemp: 66,
                roomimg: livingroom
            }
        }, () => {
            console.log('living room added')
            console.log(this.state.room)
            navigation.navigate('LightConditions', {room: this.state.room})
        })
    }

    addPatio() {
        const {navigation} = this.props;
        this.setState({
            room: {
                roomname: 'Patio',
                hightemp: 77,
                lowtemp: 66,
                roomimg: patio

            }
        }, () => {
            console.log('patio added')
            console.log(this.state.room)
            navigation.navigate('LightConditions', {room: this.state.room})
        })
    }

    addBedroom() {
        const {navigation} = this.props;
        this.setState({
            room: {
                roomname: 'Bedroom',
                hightemp: 77,
                lowtemp: 66,
                roomimg: bedroom

            }
        }, () => {
            console.log('bedroom added')
            console.log(this.state.room)
            navigation.navigate('LightConditions', {room: this.state.room})
        })
    }

  
  render() {
    const {navigation} = this.props;
    return (
        <StyleProvider style={getTheme(material)}>
        <Container>
        {/* <Header/> */}
        <View style={styles.header}>
            <Text>Pick A Home For Your Plant</Text>
            <Text style={{marginTop: 20}}> This will give us an idea of what your plants needs are</Text>
        </View>
        <View style={styles.MainContainer}>
        
        <FlatList
          data={this.state.rooms}
          contentContainerStyle={styles.col}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={
                () => this.setState({currentRoom: item}, () => {
                this.determineRoom()
            })
        } 
            style={{ flex: 1, flexDirection: 'column', margin: 10, padding: 1, justifyContent: 'center', alignItems: 'center'}}>
                {/* <ImageBackground
                    source={{ uri: item.img }}
                    style={{
                        height: 100,
                        width: 100,
                        position: 'relative', // because it's parent
                        top: 2,
                        left: 2
                    }}
                    >
                    <Text
                        style={{
                        fontWeight: 'bold',
                        color: 'white',
                        position: 'absolute', // child
                        bottom: 0, // position where you want
                        left: 0
                        }}
                    >
                        {item.name}
                    </Text>
                </ImageBackground> */}
              <Image style={styles.imageThumbnail} source={item.img}>
              </Image>
                <View style={{alignItems: 'end', paddingTop: 12, position: 'absolute'}} >
                    <Text style={{color: 'white'}}>{item.name}</Text>
                </View>

            </TouchableOpacity>
          )}
          //Setting the number of column
          numColumns={3}
          columnWrapperStyle={styles.col} 
          keyExtractor={(item, index) => index.toString()}
        />

    
      </View>

        </Container>

        </StyleProvider>

        
    );
  }
}



export default function Rooms (props) {
    const {navigation} = props;
    return(

    <NavigationContainer independent={true}>
    <Stack.Navigator headerMode="float" mode="modal">
      <Stack.Screen name={'RoomsScreen1'} component={RoomsScreen1}
      options={{headerShown: false}} />
      <Stack.Screen options={{title: 'Light', headerBackTitle: ''}}  name={'LightConditions'}>
          
            {props => (
            <LightConditions
            {...props}
            TopLevelNavigation={navigation}
          />
          )}
      </Stack.Screen>
    </Stack.Navigator>
  </NavigationContainer>
    )
};



const styles = {
    col: {
        margin: 1, 
        padding: 1
    },
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: 60
  },
  imageThumbnail: {
    justifyContent: 'left',
    alignItems: 'end',
    height: 150,
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
    },
    header: {
        marginTop: 100,
        marginBottom: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }
};