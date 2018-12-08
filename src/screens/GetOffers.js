import React, { Component } from 'react';
import { StyleSheet, View, Text, PermissionsAndroid } from 'react-native';
import firebase from 'react-native-firebase';

import Geolocation from 'react-native-geolocation-service';

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
        
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                'title': 'Location Permission',
                'message': 'Allow app to access your location?'
            }
        ).then(granted => {
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                Geolocation.getCurrentPosition(pos => {
                    this.setState(
                        {
                            initialPos: {
                                latitude: pos.coords.latitude,
                                longitude: pos.coords.longitude
                            }
                        }
                    );
                }, error => alert(error.message), { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
                this.watchID = Geolocation.watchPosition(pos => {
                    console.log(pos);
                    this.setState(
                        {
                            currentPos: {
                                latitude: pos.coords.latitude,
                                longitude: pos.coords.longitude
                            }
                        }
                    );
                }); 
            } else {
                console.log("Permission denied")
            }
        })
        .catch(err => {
            console.warn(err)   
        }) 
    }

    componentWillUnmount() {
        Geolocation.clearWatch(this.watchID);
    }

    render() {
        return (
            <View style = {styles.container}>
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
