import React from 'react';
import Autocomplete from 'native-base-autocomplete'; /* eslint-disable-line import/no-unresolved */
import {
  StyleSheet,
  View
} from 'react-native';

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
  ListView
} from 'native-base';
import axios from 'axios';

// const API = 'http://localhost:5000/api/plantinfo';

const API = 'http://192.168.1.132:5000/api/plantinfo';
// const {vw, vh, vmin, vmax} = require('react-native-viewport-units');





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
              listStyle= {{flex: 1, maxHeight:800}}
              renderItem={emp =>
                // <ListView>
                
                <ListItem thumbnail style={styles.listStyle}
                onPress={() => {
                  (this.setState({ query: emp.commonname, selectedEmployee: emp }))
                }
              }
              >
                  <Left>
                    <Thumbnail square source={{ uri: emp.photo }} />
                  </Left>
                  <Body>
                    <Text>{emp.latinname}</Text>
                    <Text note numberOfLines={1}>{emp.commonname}</Text>
                  </Body>
                  <Right>
                    <Button transparent>
                      <Text>View</Text>
                    </Button>
                  </Right>
                  </ListItem>
                // </ListView>
              }
              />
              </View>
          

           
          {/* <Icon name="ios-people" /> */}
        </Item>
        <Button transparent>
          <Text>Search</Text>
        </Button>
      </Header>
    </Container>
    );
  }

}

const styles = {
  autoComplete: {
    // textDecoration:'none',
    flex: 1,
    // border:'none',
    // overflow: 'hidden',
    // position: 'relative'
  },
  scroll:{
    // overflow: 'hidden',
    // position: 'relative'
  },
  textinput: {
    border:'none',
  },
  listStyle: {
    flex: 1,
    // width: '100%',
    padding: 0
  }
}


  