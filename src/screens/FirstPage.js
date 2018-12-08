import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, Dimensions } from 'react-native';

export default class FirstPage extends Component {

    state = {
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        set: false
    }

    onLayout = (e) => {
        console.log(e.nativeEvent);
        this.setState({
            width: e.nativeEvent.layout.width,
            height: e.nativeEvent.layout.height,
            x: e.nativeEvent.layout.x,
            y: e.nativeEvent.layout.y,
            set: true
        })
    }

    render() {

        return (
            <View style={styles.pageContainer}>
                <View style={styles.imageContainer}>
                    <Image source={require('../assets/food2.gif')} style={styles.imageStyle} />           
                </View>

                <View  onLayout={this.onLayout}/>

                <View style={styles.menuContainer}>
                    <Text>cccccccccccccccccc</Text>
                    <Text>cccccccccccccccccc</Text>
                    <Text>cccccccccccccccccc</Text>
                    <Text>cccccccccccccccccc</Text>
                </View>

                <TouchableOpacity  
                    style={[
                        styles.middleButton, 
                        this.state.set ? 
                        {top: this.state.y - 30, left: this.state.x - Dimensions.get('window').width * 30 / 100} :
                        null
                    ]} 
                    activeOpacity={0.5}>
                    <Text style={{ fontSize: 26, fontWeight: 'bold' }}>Oferteaza-ma</Text>
                </TouchableOpacity>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'column',
        alignItems: 'center'
    },
    imageContainer: {
        flex: 4,
        width: '100%',
        zIndex: 5,
        backgroundColor: 'transparent',
        overflow: 'visible'
    },
    imageStyle: {
        flex: 4,
        resizeMode: 'cover',
        zIndex: 0,
        backgroundColor: 'transparent'
    },
    middleButton: {
        position: 'absolute',
        top: 50,
        left: 50,

        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,

        height: 60,
        width: '60%',

        borderWidth: 1,
        borderColor: 'yellow',
        borderRadius: 30,

        backgroundColor: '#556B2F'
    },
    myButton: {
        position: 'absolute'
    },
    middleButtonBackground: {
        position: 'relative',
        top: -30,
        zIndex: 2,
        alignSelf: 'center',

        height: 60,
        width: '60%',

        borderRadius: 30,

        backgroundColor: 'olive'
    },
    menuContainer: {
        flex: 1.8,
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'olive',
        paddingTop: 30
        //overflow: 'visible'
    }
})