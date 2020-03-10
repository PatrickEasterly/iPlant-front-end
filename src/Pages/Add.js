import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Autocomplete from "native-base-autocomplete"; /* eslint-disable-line import/no-unresolved */
import {
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Image
} from "react-native";
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
import SinglePlantSearch from "../MyPlants/SinglePlantSearch";
import { StyleSheet, View } from "react-native";
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
import AddPlantToRoom from "../Pages/AddPlantToRoom";

const Stack = createStackNavigator();

const API = "http://192.168.1.132:5000/api/plantinfo";

class PlantsSearchScreen extends React.Component {
  static renderPlant(plant) {
    const { latinname, commonname } = plant;

    return (
      <View>
        <Text style={styles.directorText}>$({commonname})</Text>
        <Text style={styles.titleText}>{latinname}</Text>
      </View>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      plants: [],
      query: "",
      selectedPlant: null
      // clicked: ''
    };
  }

  componentDidMount() {
    axios.get(API).then(res => {
      console.log(res);
      this.setState({ plants: res.data });
    });
  }

  findPlant(query) {
    if (query === "") {
      return [];
    }

    const { plants } = this.state;
    const regex = new RegExp(`${query.trim()}`, "i");
    return plants.filter(plant => plant.latinname.search(regex) >= 0);
  }

  render() {
    const { navigation } = this.props;
    const { query, selectedPlant } = this.state;
    const plants = this.findPlant(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
    return (
      <Container>
        <Header searchBar rounded>
          <Item style={styles.scroll}>
            <Icon name="ios-search" />
            <View style={styles.autoComplete}>
              <Autocomplete
                autoCapitalize="none"
                autoCorrect={false}
                data={
                  plants.length === 1 && comp(query, plants[0].latinname)
                    ? []
                    : plants
                }
                defaultValue={query}
                hideResults={selectedPlant && selectedPlant.latinname === query}
                onChangeText={text => this.setState({ query: text })}
                placeholder="Enter plant name"
                inputContainerStyle={{}}
                containerStyle={{ minWidth: "100%" }}
                listContainerStyle={{ minWidth: "100%" }}
                listStyle={{ flex: 2, maxHeight: 800, minWidth: 375 }}
                renderItem={plant => (
                  <View style={{ marginRight: 20 }}>
                    <ListItem
                      thumbnail
                      style={{ margin: 6, marginLeft: 0, paddingLeft: 0 }}
                      onPress={() => 
                        navigation.navigate("SinglePlantSearch", {
                          plant: plant
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
                          source={{ uri: plant.photo }}
                        />
                      </Left>
                      <Body>
                        <Text
                          style={{ padding: 2, textTransform: "capitalize" }}
                        >
                          {plant.commonname}
                        </Text>
                        <Text
                          style={{ padding: 3, textTransform: "capitalize" }}
                          note
                          numberOfLines={1}
                        >
                          {plant.latinname}
                        </Text>
                      </Body>
                      <Right>
                        <Button transparent>
                          <Icon name="arrow-forward" />
                        </Button>
                      </Right>
                    </ListItem>
                  </View>
                )}
              />
            </View>
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
      </Container>
    );
  }
}

PlantsSearchScreen.contextType = AppContext;



export default function MyPlants() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator headerMode="float" mode="modal">
        <Stack.Screen
          name={"PlantsSearchScreen"}
          component={PlantsSearchScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"SinglePlantSearch"}
          component={SinglePlantSearch}
        />
        <Stack.Screen name={"AddPlantToRoom"} component={AddPlantToRoom} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = {
  autoComplete: {
    flex: 2
  },
  scroll: {
    overflow: "auto"
  },
  textinput: {
    border: "none"
  }
};
