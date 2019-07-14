import React, { Component } from 'react'
import { Text, View, StyleSheet, Animated, Image, Easing } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

export default class SplashScreen extends Component {

    constructor () {
        super()
        this.spinValue = new Animated.Value(0)
        this.token = '',
        this.id = ''
      }

    componentDidMount() {
        this.spin()
    }

    spin () {
    this.spinValue.setValue(0)
    Animated.timing(
        this.spinValue,
        {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear
        }
    ).start(() => this.spin())
  }

    componentWillMount() {
        AsyncStorage.getItem('@user').then(res => {
            this.setState({ id: res})
        })
        setTimeout(() => {
            try {
                AsyncStorage.getItem('@token').then(res => {
                    if (res === null) {
                        this.props.navigation.navigate('Login')
                    } else {
                            this.props.navigation.navigate('Room', {
                                user: this.state.id.id
                        })
                    }
                })
            } catch(err) {
                throw err
            }
        }, 3000)
    }

    render() {
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })
        return (
            <View style={styles.container}>
                <Animated.Image
                style={{
                width: 20,
                height: 20,
                transform: [{rotate: spin}] }}
                source={{uri: 'https://www.pinclipart.com/picdir/big/175-1750251_loader-loading-progress-wait-icon-loading-png-clipart.png'}}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
})


// <Content style={{ backgroundColor: '#ECE5DD', paddingTop: 20 }}>
//           <List>
//           <FlatList inverted scrollIndicatorInsets={false}
//           data={this.state.message}
//           showsVerticalScrollIndicator={false}
//           renderItem={({item}) =>
//           <ListItem style={(item.id_user_rooms !== this.state.data.id_user ) ? style.messageLeft: style.messageRight}>
//             <Text style={style.name}>{item.username}</Text>
//             <Text style={style.message}>{item.message}</Text>
//             </ListItem>
//           }
//           keyExtractor={item => item.email}
//         />
//           </List>
//         </Content>