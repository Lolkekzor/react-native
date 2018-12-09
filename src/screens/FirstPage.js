import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from "react-native-modal";
import firebase from 'react-native-firebase';

import PositionProvider from '../components/function/PositionProvider';

export default class FirstPage extends Component {
    constructor() {
        super();
        this.db = firebase.firestore();
    }

    state = {
        currentUser: null,
        initialPos: {
            latitude: 0,
            longitude: 0
        },
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

    updatePosition = (initPos, crtPos = { latitude: 0, longitude: 0 }) => {
        this.setState({
            initialPos: initPos,
            currentPos: crtPos
        })
        this.setState({
            request: {
                ...this.state.request,
                pos: this.state.currentPos
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
                alert("Request has been added");
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

    _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

    selectItem = (index) => {
        const arr = [...this.state.isPressed]
        arr[index] = !arr[index]
        this.setState({
            isPressed: arr
        })
    }

    getRadioButton = (index) => {
        if (this.state.isPressed[index] == false)
            return (
                <TouchableOpacity onPress={() => this.selectItem(index)} style={{ padding: 10 }}>
                    <Icon name="ios-radio-button-off" size={30} color="#A01F5B" />
                </TouchableOpacity>
            )
        else
            return (
                <TouchableOpacity onPress={() => this.selectItem(index)} style={{ padding: 10 }}>
                    <Icon name="ios-radio-button-on" size={30} color="#A01F5B" />
                </TouchableOpacity>
            )
    }

    render() {
        return (
            <View style={styles.pageContainer}>
                <Modal
                    isVisible={this.state.isModalVisible}
                    onBackdropPress={() => this.setState({ isModalVisible: false })}
                    onBackButtonPress={() => this.setState({ isModalVisible: false })}
                    hideModalContentWhileAnimating={true}
                    style={{ alignItems: 'center' }}
                >
                    <View style={styles.modalStyle}>
                        <View style={styles.modalContent}>
                            <Text style={{ fontSize: 20, fontWeight: 'normal' }}>Vegetarian</Text>
                            {this.getRadioButton(0)}
                        </View>
                        <View style={styles.modalContent}>
                            <Text style={{ fontSize: 20, fontWeight: 'normal' }}>Affordable</Text>
                            {this.getRadioButton(1)}
                        </View>
                        <View style={styles.modalContent}>
                            <Text style={{ fontSize: 20, fontWeight: 'normal' }}>Cosy</Text>
                            {this.getRadioButton(2)}
                        </View>
                        <View style={styles.modalContent}>
                            <Text style={{ fontSize: 20, fontWeight: 'normal' }}>Romantic</Text>
                            {this.getRadioButton(3)}
                        </View>
                        <View style={styles.modalContent}>
                            <Text style={{ fontSize: 20, fontWeight: 'normal' }}>Business</Text>
                            {this.getRadioButton(4)}
                        </View>
                        <View style={styles.modalContent}>
                            <Text style={{ fontSize: 20, fontWeight: 'normal' }}>Pub</Text>
                            {this.getRadioButton(5)}
                        </View>
                        <View style={styles.modalContent}>
                            <Text style={{ fontSize: 20, fontWeight: 'normal' }}>Steakhouse</Text>
                            {this.getRadioButton(6)}
                        </View>
                        <TouchableOpacity onPress={this._toggleModal}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 10 }}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
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
                        <TouchableOpacity style={styles.counterInputContainer} onPress={this._toggleModal}>
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
    },
    modalStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eff4f7',
        borderRadius: 20,
        width: '77.5%'
    },
    modalContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%'
    }
})