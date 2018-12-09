import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Navigation from 'react-native-navigation';

import Button from './Button';

export default class Request extends Component {

    render() {
        return(
            <View style={styles.container}>
                <View>
                    <Text> {this.props.name} </Text>
                </View>
                <View>
                    <Text> {this.props.nrPeople} pers </Text>
                </View>
                <View>
                    <Button style={styles.button} textColor="#FFFFFF">
                        Oferteaza
                    </Button>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',

        width: "80%",
        margin: 5,
        padding: 5,
        borderBottomWidth: 1
    },
    button: {
        width: 100,
        height: 30,
        backgroundColor: "#D01F5B",
        borderColor: "#C00F4B"
    }
})