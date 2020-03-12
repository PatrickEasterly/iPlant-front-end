import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Alert  } from 'react-native';
import { CalendarList, Agenda} from 'react-native-calendars';
import axios from 'axios';
import moment from 'moment';
import { Card, CardItem } from 'native-base';

const API = 'http://2c2aa078.ngrok.io/api/users/2'; 
export default class Calendar extends React.Component {
  constructor(props){

    
    super(props);
    this.state = {
      stuff: {
      '2020-03-11': [{name: 'Your plants are loading 😁'}],
      },
      allwaters: {
      '2020-03-11': [{name: 'item1'}, {name: 'item2'}],
      '2020-03-12': [{name: 'item3'}, {name: 'item4'}]
      },
      chosenDate: '2020-03-12',
      futureColors: null,
      pastColors: null
    }
  }

  changeDay=(day)=>{
    let choice = day.dateString;
    // console.log(choice)
    let current = this.state.allwaters[choice]
    // console.log(current)
    let result = {
      [choice]: current ? [...current] : null
    }
    this.setState({
      chosenDate: choice,
      stuff: result
    },
     ()=>console.log('f')
    //  ()=>console.log(this.state)
     )
  }
  
  
   async componentDidMount() {
    const today=this.newTime();

    let future = await axios.get(`http://2c2aa078.ngrok.io/app/cal`, {
      headers: {
        Authorization: `BEARER eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjIsImlhdCI6MTU4NDAyMzAxOX0.qQyexAtErzTjfDzU0ChpIcQNtizhZbL84yj09IX2-5I`
      }}
    )
    .then((res)=>{
      // console.log(res.data)
      let finalWater = {};
      let futureWaters = res.data.map((item)=>{
        // console.log(Object.keys(item))
        Object.keys(item).map((key)=>{
          if(!finalWater[key]){
            finalWater[key] = [];
          }
          item[key].map((obj)=>obj.name = `Water your ${obj.name}`)
          console.log("!!!!!!!!!!")
          console.log(item[key])
          finalWater[key] = (item[key])
        })
      })

      console.log(finalWater)
      this.setState({
          futureWater: {...finalWater}
      })
      return finalWater;
    })
     let past = await axios.get(API)
    .then((res) => {
      
      let finalWater = {};
      let plants = res.data.plants.map((plant)=>plant);
      // console.log(plants)
      plants = plants.map((plant)=>{
        const result = {
          id: plant.id,
          userid: plant.userid,
          waterneeds: plant.plantInfo.waterneeds,
          commonname: plant.plantInfo.commonname,
          waters: [
            ...plant.waters
          ]
        };
        return result;
      })
      
      plants.map((plant)=>{
        let plantname=plant.commonname
        plant.waters.map((water)=>{
          
          let stringy = `You watered your ${plantname}`;
          let time = [water.watertime.split('T')[0]];
          let result = {name: stringy};
          if(!finalWater[time]){
            finalWater[time] = [];
          }
          finalWater[time].push(result)
        })
      })
      // console.table(this.state.allwaters)
      // console.table(finalWater)
      this.setState({
        chosenDate: today,
        allwaters: { ...finalWater},
        stuff: {
          [today]: finalWater[today]
        }
      }); return finalWater;
    })
    
    let newState = {
      ...future,
      ...past
    }
    let futureColors = {};
     Object.keys(future).map((key)=>{
       console.log(key);
       if(!futureColors[key]){
         futureColors[key] = {selected: false, marked: true, dotColor: 'blue', selectedColor: '#006359'};
       }
     })
      let pastColors = {};
     Object.keys(past).map((key)=>{
      console.log(key);
      if(!pastColors[key]){
        pastColors[key] = {selected: false, marked: true, dotColor: 'green', selectedColor: 'green'};
      }
       
     })

    let allColors = {
      ...pastColors,
      ...futureColors
    }
    this.setState({
      allwaters: newState,
      pastColors,
      futureColors,
      allColors
    })

  }

  
  render() {
    // console.log('did render!')
    console.log(this.state)
    // console.log(Object.keys(this.state.colors))
    return (
      <Agenda
        items={this.state.stuff}
        selected={this.state.chosenDate}
        renderItem={this.renderItem.bind(this)}
        renderEmptyData={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        onDayPress={(day)=>this.changeDay(day)}
        // markingType={'multi-dot'}
        markedDates={this.state.allColors}
        // markedDates={{'2020-03-13' : {selected: false, marked: true, selectedColor: 'green'}}}
        // monthFormat={'yyyy'}
        theme={{calendarBackground: '#fffff5', agendaKnobColor: 'green', backgroundColor: '#fffff5'}}
        //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
        // hideExtraDays={false}
      />
    );
  }

  renderItem(item) {
    return (
      <TouchableOpacity 
        style={[styles.item, {height: item.height}]} 
        // onPress={() => Alert.alert(item.name)}
      >
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Card>
          <CardItem>
            <Text>No tasks scheduled for today</Text>
          </CardItem>
        </Card>
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

  newTime() {
    const date = new Date();
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
  