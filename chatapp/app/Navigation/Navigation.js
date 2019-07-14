import React, { Component } from 'react'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'

import HomeScreen from '../Screen/Homescreen'
import Delete from '../Screen/Delete'
import Siap from '../Screen/Siap'

const TabNavigator = createBottomTabNavigator({
    Home: {
        screen: HomeScreen
    },
    Delete: {
        screen: Delete
    },
    Siap: {
        screen: Siap
    }

})

export default Main =  createAppContainer(TabNavigator)