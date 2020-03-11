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
  // Icon,
  Left,
  Body,
  Right
} from "native-base";
// import Icon from 'react-native-vector-icons/AntDesign';
import Icon from '@mdi/react'
import { mdiWater, mdiFlower, mdiAlert, mdiWeatherSunny, mdiWhiteBalanceSunny, mdiSprout, mdiLeaf,  } from '@mdi/js'
import { ImageBackground, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import moment from 'moment';
const Stack = createStackNavigator();


const background = require('../../assets/furtherShoppedPlant.png')
// const plantpic = require("http://plantdatabase.kpu.ca/images/habit/tackoh1.jpg");

class SinglePlant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plant: this.props.route.params.plant,
      activePage: 1
    };
  }

  selectComponent = activePage => () => this.setState({ activePage });

  _renderComponent = () => {
    let plant = this.state.plant;
    if (this.state.activePage === 1) {
      if(plant.needsWater) {
        return (
          <Card key="key1">
            <CardItem bordered>
              <Left>
              <Text>Needs water</Text>
              </Left>
              <Right>
              <Text><Icon 
              path={mdiAlert}
              title="water"
              size={1}
              color="green"
              /></Text>
              </Right>
              {/* <Text>{plant.plantInfo.commonname}</Text> */}
            </CardItem>
            <CardItem bordered>
              <Text>Your {plant.plantInfo.commonname} needs water.</Text>
            </CardItem>
          </Card>
        );
      }
      return (
        <Card  key="key2">
          <CardItem bordered>
            <Left>
            <Text>Up to date</Text>
            </Left>
            <Right>
              <Text><Icon 
              path={mdiFlower}
              title="water"
              size={1}
              color="green"
              /></Text>
            </Right>
          </CardItem>
          <CardItem bordered>
            <Text>Your {plant.plantInfo.commonname} has water and is doing great!</Text>
          </CardItem>
        </Card>
      );
    }
    if (this.state.activePage === 2) {
      return (
        <View  key="key3">
          <Text>Care History</Text>
          <Card>
            {/* Currently returns 'You watered on: 2020-01-08', lets make it prettier */}
            {plant.waters.map((water)=>{
              let wawa = water.watertime.split('').slice(0, water.watertime.indexOf('T')).join('') //["2", "0", "2", "0", "-", "0", "1", "-", "0", "8"]
              return (
                <CardItem bordered>
                  <Text>You watered on: {wawa}</Text>
                </CardItem>
              )
            })}
          </Card>
        </View>
      )
    } else {
      return (
        <View>
          <Card>
            <CardItem>
            <Left>
            <Text>Water Needs</Text>
            </Left>
            <Right>
              <Text><Icon 
              path={mdiWater}
              title="water"
              size={1}
              color="green"
              /></Text>
            </Right>
            </CardItem>
          </Card>
        </View>
      )
    }
  };
  render() {
    let plant = this.state.plant;
    const { navigation } = this.props;
    console.log(plant.needsWater)
    const isThirsty = plant.needsWater ? '#f0f' : '#0f0';
    return (
      <Container>
        <Content style={{backgroundColor: isThirsty}}>
          <Card>
            <CardItem>
              <Left style={{ height: 70 }}>
                <Body>
                  <Text
                    style={{
                      textTransform: "capitalize",
                      paddingBottom: 5,
                      fontSize: 20
                    }}
                  >
                    {plant.plantInfo.commonname}
                  </Text>
                  <Text style={{ textTransform: "capitalize" }} note>
                    {plant.plantInfo.latinname}
                  </Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image
                source={{ uri: plant.plantInfo.photo }}
                style={{ height: 240, width: null, flex: 1 }}
              />
            </CardItem>
            {/* <CardItem> */}
            {/* <Button
              onPress={() => navigation.navigate("AddPlantToRoom")}
              style={{
                justifyContent: "center",
                backgroundColor: "green",
                margin: 10,
                borderRadius: 30
              }}
            >
              <Text>Add Plant</Text>
            </Button> */}
            <View>
              <Segment style={{ marginTop: 2, height: 60 }}>
                <Button
                  first
                  style={styles.button}
                  active={this.state.activePage === 1}
                  onPress={this.selectComponent(1)}
                >
                  <Text style={styles.text}>Status</Text>
                </Button>

                <Button
                  active={this.state.activePage === 2}
                  onPress={this.selectComponent(2)}
                  style={styles.button}
                >
                  <Text style={styles.text}>History</Text>
                </Button>

                <Button
                  active={this.state.activePage === 3}
                  onPress={this.selectComponent(3)}
                  style={styles.button}
                  last
                >
                  <Text style={styles.text}>About</Text>
                </Button>
              </Segment>
            </View>
            <ScrollView>
              <Content style={{ height: "100%" }} padder>
                {this._renderComponent()}
              </Content>
            </ScrollView>
          </Card>
        </Content>
      </Container>
    );
  }
}

export default SinglePlant;

const styles = {
  button: {
    height: "100%",
    width: "33.33%",
    justifyContent: "center",
    borderColor: "green"
  },
  text: {
    color: "green"
  }
};
