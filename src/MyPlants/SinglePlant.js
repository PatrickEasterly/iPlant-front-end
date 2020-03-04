import React from 'react';
import { View, Text } from 'native-base';
import { ImageBackground } from 'react-native';

const background = require('../../assets/furtherShoppedPlant.png')

export default function SinglePlant({route}){
    return (
        <ImageBackground source={background} style={{flex: 1}}>
            <View>
            <Text>Fuck yeah baby</Text>
            <Text>{route.params.name}</Text>
        </View>
        </ImageBackground>
    )
}