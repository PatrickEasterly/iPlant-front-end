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

      // componentDidMount() {

      // }
      render() {
        return (
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
                      // console.log(this.state)
                      this._login(this.state.username, this.state.password)
                      .then(this.context.login(this.state.token))
                    }
                  }
              >
                <Text>Login</Text>
              </Button>
              <View style={{height: 20}}></View>
              <Button full light primary><Text>SignUp</Text></Button>
            </Form>
          </Container>
          );
      }
      _login= async (username, password)=> {
        const {navigation} = this.props;
        let temp;
        let login = await axios.post("http://76bebe00.ngrok.io/app/user/login", {"username": `${username}`, "password": `${password}`}).then((res)=>{
          res.JSON()
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
  Login.contextType = AppContext;
export default Login;

////////////////////// Fingerprint login
// https://docs.expo.io/versions/v36.0.0/sdk/local-authentication/
// import * as React from 'react';
// import {
//   Text,
//   View,
//   StyleSheet,
//   Modal,
//   TouchableHighlight,
//   Button,
//   Image,
//   Platform,
// } from 'react-native';
// import Constants from 'expo-constants';
// import * as LocalAuthentication from 'expo-local-authentication';

// export default class Login extends React.Component {
//   state = {
//     authenticated: false,
//     modalVisible: false,
//     failedCount: 0,
//   };

//   setModalVisible(visible) {
//     this.setState({ modalVisible: visible });
//   }

//   clearState = () => {
//     this.setState({ authenticated: false, failedCount: 0 });
//   };

//   scanFingerPrint = async () => {
//     try {
//       let results = await LocalAuthentication.authenticateAsync();
//       if (results.success) {
//         this.setState({
//           modalVisible: false,
//           authenticated: true,
//           failedCount: 0,
//         });
//       } else {
//         this.setState({
//           failedCount: this.state.failedCount + 1,
//         });
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   render() {
//       const {navigation} = this.props;
//     return (
//       <View
//         style={[
//           styles.container,
//           this.state.modalVisible
//             ? { backgroundColor: '#b7b7b7' }
//             : { backgroundColor: 'white' },
//         ]}>
//         <Button
//           title={
//             this.state.authenticated
//               ? 'Reset and begin Authentication again'
//               : 'Begin Authentication'
//           }
//           onPress={() => {
//             this.clearState();
//             if (Platform.OS === 'android') {
//               this.setModalVisible(!this.state.modalVisible);
//             } else {
//               this.scanFingerPrint();
//             }
//           }}
//         />

//         {this.state.authenticated && (
//           <Text style={styles.text}>Authentication Successful! 🎉</Text>
//         )}

//         <Modal
//           animationType="slide"
//           transparent={true}
//           visible={this.state.modalVisible}
//           onShow={this.scanFingerPrint}>
//           <View style={styles.modal}>
//             <View style={styles.innerContainer}>
//               <Text>Sign in with fingerprint</Text>
//               {/* <Image
//                 style={{ width: 128, height: 128 }}
//                 source={require('./assets/fingerprint.png')}
//               /> */}
//               {this.state.failedCount > 0 && (
//                 <Text style={{ color: 'red', fontSize: 14 }}>
//                   Failed to authenticate, press cancel and try again.
//                 </Text>
//               )}
//               <TouchableHighlight
//                 onPress={async () => {
//                   LocalAuthentication.cancelAuthenticate();
//                   this.setModalVisible(!this.state.modalVisible);
//                 }}>
//                 <Text style={{ color: 'red', fontSize: 16 }}>Cancel</Text>
//               </TouchableHighlight>
//             </View>
//           </View>
//         </Modal>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignContent: 'center',
//     paddingTop: Constants.statusBarHeight,
//     padding: 8,
//   },
//   modal: {
//     flex: 1,
//     marginTop: '90%',
//     backgroundColor: '#E5E5E5',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   innerContainer: {
//     marginTop: '30%',
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     alignSelf: 'center',
//     fontSize: 22,
//     paddingTop: 20,
//   },
// });
