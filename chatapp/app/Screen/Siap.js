import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { Input, Content, Container } from 'native-base'
import { connect } from 'react-redux'

class Siap extends Component {
    
    state = {
        input: ''
    }

    handleIncrement() {
        const input = this.state.input
        this.props.dispatch({ type: 'INPUT', payload: input })
    }

    render() {
        return (
            <Container>
                <Content>
                    <Text> Your Todo </Text>
                    <Input placeholder="type here" onChangeText={(text) => this.setState({ input: text}) } />
                    <Button title="INPUT" onPress={() => this.handleIncrement()} />
                </Content>
            </Container>
        )
    }
}

mapStateToProps = (state) => ({})

export default connect(mapStateToProps)(Siap)