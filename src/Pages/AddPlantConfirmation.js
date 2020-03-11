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
// import { AppContext } from '../../Context';
const API = "http://192.168.1.132:5000/api/rooms/user/1";
const API2 = 'http://192.168.1.132:5000/app/plant'


class AddPlantConfirmation extends React.Component {
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

    render() {
        return (
            <Text>Confirmation</Text>
        )
    }
}

export default AddPlantConfirmation 