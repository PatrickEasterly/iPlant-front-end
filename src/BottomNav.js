import React from 'react';
import { Text } from 'react-native';
import { Footer, FooterTab, Button, Icon } from 'native-base';

export default class BottomNav extends React.Component {
    render() {
        return (
            <Footer>
            <FooterTab>
                <Button
                onPress={()=>navigation.navigate('Landing')}
                vertical>
                    <Icon name="apps" />
                    <Text>Land</Text>
                </Button>
            </FooterTab>
            <FooterTab>
                <Button 
                onPress={()=>this.props.navigation.navigate('Home')}
                vertical>
                    <Icon name="apps" />
                    <Text>Hone</Text>
                </Button>
            </FooterTab>
            <FooterTab>
                <Button vertical>
                    <Icon name="apps" />
                    <Text>Apps</Text>
                </Button>
            </FooterTab>
            <FooterTab>
                <Button vertical>
                    <Icon name="apps" />
                    <Text>Apps</Text>
                </Button>
            </FooterTab>
            <FooterTab>
                <Button vertical>
                    <Icon name="apps" />
                    <Text>Apps</Text>
                </Button>
            </FooterTab>
        </Footer>
        )
    }
}