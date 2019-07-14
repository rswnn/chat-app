import React, { Component } from 'react';
import { Text, Container, Header, Content, Form, Item, Input, Button, View, Footer } from 'native-base'
import { StyleSheet } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import URL from '../Config/URL'

export default class FormExample extends Component {

    state = {
        email: '',
        password: ''
    }

    async setItem(key, value ) {
        try {
            return await AsyncStorage.setItem(key,value)
        } catch(err) {
            console.log(err)
        }
    }

    navigateMain() {
        const { email, password } = this.state
        axios.post(`${URL.API_URL}/login`, {
            email,
            password
        }).then(res => {
            if (res.status === 200) {
                this.setItem('@user', res.data.user)
                this.setItem('@token', res.data.access_token.token)
                this.props.navigation.navigate('Room', {
                    user: res.data.user
                })
            }
        })
    }

    render() {
        return (
            <Container>
                <Header style={styles.header} />
                <Content>
                    <View style={styles.window} >
                        <Form>
                            <Item regular style={styles.item}>
                                <Input placeholder="Username" onChangeText={(email) => this.setState({ email: email })} />
                            </Item>
                            <Item regular style={styles.item}>
                                <Input placeholder="Password" secureTextEntry={true} onChangeText={(text) => this.setState({ password: text })} />
                            </Item>
                            <Button style={styles.btn} block onPress={() => this.navigateMain()}>
                                <Text>Masuk</Text>
                            </Button>
                        </Form>
                    </View>
                </Content>
                <Footer style={styles.header}>
                    <Text style={styles.textFooter}>Powered Microsoft Inc</Text>
                </Footer>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#075e54'
    },
    window: {
        flex: 1,
        flexDirection: 'column',
        width: 300,
        alignSelf: 'center',
        marginTop: 80,
    },
    item: {
        marginVertical: 5,
        borderRadius: 5,
        backgroundColor: '#fcfcfc'
    },
    btn: {
        borderRadius: 5,
        backgroundColor: '#075e54',
        marginVertical: 5
    },
    textFooter: {
        color: '#fff',
        alignSelf: 'center',
        fontSize: 13
    }
})

