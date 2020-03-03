import React from 'react';
import { View, Text, ImageBackground, } from 'react-native';
import {Button} from 'native-base';
const axios = require('axios');
import { SearchBar } from 'react-native-elements';
import { InputAutoSuggest } from 'react-native-autocomplete-search';

const background = require('../../assets/bachgrund.png');
const apiEndpoint = 'http://localhost:5000/api/plantinfo';


export default class AddPlant extends React.Component {
  state = {
    search: '',
  };
  
  updateSearch = search => {
    this.setState({ search });
  };
  
    render () {
      const { search } = this.state;
        return (
            <ImageBackground source={background} style={styles.background}>
             <SearchBar
                placeholder="Search For Plant..."
                onChangeText={this.updateSearch}
                value={search}
              />
            <Button onClick={this.searchPlantName}/> 
              {/* <InputAutoSuggest
                // style={{ flex: 1 }}
                apiEndpointSuggestData={text => searchPlantName(text)}
                // itemFormat={{id: data.id', name: 'data.name', tags:['data.continent', 'details.country']}}
              /> */}
            <View style={styles.itemContainer}>
            <Text>Add plants page</Text> 
            </View>
            </ImageBackground> 
        )
    }

  searchPlantName = () => {
    axios.get(apiEndpoint)
      .then(response => {
        let plants = response.data
      
        console.log(plants)
        plants.map((plant) => {
          
        })
      })
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
    }
  }
  