import React, { Component } from 'react'
import { createStackNavigator }  from 'react-navigation'

import RoomScreen from '../Screen/RoomScreen'
import ChatRoom from '../Screen/ChatRoom'


export default RoomNavigation = createStackNavigator({
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
}, {
    initialRouteName: 'Room'
})
