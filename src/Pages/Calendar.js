import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Alert  } from 'react-native';
import { CalendarList, Agenda} from 'react-native-calendars';
import axios from 'axios';
import moment from 'moment';

const API = 'http://833a33e6.ngrok.io/api/users/2'; 
export default class Calendar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      stuff: {
      '2020-03-11': [{name: 'item1'}, {name: 'item2'}],
      },
      allwaters: {
      '2020-03-11': [{name: 'item1'}, {name: 'item2'}],
      '2020-03-12': [{name: 'item3'}, {name: 'item4'}]
      },
      rooms: {
        // rooms
      },
      chosenDate: '2020-03-11',
    }
  }


  changeDay=(day)=>{
    let choice = day.dateString;
    console.log(choice)
    let current = this.state.allwaters[choice]
    console.log(current)
    let result = {
      [choice]: current ? [...current] : []
    }
    this.setState({
      chosenDate: choice,
      stuff: result
    }, ()=>console.log(this.state))
  }

  componentDidMount() {
    axios.get(API)
    .then((res) => {
      // console.log(res.data.plants)
      let plants = res.data.plants.map((plant)=>plant);
      console.log(plants)
      plants = plants.map((plant)=>{

        const result = {
          id: plant.id,
          userid: plant.userid,
          waterneeds: plant.plantInfo.waterneeds,
          commonname: plant.plantInfo.commonname,
          // sunlight: plant.plantInfo.sunlight,

          waters: [
            ...plant.waters
          ]
        };
        return result;
      })
      console.log('*********')
      console.log(plants)
      let waters = [];
      plants.map((plant)=>{
        
        let name=plant.commonname
        plant.waters.map((water)=>{
          
        })
      })
      // console.log(waters)
      // this.setState({
      //   items: waters
      // }/* , ()=>console.log(this.state) */)
    })
  }
  
  render() {
    console.log('rerendering!')
    console.log(this.state.stuff)
    return (
      <Agenda
        // items={this.state.items}
        items={this.state.stuff}
        // loadItemsForMonth={this.loadItems.bind(this)}
        selected={this.state.chosenDate}
        renderItem={this.renderItem.bind(this)}
        renderEmptyData={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        onDayPress={(day)=>this.changeDay(day)}
        // markingType={'period'}
        // markedDates={{
        //    '2017-05-08': {textColor: '#43515c'},
        //    '2017-05-09': {textColor: '#43515c'},
        //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
        //    '2017-05-21': {startingDay: true, color: 'blue'},
        //    '2017-05-22': {endingDay: true, color: 'gray'},
        //    '2017-05-24': {startingDay: true, color: 'gray'},
        //    '2017-05-25': {color: 'gray'},
        //    '2017-05-26': {endingDay: true, color: 'gray'}}}
        // monthFormat={'yyyy'}
        // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
        //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
        // hideExtraDays={false}
      />
    );
  }


  renderItem(item) {
    return (
      <TouchableOpacity 
        style={[styles.item, {height: item.height}]} 
        onPress={() => Alert.alert(item.name)}
      >
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
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
  