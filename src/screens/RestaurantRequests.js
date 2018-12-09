import React, { Component } from 'react';
import { StyleSheet, FlatList, Text, View } from 'react-native';
import firebase from 'react-native-firebase';

import Request from '../components/Request';

export default class RestaurantRequests extends Component {
    constructor() {
        super();
        this.db = firebase.firestore();
    }

    state = {
        requests: []
    }

    componentDidMount() {
        this.unsubscribe = this.db.collection("requests").onSnapshot(this.onNewRequests);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onNewRequests = (requestsSnapshot) => {
        const requests = [];

        
         
        requestsSnapshot.forEach(req => {
            console.log(req.id);
            console.log(req.data());
            
            requests.push({
                key: req.id,
                customerId: req.data().id,
                nrPeople: req.data().nrPeople,
            }); 
        }) 

        this.setState({requests}); 
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    contentContainerStyle={styles.requestsContainer}
                    data={this.state.requests}
                    renderItem={({item}) => <Request name="Anonymous" nrPeople={item.nrPeople}/>}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E91E63"
    },
    requestsContainer: {
        width: "100%",
        alignItems: "center"
    }
});
