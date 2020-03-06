import React, { useState, useEffect } from 'react';
import { View, Text, Button, Card, CardItem } from 'native-base';
import { ImageBackground, Image } from 'react-native';


const background = require('../../assets/furtherShoppedPlant.png')
// const plantpic = require("http://plantdatabase.kpu.ca/images/habit/tackoh1.jpg");

function SinglePlant({route}){

    const [plantInfo, updatePlantInfo] = useState('fff');
    const [plantPic, updatePlantPic] = useState('null');
    
    // https://www.robinwieruch.de/react-hooks-fetch-data
    useEffect(()=>{
        async function goGetIt() {
            const response = await fetch(`http://localhost:5000/api/plantinfo/1`);
            const result = await response.json();
            const newPlantPic = result.photo;
            updatePlantPic(newPlantPic);
            updatePlantInfo(result);
        }
        goGetIt();
        console.log(plantInfo);
        console.log(plantPic);
    }, [])
    return (
        <ImageBackground source={background} style={{flex: 1}}>
            <View>
            <Card>
                <CardItem>
                    <Text>Stuff from broad plant info</Text>
                <Text>{plantPic}</Text>
                </CardItem>
                <CardItem style={{flex: 1}}>
                <Text>Common Name: {plantInfo.commonname}</Text>
                <Text>Latin Name: {plantInfo.latinname}</Text>
                <Text>Water needs: {plantInfo.waterneeds}</Text>
                <Text>Sunlight: {plantInfo.sunlight}</Text>
                <Image style={{width:150, height: 150}} source={plantPic} />
                </CardItem>
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