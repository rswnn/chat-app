import React, { Component } from "react";
import { TouchableHighlight, StyleSheet, Alert, Modal, Keyboard, ScrollView } from 'react-native'
import { Container, Header, Content, Textarea, Form, View, List, ListItem, Text, Footer, Item, Input, Button, Icon } from "native-base";
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'
import Dialog, { DialogContent } from 'react-native-popup-dialog'
import URL from '../Config/URL'
import { TouchableOpacity } from "react-native-gesture-handler";

export default class TextArea extends Component {

  state = {
    data: [],
    chat: '',
    token: '',
    visible: false,
    modalVisible: false,
    name: '',
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  getData() {
        const { token } = this.state
        axios.get(`${URL.API_URL}/history`, {
          headers: {
            authorization: `Bearer ${token}`
          }
        }).then(response => {
          if (response.status === 200) {
            this.setState({ data: response.data })
          }
        }).catch(err => alert('Oops !'))
  }

  sendData() {
    const { chat, token } = this.state
      if( chat !== '' ){
      axios.post(`${URL.API_URL}/chats`, {
        chats: chat
      },
        {
          headers: {
            authorization: `Bearer ${token}`
          }
        }).then(res => {
          if (res.status === 200) {
            this.setState({ chat: '' })
          }
        }).catch(err => alert(err))
      } else {
        alert('Tidak boleh kosong')
      }
  }

  deleteChat(id) {
    axios.delete(`${URL.API_URL}/delete`, {
      data: {
        id: id
      }
    }).then(res => {
      if (res.status === 200) {
        this.getData()
      } else {
        alert('error deleted')
      }
    }).catch('error connections')
  }

  componentWillMount() {
    AsyncStorage.getItem('@token').then(res => this.setState({token: res}))
    .catch(err => alert('Network Error'))
    AsyncStorage.getItem('@name').then(res => this.setState({ name: res}))
  }

  componentDidMount() {
    setInterval(() => {
      this.getData()
    }, 500)
  }

  render() {
    const { name } = this.state
    return (
      <Container>
        <Header style={style.header} />
        <Content style={{ backgroundColor: '#ECE5DD' }}>
          {this.state.data.map((data) => (
            <View  style={{minWidth: 50}} key={data.id}>
              <List>
                <ListItem style={(name === data.name) ? style.messageRight: style.messageLeft}>
                  <Text style={style.name}>{data.name}</Text>
                  <TouchableOpacity onPress={() => this.setState({ visible: true })}>
                    <Text style={style.message}>{data.chats}</Text>
                  </TouchableOpacity>
                </ListItem>
              </List>
              <Dialog visible={this.state.visible} onTouchOutside={() => {
                this.setState({ visible: false })
              }}>
                <DialogContent style={{ backgroundColor: 'white', height: 300, width: 300, justifyContent: 'center' }}>
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
    backgroundColor: '#075e54'
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
    marginVertical: 5,
    marginRight: 'auto',
    borderRadius: 10,
    minWidth: 20,
    paddingBottom: 0
  },
  messageRight: {
    backgroundColor: '#DCF8C6',
    marginLeft: 'auto',
    borderRadius: 10,
    minWidth: 20,
    paddingBottom: 0
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