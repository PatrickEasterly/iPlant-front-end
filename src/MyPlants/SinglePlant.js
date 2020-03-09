import React, { useState, useEffect } from 'react';
import { View, Segment, Text, Button, Card, CardItem, Container, Header, Content, Thumbnail, Icon, Left, Body, Right } from 'native-base';
import { ImageBackground, Image } from 'react-native';


const background = require('../../assets/furtherShoppedPlant.png')
// const plantpic = require("http://plantdatabase.kpu.ca/images/habit/tackoh1.jpg");

class SinglePlant extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          plant: this.props.route.params.plant
        }
      }

render () {
    let plant = this.state.plant
    return (
        <Container>
                   
                   <Content>
                   <Card>
                       <CardItem>
                       <Left style={{height: 70}}>
                           <Body>
                           <Text style={{textTransform:'capitalize', paddingBottom: 5, fontSize: 20}}>{plant.plantInfo.commonname}</Text>
                           <Text style={{textTransform:'capitalize'}} note>{plant.plantInfo.latinname}</Text>
                           </Body>
                       </Left>
                       </CardItem>
                       <CardItem cardBody>
                       <Image source={{uri: plant.plantInfo.photo}} style={{height: 240, width: null, flex: 1}}/>
                       </CardItem>
                       {/* <CardItem> */}
                       <Button style={{justifyContent: 'center', backgroundColor: 'green', margin: 10, borderRadius: 30}}>
                           <Text>
                               Add Plant
                           </Text>
                       </Button>
                       <View>
                           <Segment style={{marginTop: 2, height: 60}}>
                           
                               <Button 
                               style={styles.button}first
                               // active={this.state.activePage === 1}
                               // onPress={() => {this.s

                               // }}
                               >
                              
                                   <Text style={styles.text}>Info</Text>
                               </Button>
                           
                               <Button style={styles.button} transparent>
                         
                                   <Text style={styles.text}>History</Text>
                               </Button>
                    
                               <Button style={styles.button} last>
                                   <Text style={styles.text}>Other</Text>

                               </Button>
                           </Segment>
                           </View>
                           <Content style={{height: '100%'}} padder>
                           {/* {this.state.plant.map((plant)=>{
                               return (
                                       <Card>
                                       <CardItem bordered >
                                           <Text>{plant.commonname}</Text>
                                       </CardItem>
                                       <CardItem bordered>
                                           <CardItem style={styles.container}>
                                           <Text>{plant.roomname}</Text>
                                           </CardItem>
                                           <CardItem style={styles.container}>
                                           <Text>{plant.photo}</Text>
                                           </CardItem>
                                       </CardItem>
                                       </Card>
                               
                              
                               )
                           }
                       )} */}
                       </Content>
                       </Card>
                   </Content>
               </Container>
       
        )
    }
}

export default SinglePlant    

const styles = {
    button: {
        height: '100%', 
        width: '33.33%', 
        justifyContent: 'center',
        borderColor: 'green',
    },
    text: {
        color: 'green',
    }
}