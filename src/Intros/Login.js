import React, { Component } from 'react';
import {AppContext} from '../../Context';
//   import {Constants} from 'expo'
  import {
    Container,
    Header,
    Button,
    Text,
    Body,
    Item as FormItem,
    Input,
    Label,
    Title,
    View,
    Form
  } from 'native-base';
  import axios from 'axios';
  
class Login extends React.Component{
  // static contextType = AppContext;
      constructor(props){
          super(props);
          this.state = {
              loggedIn: 'no',
              test: 'unchanged',
              token: 'none',
              username: '',
              password: ''
          }
      }
      render() {
        return (
          <AppContext.Consumer>
            {context=>(
                <Container style={{ flex: 1 }}>
                <Header>
                  <Body>
                    <Title>Login</Title>
                  </Body>
                </Header>
                <Form>
                  <FormItem floatingLabel>
                    <Label>UserName</Label>
                    <Input
                    keyboardType= 'visible-password' 
                    onChangeText={text=>this.setState({username: text})}
                    />
                  </FormItem>
                  <FormItem floatingLabel last>
                    <Label>Password</Label>
                    <Input secureTextEntry={true} 
                    onChangeText={text=>this.setState({password: text})}
                    />
                  </FormItem>
                  <View style={{height: 20}}></View>
                  <Button full primary style={{ paddingBottom: 4 }}
                  onPress={
                        ()=> {
                          this._login(this.state.username, this.state.password)
                          .then(()=>context.login(this.state.token))
                        }
                      }
                  >
                    <Text>Login</Text>
                  </Button>
                  <View style={{height: 20}}></View>
                  <Button full light primary><Text>SignUp</Text></Button>
                </Form>
              </Container>
            )}
          </AppContext.Consumer>
          );
      }
      _login= async (username, password)=> {
        const {navigation} = this.props;
        let temp;
        let login = await axios.post("http://2c2aa078.ngrok.io/app/user/login", {"username": `${username}`, "password": `${password}`})
          .then((res)=> {
            console.log(res)
            this.setState({
              login: true,
              token: res.data.token
          })
          return res;
        })
        await login.status===200 ? navigation.navigate("HomeStack") : alert(`${temp}`)
      }
  }
export default Login;
