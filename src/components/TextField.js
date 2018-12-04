import React, { Component } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

export default class TextField extends Component {

    render() {
        return(
            <View style={styles.container}>
                <TextInput {...this.props}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",

        borderWidth: 1,
        borderColor: "orange"
    }
})