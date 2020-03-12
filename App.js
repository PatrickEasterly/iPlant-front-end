import MyPlants from './src/Pages/MyPlants';
import Rooms from './src/Pages/Rooms';
import MyProfile from './src/Pages/MyProfile';
import Add from './src/Pages/Add';
import Calendar from './src/Pages/Calendar';
import Login from './src/Intros/Login';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';


import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();
////////////////////////////////////////////////////////
import {AppContext} from './Context';

export default class App extends React.Component {
  constructor(props){
    super(props);

    this.login = (yeet) => {
      // debugger;
      console.log(yeet)
      this.setState(state=>({
        loggedIn: yeet,
      }), ()=>console.log(this.state.loggedIn, "===================="));
    };
    
    this.setShouldUpdate = (shouldUpdate) => {
      console.log('@$*RT$P%&#!&#&$%')
      this.setState({
        shouldUpdate
      })
    }

    this.state = {
      loggedIn: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjMsImlhdCI6MTU4Mzk0MjE2OH0.g3dDPcIxPgudCzFpZOOgqYAXCUrvTo5VUbBYbejqXPs',

      login: this.login,
      shouldUpdate: false,
      setShouldUpdate: this.setShouldUpdate
    }
}
  render() {
    // console.log('--------------------')
    console.log(this.state)
    return (
          <AppContext.Provider value={this.state}>
            <NavigationContainer>
              <Stack.Navigator headerMode={'none'}>
                <Stack.Screen name="Login" component={Login}>
              </Stack.Screen>
              <Stack.Screen name="HomeStack" component={HomeStack} />
              </Stack.Navigator>
            </NavigationContainer>
          </AppContext.Provider>
    )
  }
}

function HomeStack() {
  return(
    <NavigationContainer independent={true}>
    <Tabs.Navigator headerMode={'none'}>
      <Tabs.Screen name="Calendar" component={Calendar} />
     <Tabs.Screen name="Rooms" component={Rooms} />
      <Tabs.Screen name="MyPlants" component= {MyPlants} />
      {/* <Tabs.Screen name="Social" component={Social} /> */}
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
