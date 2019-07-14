import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Container, Content, Input, Button } from 'native-base'
import { connect } from 'react-redux'


class Delete extends Component {

    state = {
        edit: ''
    }

    handleEdit(key) {
        const edit = this.state.edit
        this.props.dispatch({ type: 'EDIT', payload: [key, 0, edit]})
    }

    render() {
        const { navigation } = this.props
        const key = navigation.getParam('key', 'NO-ID')
        return (
            <Container>
                <Content>
                    <Input placeholder="edit aja bos" onChangeText={(text) => this.setState({ edit: text}) }/>
                    <Button block danger onPress={() => this.handleEdit(key)}>
                        <Text>edit bos</Text>
                    </Button>
                </Content>
            </Container>
        )
    }
}

mapStateToProps = (state) => ({})

export default connect(mapStateToProps)(Delete)
