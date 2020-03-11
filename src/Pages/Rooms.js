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
import LightConditions from "../MyPlants/LightConditions";
import MyPlants from "../Pages/MyPlants"
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
            {name: 'Hall', img: ''},
            {name: 'Kitchen', img: ''},
            {name: 'Bathroom', img: ''},
            {name: 'Porch', img: ''},
            {name: 'Balcony', img: ''},
            {name: 'LivingRoom', img: ''},
            {name: 'Patio', img: ''},
            {name: 'Bedroom', img: ''},
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
        if (this.state.currentRoom.name === 'Livingroom') {
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
        this.setState({
            room: {
                roomname: 'Hall',
                hightemp: 77,
                lowtemp: 66
            }
        }, () => {
            console.log('hall added')
            console.log(this.state.room)

        })
    }

    addKitchen() {
        this.setState({
            room: {
                roomname: 'Kitchen',
                hightemp: 77,
                lowtemp: 66
            }
        }, () => {
            console.log('kitchen added')
            console.log(this.state.room)
        })
    }

    addBathroom() {
        this.setState({
            room: {
                roomname: 'Bathroom',
                hightemp: 77,
                lowtemp: 66
            }
        }, () => {
            console.log('bathroom added')
            console.log(this.state.room)
        })
    }

    addPorch() {
        this.setState({
            room: {
                roomname: 'Porch',
                hightemp: 77,
                lowtemp: 66
            }
        }, () => {
            console.log('porch added')
            console.log(this.state.room)
        })
    }

    addBalcony() {
        this.setState({
            room: {
                roomname: 'Balcony',
                hightemp: 77,
                lowtemp: 66
            }
        }, () => {
            console.log('balcony added')
            console.log(this.state.room)
        })
    }

    addLivingroom() {
        this.setState({
            room: {
                roomname: 'Livingroom',
                hightemp: 77,
                lowtemp: 66
            }
        }, () => {
            console.log('living room added')
            console.log(this.state.room)
        })
    }

    addPatio() {
        this.setState({
            room: {
                roomname: 'Patio',
                hightemp: 77,
                lowtemp: 66
            }
        }, () => {
            console.log('patio added')
            console.log(this.state.room)
        })
    }

    addBedroom() {
        this.setState({
            room: {
                roomname: 'Bedroom',
                hightemp: 77,
                lowtemp: 66
            }
        }, () => {
            console.log('bedroom added')
            console.log(this.state.room)
        })
    }

  
  render() {
    const {navigation} = this.props;
    return (
        <Container>
        <Header/>
        <View style={styles.MainContainer}>
        <FlatList
          data={this.state.rooms}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={
                () => this.setState({currentRoom: item}, () => {
                this.determineRoom()
                // navigation.navigate('LightConditions', {room: this.state.room})
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
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

        </Container>

        
    );
  }
}



export default function Rooms () {
    return(

    <NavigationContainer independent={true}>
    <Stack.Navigator headerMode="float" mode="modal">
      <Stack.Screen name={'RoomsScreen1'} component={RoomsScreen1}
      options={{headerShown: false}} />
      <Stack.Screen name={'LightConditions'} component={LightConditions}  />
      <Stack.Screen name={'MyPlants'} component={MyPlants}  />
    </Stack.Navigator>
  </NavigationContainer>
    )
};



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