
import React, {Component} from 'react'
import {
    View,
    TextInput,
    Text
} from 'react-native'


export default class Item extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            item: ''
        }
    }

    render() {
        return (
        <View style={{padding: 10}}>
            <TextInput
                style={{height: 40}}
                placeholder="Type a style"
                onChangeText={(item) => this.setState({item})}
            />
            <Text style={{padding: 10, fontSize: 42}}>
                {this.state.item.split(' ').map((word) => word && '🍕').join(' ')}
            </Text>
        </View>
        );
  }
}