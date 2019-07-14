import React, { Component } from "react";
import { StyleSheet, Alert, Modal, FlatList } from 'react-native'
import { Container, Header, Content,  Form, View, List, ListItem, Text, Footer, Item, Input, Button, Icon, Left, Right } from "native-base";
import axios from 'axios'
import URL from '../Config/URL'
import { TouchableOpacity } from "react-native-gesture-handler"
import AsyncStorage from "@react-native-community/async-storage"
import Dialog, { DialogContent } from 'react-native-popup-dialog'

export default class TextArea extends Component {

  state = {
    chat: '',
    rooms: '',
    visible: false,
    modalVisible: false,
    data: '',
    user: '',
    message: []
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  getData() {
        AsyncStorage.getItem('@token').then(res => {
          axios.get(`${URL.API_URL}/chat`)
          .then(res => {
            if(res.status === 200) {
              console.log(res.data)
              const user = res.data.message.filter(data => data.username === data.username)
              this.setState({
                message: res.data.message,
                user: user})
            }
          }).catch(err => alert(err))
        })
  }

  sendData() {
    const { chat } = this.state
      if(chat !== ''){
      axios.post(`${URL.API_URL}/chat`, {
        id_user_rooms: this.state.data.id_user,
        message: chat
      }).then(res => {
          if (res.status === 200) {
            this.setState({ chat: '' })
            this.getData()
          }
        }).catch(err => alert(err))
      } else {
        alert('Tidak boleh kosong')
      }
  }


  deleteChat(id) {
    axios.delete(`${URL.API_URL}/chat/${id}`)
    .then(res => {
      if (res) {
        this.getData()
      } else {
        alert('error deleted')
      }
    }).catch('error connections')
  }

  componentWillMount() {
    const { navigation } = this.props
       const id_room = navigation.getParam('id_room')
       console.log(id_room)
       this.setState({
         data: id_room,

       })
       this.getData()
  }

  render() {
    return (
      <Container>
        <Header style={style.header}>
          <Left>
          <Text style={{fontSize: 20, color: '#fff'}}>{this.state.data.name}</Text>
          </Left>
          <Right>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
            <Icon type="MaterialCommunityIcons" name="logout" style={{color: 'white'}}/>
            </TouchableOpacity>
          </Right>
        </Header>
        <Content style={{ backgroundColor: '#ECE5DD', paddingTop: 20 }}>
{this.state.message.map((data) => (
  <View  style={{minWidth: 50}} key={data.id}>
    <List>
      <ListItem style={(data.id_user_rooms !== this.state.data.id_user ) ? style.messageLeft: style.messageRight}>
        <Text style={style.name}>{data.username}</Text>
        <TouchableOpacity onPress={() => this.setState({ visible: true })}>
          <Text style={style.message}>{data.message}</Text>
        </TouchableOpacity>
      </ListItem>
    </List>
    <Dialog visible={this.state.visible} onTouchOutside={() => {
      this.setState({ visible: false })
    }}>
      <DialogContent style={{ backgroundColor: 'white' ,height: 300, width: 300, justifyContent: 'center' }}>
        <Button full transparent onPress={() => {
          this.setModalVisible(!this.state.modalVisible)
          this.setState({ visible: false })
        }}>
          <Text>Edit</Text>
        </Button>
        <Button full transparent onPress={() => {
          this.setState({ visible: false })
          this.deleteChat(data.id)
        }}>
          <Text>Delete</Text>
        </Button>
      </DialogContent>
    </Dialog>
    <View style={{ marginTop: 22 }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.')
        }}>
        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        </View>
        <Footer style={{ backgroundColor: '#fff' }}>
          <Form>
            <Item style={style.inputFooter}>
              <Input placeholder="Edit Pesan" onChangeText={(text) => this.setState({ chat: text })} />
            </Item>
          </Form>
          <TouchableOpacity style={{ width: 100 }} onPress={() => this.setModalVisible(!this.state.modalVisible)}>
            <Icon type="MaterialIcons" name="send" style={style.icon} />
          </TouchableOpacity>
        </Footer>
      </Modal>
    </View>
  </View>
))}
</Content>
        <Footer style={style.footer}>
          <Form>
            <Item style={style.inputFooter}>
              <Input placeholder="Ketik pesan" value={this.state.chat} onChangeText={(text) => this.setState({ chat: text })} />
            </Item>
          </Form>
          <TouchableOpacity style={{ width: 100}} onPress={() => this.sendData()}>
            <Icon type="MaterialIcons" name="send" style={style.icon} />
          </TouchableOpacity>
        </Footer>
      </Container>
    );
  }
}

const style = StyleSheet.create({
  header: {
    backgroundColor: '#075e54',
    alignItems: 'center',
  },
  name: {
    marginHorizontal: 10,
    marginVertical: 10,
    color: '#075e54',
    bottom: 25,
    fontSize: 13
  },
  message: {
    fontSize: 13,
    textAlign: 'justify'
  },
  messageLeft: {
    backgroundColor: '#fff',
    marginVertical: 0,
    marginRight: 'auto',
    borderRadius: 10,
    minWidth: 20,
    paddingBottom: 'auto'
  },
  messageRight: {
    backgroundColor: '#DCF8C6',
    marginLeft: 'auto',
    borderRadius: 10,
    minWidth: 20,
    paddingBottom: 'auto',
    right: 20
  },
  footer: {
    backgroundColor: '#fff'
  },
  inputFooter: {
    left: 20,
    width: 300,
  },
  icon: {
    top: 10,
    left: 30,
    marginVertical: 5
  },
  optionIcon: {
    fontSize: 15,
    left: 100
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  modal4: {
    height: 100,
    width: 300
  },
  btn: {
    margin: 10,
    backgroundColor: "#3B5998",
    color: "white",
    padding: 10
  },
  btnModal: {
    alignSelf: 'center',
    fontSize: 20,
    marginVertical: 5
  },
  modalInside: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: "#fff",
    height: 50,
    borderWidth: 1,
    borderColor: '#fff',
    top: -1
  },
  textFooter: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 13
  }
})