import React from 'react';
import Autocomplete from 'native-base-autocomplete'; /* eslint-disable-line import/no-unresolved */
import {
  StyleSheet,
  View
} from 'react-native';
// import { StackNavigator } from "react-navigation";
import axios from 'axios';
import {
  Container,
  Content,
  Text,
  Button,
  Item,
  Input,
  Icon,
  ListItem,
  Header, 
  Thumbnail,
  Body,
  Left,
  Right,
  ActionSheet
} from 'native-base';

// const API = 'http://localhost:5000/api/plantinfo';

const API = 'http://192.168.0.119:6000/api/plantinfo'; 
// var BUTTONS = ["Option 0", "Option 1", "Option 2", "Delete", "Cancel"];
// var DESTRUCTIVE_INDEX = 3;
// var CANCEL_INDEX = 4;


export default class AddPlant extends React.Component {
  static renderEmployee(employee) {
    const { latinname, commonname } = employee;
    
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
      employees: [],
      query: '',
      selectedEmployee: null,
      // clicked: ''
    };
  }
  
  componentDidMount() {
    axios.get(API)
    .then((res) => {
      console.log(res)
      this.setState({ employees: res.data });
    });
  }
  
  findEmployee(query) {
    if (query === '') {
      return [];
    }
    
    const { employees } = this.state;
    const regex = new RegExp(`${query.trim()}`, 'i');
    return employees.filter(employee => employee.latinname.search(regex) >= 0);
  }
  
  
  render() {
 
    const { query, selectedEmployee } = this.state;
    const employees = this.findEmployee(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
    return (
      <Container>
      <Header searchBar rounded>
        <Item style={styles.scroll}>
          <Icon name="ios-search" />
          {/* <Input placeholder="Search" /> */}
        <View style={styles.autoComplete}> 
        
            <Autocomplete
              autoCapitalize="none"
              autoCorrect={false}
              data={employees.length === 1 && comp(query, employees[0].latinname)
                ? [] : employees}
              defaultValue={query}
              hideResults={selectedEmployee && selectedEmployee.latinname === query}
              onChangeText={text => this.setState({ query: text })}
              placeholder="Enter plant name"
              inputContainerStyle={{}}
              containerStyle={{minWidth: '100%'}}
              listContainerStyle={{minWidth: '100%'}}
              listStyle= {{flex: 2, maxHeight:800, minWidth: 375}}
              renderItem={emp =>
                <View style={{marginRight: 20}}>
               

                <ListItem thumbnail style={{margin:6, marginLeft: 0, paddingLeft: 0,}}
                onPress={() => {
                  (this.setState({ query: emp.commonname, selectedEmployee: emp }))
                }
              }
              >
                  <Left style={{marginLeft: 0, paddingLeft: 0}}>
                    <Thumbnail style={{marginLeft: 0, paddingLeft: 0, borderRadius: 5, height: 70, width: 70,
              
                      shadowColor: '#0000',
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.8,
                      shadowRadius: 50,  
                  
                    }} square source={{ uri: emp.photo }} />
                  </Left>
                  <Body>
                    <Text style={{padding: 2, textTransform:'capitalize'}}>{emp.commonname}</Text>
                    <Text style={{padding: 3, textTransform:'capitalize'}} note numberOfLines={1}>{emp.latinname}</Text>
                  </Body>
                  <Right>
                    <Button transparent>
                   
                      <Icon name="arrow-forward" />
              
                    </Button>
                  </Right>
                  </ListItem>
              </View>
              }
              />
              </View>
          
          
          

           
        
        </Item>
        <Button transparent>
          <Text>Search</Text>
        </Button>
      </Header>
      {/* <Content>
              <Button
                  onPress={() => {
                    ActionSheet.show(
                      {
                        options: BUTTONS,
                        cancelButtonIndex: CANCEL_INDEX,
                        destructiveButtonIndex: DESTRUCTIVE_INDEX,
                        title: "Testing ActionSheet"
                      },
                      buttonIndex => {
                        this.setState({ clicked: BUTTONS[buttonIndex] });
                      }
                    )}
                  }
                >
            <Text>Actionsheet</Text>
          </Button> 

      </Content>  */}
    </Container>
    );
  }

}

const styles = {
  autoComplete: {
   
    flex: 2,
 
  },
  scroll:{
    overflow: 'auto',
    
  },
  textinput: {
    border:'none',
  },
 
}


  