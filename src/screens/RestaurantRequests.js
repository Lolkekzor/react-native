import React, { Component } from 'react';
import { StyleSheet, FlatList, Text, View } from 'react-native';
import firebase from 'react-native-firebase';

import Request from '../components/Request';
import Button from '../components/Button';

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
                <View style={styles.header}>
                    <Text style={{ fontSize: 26, color: 'white'}}>
                        Cereri
                    </Text>
                    <Button style={styles.modifyButton} textColor="#FFFFFF">
                        Modifică Oferte
                    </Button>
                </View>
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
        backgroundColor: "#E91E63",
        alignItems: 'center'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',

        height: 60,
        width: "100%",

        backgroundColor: '#D01F5B'
    },
    modifyButton: {
        width: 140,
        height: 40,
        backgroundColor: "#D01F5B",
        borderColor: "#C00F4B"
    },
    requestsContainer: {
        width: "100%",
        alignItems: "center",
    }
});
