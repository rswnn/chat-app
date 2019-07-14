import React, { Component } from 'react'
import { createSwitchNavigator, createAppContainer, createStackNavigator} from 'react-navigation'

import LoginScreen from './src/Screen/LoginScreen'
import RoomScreen from './src/Screen/RoomScreen'
import ChatRoom from './src/Screen/ChatRoom'
import SplashScreen from './src/Screen/SplashScreen'

export default class App extends Component {
  render() {
    return (
        <Root/>
    )
  }
}

const RoomNavigation = createStackNavigator({
  Room: {
      screen: RoomScreen,
      navigationOptions: {
          header: null,
      },
    },
    Chat: {
      screen: ChatRoom,
      navigationOptions: {
          header: null,
      },
  }
})


export const Root = createAppContainer(
  createSwitchNavigator({
    Splash: {
      screen: SplashScreen,
      navigationOptions: {
        headers: null
      }
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        headers: null
      }
    },
    RoomNavigation: {
      screen: RoomNavigation ,
      navigationOptions: {
        headers: null
      },
    }
}, {
  initialRouteName: 'Login'
  })
)

// export const Demo = createAppContainer(Root)
