import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'react-native-firebase';

import Button from './Button';

export default class Request extends Component {

    constructor(props) {
        super(props);
        this.db = firebase.firestore();
    }

    state = {
        touched: false
    }

    handlePress = () => {
        offer = {};
        offer.timestamp = Date.now();
        offer.customer = this.props.customerId;
        this.db.collection("offers").add(offer);
        this.setState({
            touched: true
        })
    }

    render() {
        let btn = (
            <Button onPress={this.handlePress} style={styles.button} textColor="#FFFFFF">
                Ofertează
            </Button>
        )
        if (this.state.touched) {
            btn = (
                <View style={styles.sentOffer}>
                    <Text style={{color: "#FFFFFF"}}>
                        Ofertă trimisă!
                    </Text>
                </View>
            )
        }
        return(
            <View style={styles.container}>
                <View>
                    <Text> {this.props.name} </Text>
                </View>
                <View>
                    <Text style={{fontWeight: "bold"}}> {this.props.nrPeople} pers </Text>
                </View>
                <View>
                    {btn}
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
    sentOffer: {
        width: 100,
        height: 30,
        /** 
        backgroundColor: "#D01F5B",
        borderColor: "#C00F4B",
        borderRadius: 20,
        borderWidth: 1, */
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        width: 100,
        height: 30,
        backgroundColor: "#D01F5B",
        borderColor: "#C00F4B"
    }
})