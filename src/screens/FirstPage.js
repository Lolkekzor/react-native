import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'react-native-firebase';
import { Navigation } from 'react-native-navigation';
import FirstPageModal from '../components/FirstPageModal/FirstPageModal.js';

import PositionProvider from '../components/function/PositionProvider';

export default class FirstPage extends Component {
    constructor(props) {
        super(props);
        this.db = firebase.firestore();
        console.log(this.props);
    }

    state = {
        currentUser: null,
        currentPos: {
            latitude: 0,
            longitude: 0
        },

        width: 0,
        height: 0,
        x: 0,
        y: 0,
        set: false,
        request: {
            id: 0,
            maxDistance: 1,
            pos: {
                latitude: 0,
                longitude: 0
            },
            nrPeople: 1
        },
        isModalVisible: false,
        isPressed: [0, 0, 0, 0, 0, 0, 0]
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
            currentPos: position,
            request: {
                ...this.state.request,
                pos: this.state.position
            }
        })
    }

    sendRequest = () => {
        let nrOfStyles = 7;
        let stylesArray = ['Vegetarian', 'Affordable', 'Cosy', 'Romantic', 'Business', 'Pub', 'Steakhouse'];

        let req = this.state.request;
        req.timestamp = Date.now();
        req.tags = [];
        for (i = 0; i < nrOfStyles; i++)
            if (this.state.isPressed[i] == true)
                req.tags.push(stylesArray[i]);

        this.db.collection("requests").add(req)
        .then(() => {
            Navigation.push(this.props.componentId, {
                component: {
                    name: 'screens.BrowseOffers',
                    passProps: {
                        location: this.state.currentPos
                    }
                }
            });
        })
        .catch(err => {
            alert(err);
        })
    }

    countPeople = (val) => {
        this.setState({
            request: {
                ...this.state.request,
                nrPeople: this.state.request.nrPeople + val >= 1 && this.state.request.nrPeople + val <= 30 ? this.state.request.nrPeople + val : this.state.request.nrPeople
            }
        })
    }
    modifyDistance = (val) => {
        this.setState({
            request: {
                ...this.state.request,
                maxDistance: this.state.request.maxDistance + val >= 0.5 && this.state.request.maxDistance + val <= 5 ? this.state.request.maxDistance + val : this.state.request.maxDistance
            }
        })
    }

    toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });
    selectItem = (index) => {
        const arr = [...this.state.isPressed]
        arr[index] = !arr[index]
        this.setState({
            isPressed: arr
        })
    }
    
    render() {
        return (
            <View style={styles.pageContainer}>
                
                <FirstPageModal isModalVisible={this.state.isModalVisible} isPressed={this.state.isPressed} selectItem={(index) => this.selectItem(index)} toggleModal={this.toggleModal} />

                <PositionProvider getPosition={this.updatePosition} />
                <View style={styles.imageContainer}>
                    <Image source={require('../assets/food3.gif')} style={styles.imageStyle} />
                </View>

                <View onLayout={this.onLayout} />

                <View style={styles.menuContainer}>
                    <View style={styles.inputsContainer}>
                        <View style={styles.counterInputContainer}>

                            <View style={styles.counterContainer}>
                                <TouchableOpacity style={styles.counterButton} onPress={() => this.countPeople(-1)}>
                                    <Icon name="md-remove-circle-outline" size={30} color="#A01F5B" />
                                </TouchableOpacity>

                                <View style={{ alignItems: 'center', width: 100 }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'normal' }}>Persons</Text>
                                </View>

                                <TouchableOpacity style={styles.counterButton} onPress={() => this.countPeople(1)}>
                                    <Icon name="md-add-circle-outline" size={30} color="#A01F5B" />
                                </TouchableOpacity>
                            </View>
                            <View style={{ alignItems: 'center', width: 80 }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}> {this.state.request.nrPeople} </Text>
                            </View>
                        </View>
                        <View style={styles.counterInputContainer}>
                            <View style={styles.counterContainer}>
                                <TouchableOpacity style={styles.counterButton} onPress={() => this.modifyDistance(-0.5)}>
                                    <Icon name="md-remove-circle-outline" size={30} color="#A01F5B" />
                                </TouchableOpacity>

                                <View style={{ alignItems: 'center', width: 100 }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'normal' }}>Distance</Text>
                                </View>

                                <TouchableOpacity style={styles.counterButton} onPress={() => this.modifyDistance(0.5)}>
                                    <Icon name="md-add-circle-outline" size={30} color="#A01F5B" />
                                </TouchableOpacity>
                            </View>
                            <View style={{ alignItems: 'center', width: 80 }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}> {this.state.request.maxDistance}km </Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.counterInputContainer} onPress={this.toggleModal}>
                            <View style={styles.counterContainer}>
                                <View style={{ width: 24.8 }} />
                                <View style={{ alignItems: 'center', width: 100 }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'normal' }}>Style</Text>
                                </View>
                                <View style={{ width: 24.8 }} />
                            </View>
                            <View style={{ alignItems: 'center', width: 80 }}>
                                <Icon name="ios-arrow-up" size={30} color="#A01F5B" />
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>


                <View style={[
                    styles.middleButtonBackground,
                    this.state.set ?
                        { top: this.state.y - 35, left: this.state.x - Dimensions.get('window').width * 35 / 100 } :
                        null
                ]} />

                <TouchableOpacity
                    onPress={this.sendRequest}
                    style={[
                        styles.middleButton,
                        this.state.set ?
                            { top: this.state.y - 35, left: this.state.x - Dimensions.get('window').width * 35 / 100 } :
                            null
                    ]}
                    activeOpacity={0.5}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Ofertează-mă</Text>
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

        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,

        height: 70,
        width: '70%',

        borderWidth: 1,
        borderColor: '#A01F5B',
        borderRadius: 25,
        backgroundColor: '#AF2F5B'
    },
    myButton: {
        position: 'absolute'
    },
    middleButtonBackground: {
        position: 'absolute',

        height: 70,
        width: '70%',

        borderRadius: 25,
        backgroundColor: '#E91E63'
    },
    menuContainer: {
        flex: 2.2,
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#E91E63',
        //paddingTop: 10
    },
    inputsContainer: {
        margin: 40,
        backgroundColor: '#eff4f7',
        width: '70%',
        height: '70%',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    counterInputContainer: {
        paddingLeft: '10%',
        paddingRight: '10%',
        margin: 0,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    counterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    counterButton: {
        padding: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})