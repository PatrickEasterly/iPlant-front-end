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
const Context = React.createContext();
export default class App extends React.Component {
  constructor(props){
    super(props);
    // Login
    let login = await axios.post("http://localhost:500/app/user/login", {body:{username:"username"}, password:"password"});
    let JWToken = login.token;

    this.state = {
        loggedIn: JWToken ? true : false ,

    }
    
}
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode={'none'}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="HomeStack" component={HomeStack} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
  _login=()=>{
    this.setState({
      loggedIn: true,
      token: ''
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
