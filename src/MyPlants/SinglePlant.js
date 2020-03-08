import React, { useState, useEffect } from 'react';
import { View, Text, Button, Card, CardItem } from 'native-base';
import { ImageBackground, Image } from 'react-native';


const background = require('../../assets/furtherShoppedPlant.png')
// const plantpic = require("http://plantdatabase.kpu.ca/images/habit/tackoh1.jpg");

function SinglePlant({route}){

    // const [plantInfo, updatePlantInfo] = useState('fff');
    // const [plantPic, updatePlantPic] = useState('null');
    
    // // https://www.robinwieruch.de/react-hooks-fetch-data
    // useEffect(()=>{
    //     async function goGetIt() {
    //         const response = await fetch(`http://192.168.1.67:6000/api/plantinfo/1`);
    //         const result = await response.json();
    //         const newPlantPic = result.photo;
    //         updatePlantPic(newPlantPic);
    //         updatePlantInfo(result);
    //     }
    //     goGetIt();
    //     console.log(plantInfo);
    //     console.log(plantPic);
    // }, [])
    const [plant, updatePlant] = useState(route.params.plant);



    return (
        <ImageBackground source={background} style={{flex: 1}}>
            <View>
            <Card>
                <CardItem>
                <Text>{plant.plantInfo.commonname}</Text>
                </CardItem>
                <CardItem style={{flex: 1}}><Text>Common Name: {plant.plantInfo.commonname}</Text></CardItem>
                
                <Text>Latin Name: {plant.plantInfo.latinname}</Text>
                <Text>Water needs: {plant.plantInfo.waterneeds}</Text>
                <Text>Sunlight: {plant.plantInfo.sunlight}</Text>
                <Image style={{width:150, height: 150}} source={{uri: plant.plantInfo.photo}} />
                <Text> url: {plant.plantInfo.photo}</Text>
            </Card>
            <Card>
                <Text>Stuff from specific plant info</Text>
                <Text>Plant room goes here</Text>
                <Text>Plant waters go here</Text>
                <Text>Plant upcoming care info goes here</Text>
            </Card>
            </View>
        </ImageBackground>
    )
}
export default SinglePlant;