import React, { Component } from 'react';
import { StyleSheet, Text, Switch, View } from 'react-native';

import Button from './Button';

export default class RestOffer extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        toggleValue: false
    }

    handleSwitch = (val) => {
        this.setState({
            toggleValue: val
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.details}>
                    <View style={styles.priceTag}>
                        <Text> {this.props.price} {this.props.currency} </Text>
                    </View>
                    <Text style={{fontWeight: "bold"}}> {this.props.title} </Text>
                    <Text> {this.props.subtitle} </Text>
                </View>
                <Button textColor="#FFFFFF" style={{backgroundColor: "#D01F5B"}}> Modifică </Button>
                <Switch value={this.state.toggleValue} onValueChange={this.handleSwitch}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: "90%",
        flexDirection: 'row',
        height: 70,
        justifyContent: 'space-between',
        alignItems: 'flex-end',

        margin: 5,
        padding: 5,
        borderBottomWidth: 1
    },
    details: {
        alignItems: 'flex-start'
    }
})