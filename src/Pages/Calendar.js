import React from 'react';
import { View, Text, ImageBackground, } from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import axios from 'axios';

const background = require('../../assets/bachgrund.png');
const API = 'http://833a33e6.ngrok.io/api/users/2'; 
export default class OurCalendar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      items: {
        '2020-03-11': [{name: 'item 1 - any js object'}],
        // '2020-03-12': [{name: 'item 2 - any js object', height: 80}],
        // '2020-03-13': [],
        // '2020-03-14': [{name: 'item 3 - any js object'}, {name: 'any js object'}]
      }
    }
  }

  componentDidMount() {
    axios.get(API)
    .then((res) => {
      console.log(res.data.plants.waters)
    })
  }

    render () {
        return (
            <ImageBackground source={background} style={styles.background}>
            <View style={styles.background}>
              <Agenda
              items={this.state.items}
              loadItemsForMonth={this.loadItems}

              futureScrollRange={12}
              pastScrollRange={12}

              renderEmptyDate={()=> {return (
                <View style={styles.emptyDate}><Text></Text></View>
              )}}
              renderItem={(item) => {return (
                <View style={styles.item}><Text>Something Scheduled</Text></View>
              );}}
              />
            </View>
            </ImageBackground>   
        )
    }

    loadItems=(day)=>{
      setTimeout(() => {
        for (let i = -15; i < 85; i++) {
          const time = day.timestamp + i * 24 * 60 * 60 * 1000;
          const strTime = this.timeToString(time);
          if (!this.state.items[strTime]) {
            this.state.items[strTime] = [];
            const numItems = Math.floor(Math.random() * 5);
            for (let j = 0; j < numItems; j++) {
              this.state.items[strTime].push({
                name: 'Item for ' + strTime + ' #' + j,
                height: Math.max(50, Math.floor(Math.random() * 150))
              });
            }
          }
        }
        const newItems = {};
        Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
        this.setState({
          items: newItems
        });
      }, 1000);
    }
    timeToString=(time)=>{
      const date = new Date(time);
      return date.toISOString().split('T')[0];
    }
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
    },
    item: {
      backgroundColor: 'green',
      flex: 1,
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      marginTop: 17
    },
    emptyDate: {
      height: 15,
      flex:1,
      paddingTop: 30
    }
  }
  