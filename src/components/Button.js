import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class Button extends Component {

    render() {
        return(
            <TouchableOpacity onPress={this.props.onPress}>

                <View style={[styles.button, this.props.style]}>
                    <Text style={{color: this.props.textColor}}> {this.props.children} </Text>
                </View>

            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        width: 80,
        height: 40,

        borderWidth: 1,
        borderRadius: 20,
        borderColor: "#C55900",
        backgroundColor: "#FF9B48",

        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        textAlign: 'center'
    }
})