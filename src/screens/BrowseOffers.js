import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import firebase from 'react-native-firebase';
import MapView from 'react-native-maps';

import PositionProvider from '../components/function/PositionProvider';
import Offer from '../components/Offer';

export default class BrowseOffers extends Component {
    constructor(props) {
        super(props);
        this.db = firebase.firestore();
        this.state.currentPos = this.props.location;
        this.state.timeAtLoad = Date.now();
    }

    state = {}

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

    updatePosition = (position) => {
        this.setState({
            currentPos: position
        })
    }

    render() {

        return (
            <View style={styles.pageContainer}>
                <PositionProvider getPosition={this.updatePosition}/>
                <MapView
                    style={{width: "100%", height: Dimensions.get('window').height / 4}}
                    region={{
                        latitude: this.state.currentPos.latitude,
                        longitude: this.state.currentPos.longitude,
                        latitudeDelta: 0.0015,
                        longitudeDelta: 0.00121,
                    }}
                >
                    <MapView.Marker coordinate={this.state.currentPos}/>
                </MapView>
                <Offer 
                    source={require('../assets/kfc.png')}
                    name={"KFC Iulius Mall"}
                    type={"American, Fast-Food"}
                    distance={1600}
                    timestamp={this.state.timeAtLoad}
                />
            </View>
        );
    };
}

const styles = StyleSheet.create({
    
})