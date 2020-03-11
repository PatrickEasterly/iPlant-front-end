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
  Right
} from "native-base";
import { ImageBackground, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
const Stack = createStackNavigator();

const background = require("../../assets/furtherShoppedPlant.png");
// const plantpic = require("http://plantdatabase.kpu.ca/images/habit/tackoh1.jpg");

class SinglePlantSearch extends React.Component {
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
      return (
        <Card>
          <CardItem bordered>
            <Text>{plant.commonname}</Text>
          </CardItem>
        </Card>
      );
    }
    if (this.state.activePage === 2) {
      return <Text>History Tab</Text>;
    } else {
      return <Text>Tab for other stuff</Text>;
    }
  };
  render() {
    let plant = this.state.plant;
    const { navigation } = this.props;
    return (
      <Container>
        <Content>
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
                    {plant.commonname}
                  </Text>
                  <Text style={{ textTransform: "capitalize" }} note>
                    {plant.latinname}
                  </Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image
                source={{ uri: plant.photo }}
                style={{ height: 240, width: null, flex: 1 }}
              />
            </CardItem>
            {/* <CardItem> */}
            <Button
              onPress={() => navigation.navigate("AddPlantToRoom", {plant: plant})}
              style={{
                justifyContent: "center",
                backgroundColor: "green",
                margin: 10,
                borderRadius: 30
              }}
            >
              <Text>Add Plant</Text>
            </Button>
            <View>
              <Segment style={{ marginTop: 2, height: 60 }}>
                <Button
                  first
                  style={styles.button}
                  active={this.state.activePage === 1}
                  onPress={this.selectComponent(1)}
                >
                  <Text style={styles.text}>Info</Text>
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
                  <Text style={styles.text}>Other</Text>
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

export default SinglePlantSearch;

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
