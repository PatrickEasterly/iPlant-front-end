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
  Left,
  Right,
  Body,
  List
} from 'native-base';
import axios from 'axios';

// const API = 'http://localhost:5000/api/plantinfo';

const API = 'http://192.168.1.132:5000/api/plantinfo';




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

  renderPlant(employees) {
    const emp = employees.length === 1 && comp(query, employees[0].latinname)
    ? [] : employees
    return this.state.employees.map((emp) => {
      return (
      <ListItem thumbnail
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
        {/* <Text>
          <Thumbnail small source={{uri: emp.photo}} />
          {emp.latinname}({emp.commonname})
        </Text> */}
      </ListItem>
    )
})

}
  
  render() {
    const { query, selectedEmployee } = this.state;
    const employees = this.findEmployee(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
   
    return (
      <Container>
      <Header searchBar rounded>
        <Item regular>
          <Icon name="ios-search" />
          <Input placeholder="Search" onChangeText={text => this.setState({ query: text })} placeholder="Enter plant name" defaultValue={query}/>
          {/* <View style={styles.autoComplete}>  */}
        </Item>
        <Button transparent>
          <Text>Search</Text>
        </Button>
      </Header>
            {/* <Autocomplete
              autoCapitalize="none"
              autoCorrect={false}
              data={employees.length === 1 && comp(query, employees[0].latinname)
                ? [] : employees}
              defaultValue={query}
              hideResults={selectedEmployee && selectedEmployee.latinname === query}
              onChangeText={text => this.setState({ query: text })}
              placeholder="Enter plant name"
              renderItem={emp =>
               */}
              {/* //   <Container>
              //   <Header />
              //   <Content>
              //     <List>
              //       <ListItem thumbnail>
                      // <Left>
                      //   <Thumbnail square source={{ uri: 'Image URL' }} />
                      // </Left>
                      // <Body>
                      //   <Text>Sankhadeep</Text>
                      //   <Text note numberOfLines={1}>Its time to build a difference . .</Text>
                      // </Body>
                      // <Right>
                      //   <Button transparent>
                      //     <Text>View</Text>
                      //   </Button>
                      // </Right>
              //       </ListItem>
              //     </List>
              //   </Content>
              // </Container>
              // <Content> */}
                <List
                 
                // {this.state.employees.map((employee) => {
                //   <ListItem thumbnail
                //   onPress={() => {
                //     (this.setState({ query: emp.commonname, selectedEmployee: emp }))
                //   }
                // }
                // >
                //     <Left>
                //           <Thumbnail square source={{ uri: emp.photo }} />
                //         </Left>
                //         <Body>
                //           <Text>{emp.latinname}</Text>
                //           <Text note numberOfLines={1}>{emp.commonname}</Text>
                //         </Body>
                //         <Right>
                //           <Button transparent>
                //             <Text>View</Text>
                //           </Button>
                //         </Right>
                //     {/* <Text>
                //       <Thumbnail small source={{uri: emp.photo}} />
                //       {emp.latinname}({emp.commonname})
                //     </Text> */}
                //   </ListItem>
                // })}
                >
                  <View>
                    {() => this.renderPlant(employees)}

                  </View>
                
               </List>
            {/* </Content> */}
              {/* }
            /> */}
          {/* </View> */}
          {/* <Icon name="ios-people" /> */}
       
       
    </Container>
    );
  }

}

const styles = {
  autoComplete: {
    // textDecoration:'none',
    flex: 1,
    // border:'none',
  },
  textinput: {
    border:'none',
  }
}


  