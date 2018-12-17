import { Component } from 'react';
import { PermissionsAndroid } from 'react-native';

import Geolocation from 'react-native-geolocation-service';

export default class GetOffers extends Component {
    constructor() {
        super();
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

        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                'title': 'Location Permission',
                'message': 'Allow app to access your location?'
            }
        ).then(granted => {
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                Geolocation.getCurrentPosition(pos => {
                    let initPos = {
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude
                    }
                    this.setState({initialPos: initPos});
                    this.props.getPosition(initPos);
                }, error => alert(error.message), { enableHighAccuracy: true, timeout: 3000, maximumAge: 1000 });
                this.watchID = Geolocation.watchPosition(pos => {
                    console.log(pos);
                    if (pos.coords.accuracy < 200) {
                        let crtPos = {
                            latitude: pos.coords.latitude,
                            longitude: pos.coords.longitude
                        }
                        this.setState({currentPos: crtPos});
                        this.props.getPosition(this.state.initialPos, crtPos);
                    }
                    
                }, err => alert(error.message), { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 }); 
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

    componentDidUpdate() {
        
    }

    render() {
        return null;
    }
}
