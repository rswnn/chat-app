import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, View, Icon } from 'native-base'
import { StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'

import URL from '../Config/URL'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default class RoomScreen extends Component {

    constructor(props) {
      super(props)
       this.state = {
          userId: '',
          user: '',
          token: '',
          data: []
      }
  }

  componentWillMount() {
    const { navigation } = this.props
       const user = navigation.getParam('user')
       this.setState({
         userId: user.id,
         user: user
       })
       this.getData()
  }

  getData() {
        AsyncStorage.getItem('@token').then(res =>{
          axios.get(`${URL.API_URL}/room/${this.state.userId}`, {
            headers: {
              authorization: `Bearer ${res}`
            }
          }).then(res => {
            this.setState({data: res.data.room})
            console.log(res.data.room)
          })
        }).catch(err => console.log(err))
  }

  render() {
    return (
      <Container>
        <Header style={{backgroundColor: '#075e54', alignItems: 'center'}}>
        <Text style={{fontSize: 20, color: '#fff'}}>Halo Chat</Text>
        </Header>
        <Content>
          <List>
            {this.state.data.map((data) => (
            <TouchableOpacity key={data.id_room} onPress={() => this.props.navigation.navigate('Chat', {
              id_room: data
            })}>
              <ListItem style={styles.listItem}>
                <Icon type="MaterialIcons" name="group" style={styles.icon}/>
                <Text>{data.name}</Text>
             </ListItem>
            </TouchableOpacity>
            ))}
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 40,
    marginRight: 20
  },
  listItem: {
    padding: 'auto',
    right: 10,
    borderBottomWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.8,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 1
    }
  }
})