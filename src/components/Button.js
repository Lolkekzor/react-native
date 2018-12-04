import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class Button extends Component {

    render() {
        return(
            <TouchableOpacity onPress={this.props.onPress}>

                <View style={styles.button}>
                    <Text> {this.props.children} </Text>
                </View>

            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        width: 100,
        height: 50,

        borderWidth: 1,
        borderRadius: 2,
        borderColor: "#C55900",
        backgroundColor: "#FF9B48",

        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        textAlign: 'center'
    }
})