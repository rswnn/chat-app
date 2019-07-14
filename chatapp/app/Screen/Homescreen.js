import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { Container, Content, List, ListItem, Icon } from 'native-base'
import { connect } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler';

class HomeScreen extends Component {


    delete(key) {
        this.props.dispatch({ type: 'DEL', payload: key })
    }

    render() {
        return (
            <Container>
                <Content>
                    <Text style={{ fontSize: 50, color: 'salmon' }}>Todo</Text>
                    <List>
                        {this.props.todo.map((key, data) => (
                            <ListItem key={data}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{key}</Text>
                                <TouchableOpacity onPress={() => this.delete(data)}>
                                    <Icon style={{ marginLeft: 20 }} type="MaterialCommunityIcons" name="checkbox-blank-circle-outline" />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginLeft: 100 }} onPress={() =>
                                    this.props.navigation.navigate('Delete', {
                                        key: data
                                    })}>
                                    <Text>Edit</Text>
                                </TouchableOpacity>
                            </ListItem>
                        ))}
                    </List>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) => (
    { todo: state.todo }
)

export default connect(mapStateToProps)(HomeScreen)