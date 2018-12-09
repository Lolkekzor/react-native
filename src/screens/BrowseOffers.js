import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import firebase from 'react-native-firebase';

import PositionProvider from '../components/function/PositionProvider';

export default class FirstPage extends Component {
    constructor() {
        super();
        this.db = firebase.firestore();
    }

    state = {
        
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
        
    }

    render() {

        return (
            <View style={styles.pageContainer}>
                <PositionProvider getPosition={this.updatePosition}/>
               
            </View>
        );
    };
}

const styles = StyleSheet.create({
    
})