import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { createSwitchNavigator, createAppContainer} from 'react-navigation'

import LoginScreen from './src/Screen/LoginScreen'
import Chatroom from './src/Screen/ChatRoom'

export default class App extends Component {
  render() {
    return (
      <Main/>
    )
  }
}

const Root = createSwitchNavigator({
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        headers: null
      }
    },
    Home: {
      screen: Chatroom,
      navigationOptions: {
        headers: null
      },
    }
}, {
  initialRouteName: 'Login'
})

export const Main = createAppContainer(Root)
