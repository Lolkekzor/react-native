import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import firebase from 'react-native-firebase';

import PositionProvider from '../components/function/PositionProvider';

export default class GetOffers extends Component {
    constructor() {
        super();
        this.db = firebase.firestore();
    }

    state = {
        initialPos: {
            latitude: 0,
            longitude: 0
        },
        currentPos: {
            latitude: 0,
            longitude: 0
        },

        request: {
            id: null,
            maxDistance: null,
            nrPeople: null,
            tags: []
        }
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    updatePosition = (initPos, crtPos = {latitude: 0, longitude: 0}) => {
        this.setState({
            initialPos: initPos,
            currentPos: crtPos
        })
    }

    render() {
        console.log(this.state.currentPos);
        return (
            <View style = {styles.container}>
                <PositionProvider getPosition={this.updatePosition}/>
                <Text style = {styles.boldText}>
                    Initial position:
                </Text>
                
                <Text>
                    Latitude: {this.state.initialPos.latitude}
                    Longitude: {this.state.initialPos.longitude}
                </Text>
                
                <Text style = {styles.boldText}>
                    Current position:
                </Text>
               
                <Text>
                    Latitude: {this.state.currentPos.latitude}
                    Longitude: {this.state.currentPos.longitude}
                </Text>
            </View>
         )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50
    },
    boldText: {
        fontSize: 30,
        color: 'red',
    }
});
