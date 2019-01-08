import React, { Component } from 'react';
import { StyleSheet, FlatList, Text, View } from 'react-native';
import firebase from 'react-native-firebase';

import RestOffer from '../components/RestOffer';
import Button from '../components/Button';

export default class ModifyOffer extends Component {
    constructor(props) {
        super(props);
        this.db = firebase.firestore();
    }

    render() {
        return (
            <View style={styles.container}>
                <RestOffer
                    title="Meniu Happy Hour"
                    subtitle="Supă + Specialităti din Orez"
                    price={20}
                    currency="RON"
                />
                <Button textColor="#FFFFFF" style={{backgroundColor: "#B00F3B", width: 180, height: 30, marginTop: 15}}> + Adaugă Ofertă </Button>
            </View> 
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E91E63",
        alignItems: 'center'
    }
});
