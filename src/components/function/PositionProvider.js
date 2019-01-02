import { Component } from 'react';
import { PermissionsAndroid } from 'react-native';

import Geolocation from 'react-native-geolocation-service';

export default class GetOffers extends Component {
    constructor() {
        super();
    }

    state = {
        position: {
            latitude: 0,
            longitude: 0,
            accuracy: 999999,
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
                    let position = {
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude,
                        accuracy: pos.coords.accuracy
                    }
                    this.setState({position: position});
                    this.props.getPosition(position);
                }, error => alert(error.message), { enableHighAccuracy: true, timeout: 3000, maximumAge: 1000 });
                this.watchID = Geolocation.watchPosition(pos => {
                    console.log(pos);
                    if (pos.coords.accuracy < this.state.position.accuracy + 100) {
                        let position = {
                            latitude: pos.coords.latitude,
                            longitude: pos.coords.longitude,
                            accuracy: pos.coords.accuracy
                        }
                        this.setState({position: position});
                        this.props.getPosition(position);
                    }
                    
                }, err => alert(error.message), { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 0 }); 
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
        return null;
    }
}
