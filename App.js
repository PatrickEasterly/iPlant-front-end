import MyPlants from './src/Pages/MyPlants';
import Social from './src/Pages/Social';
import MyProfile from './src/Pages/MyProfile';
import Add from './src/Pages/Add';
import Calendar from './src/Pages/Calendar';
import Login from './src/Intros/Login';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();
export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        loggedIn: false,
        token: ''
    }
}
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode={'none'}>
          <Stack.Screen name="Login" >
            {props=><Login 
            {...props} loggedIn={this.state.loggedIn} login={this._login}
            />}
          </Stack.Screen>
          <Stack.Screen name="HomeStack" component={HomeStack} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
  _login=(/*token*/)=>{
    console.log('set')
    this.setState({
      loggedIn: true,
      token: token
    })
  }
}

function HomeStack() {
  return(
    <NavigationContainer independent={true}>
    <Tabs.Navigator headerMode={'none'}>
      <Tabs.Screen name="MyPlants" component={MyPlants} />
      <Tabs.Screen name="Calendar" component={Calendar} />
      <Tabs.Screen name="Social" component={Social} />
      <Tabs.Screen name="Add" component={Add} />
      <Tabs.Screen name="MyProfile" component={MyProfile} />
    </Tabs.Navigator>
  </NavigationContainer>
  )
}


const styles = {
  tabbyy: {
    color: 'red',
    flex: 1
  },
  container: {
    flex: 1,        // This makes the app span the screen
    // marginTop: 24   // Gives a little whitespace at the top of the screen
  },
  titleStyle: {
    fontSize: 30,
    color: 'blue'
  },
  background: {
    flex: 1         // We really want this, so the background takes up the whole background
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  clickMe: {
    flex: 1,
    color: 'blue',
    alignItems: 'center'
  },
  buttonText: {
    color: '#0f0'
  },
  buttonStyle: {
    margin: 10
  }
}
