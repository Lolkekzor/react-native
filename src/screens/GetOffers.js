import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import firebase from 'react-native-firebase';

import PositionProvider from '../components/function/PositionProvider';
import Button from '../components/Button';

export default class GetOffers extends Component {
    constructor() {
        super();
        this.db = firebase.firestore();
    }

    state = {
        currentUser: null,
        initialPos: {
            latitude: 0,
            longitude: 0
        },
        currentPos: {
            latitude: 0,
            longitude: 0
        },

        request: {
            id: 123,
            timestamp: 1,
            maxDistance: 1000,
            pos: {
                latitude: 0,
                longitude: 0
            },
            nrPeople: 1,
            tags: ["Vegetarian", "Affordable", "Cosy"]
        }
    }

    componentDidMount() {
        this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    currentUser: user,
                    request: {
                        ...this.state.request,
                        id: user.uid
                    }
                })
            } else {
                firebase.auth().signInAnonymously();
            }
        })
        
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    updatePosition = (initPos, crtPos = {latitude: 0, longitude: 0}) => {
        this.setState({
            initialPos: initPos,
            currentPos: crtPos
        })
        this.setState({
            request: {
                ...this.state.request,
                pos: this.state.currentPos
            }
        })
    }

    sendRequest = () => {
        let req = this.state.request;
        req.timestamp = Date.now();
        this.db.collection("requests").add(req)
        .then(() => {
            alert("Request has been added");
        })
        .catch(err => {
            alert(err);
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

                <Button onPress={this.sendRequest}>
                    Send Request
                </Button>
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
