import React, { Component } from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';

import ProgressBarAnimated from 'react-native-progress-bar-animated';

export default class Offer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            progressBarPercentage: 100
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => this.setState({ diff: parseInt((120000 - (Date.now() - this.props.timestamp)) / 10 / 120) }), 250);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    toTimeDisplay(milis) {
        let display = "";

        if (milis < 0)
            display = "0:00"
        else {
            display += parseInt(milis / 1000 / 60);
            display += ':';
            if (parseInt(milis / 1000 % 60) < 10)
                display += '0'
            
            display += parseInt(milis / 1000 % 60);
        }
        
        return display;
    }

    render() {
        console.log(Date.now() - this.props.timestamp);
        return (
            <View style={styles.container}>
                <View style={styles.imageHolder}>
                    <Image
                        style={{width: 85, height: 85}}
                        source={this.props.source}
                    />
                </View>
                <View style={styles.textDetails}>
                    <Text style={styles.restaurantName}>
                        {this.props.name}
                    </Text>
                    <Text style={styles.restaurantType}>
                        {this.props.type}
                    </Text>
                </View>
                <View style={styles.rightSide}>
                    <Text style={styles.distanceText}>
                        {parseInt(this.props.distance / 1000)}.{parseInt(this.props.distance / 100 % 10)} km
                    </Text>
                    <ProgressBarAnimated
                        width={80}
                        height={15}
                        value={this.state.progressBarPercentage}
                        maxValue={100}
                        backgroundColorOnComplete="#E91E63"
                        backgroundColor="#E91E63"
                        borderColor="#E91E63" 
                        borderRadius={10}
                    />
                    <Text>
                        {this.toTimeDisplay(120000 - (Date.now() - this.props.timestamp))}
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 90
    },
    imageHolder: {
        width: 90,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textDetails: {
        flex: 1,
        justifyContent: 'space-around',
        ///backgroundColor: 'pink', debug

        padding: 10
    },
    rightSide: {
        width: 90,
        justifyContent: 'center',
        alignItems: 'center',
        ///backgroundColor: '#FF000020' debug
    },



    ///Text
    restaurantName: { 
        fontSize: 23, 
        fontWeight: 'bold'
    },
    restaurantType: { 
        fontSize: 14
    },
    distanceText: {
        fontSize: 12
    }
})