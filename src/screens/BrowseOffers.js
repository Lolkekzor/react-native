import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import firebase from 'react-native-firebase';
import MapView from 'react-native-maps';

import PositionProvider from '../components/function/PositionProvider';

export default class BrowseOffers extends Component {
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
    }

    render() {

        return (
            <View style={styles.pageContainer}>
                <PositionProvider getPosition={this.updatePosition}/>
                <MapView
                     // remove if not using Google Maps
                    style={{width: "100%", height: 300}}
                    region={{
                        latitude: this.state.currentPos.latitude,
                        longitude: this.state.currentPos.longitude,
                        latitudeDelta: 0.0015,
                        longitudeDelta: 0.00121,
                    }}
                >
                    <MapView.Marker coordinate={this.state.currentPos}/>
                </MapView>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    
})