import React, { Component } from 'react';
import { StyleSheet, Text, View, Picker } from 'react-native';
import { Navigation } from 'react-native-navigation';
import firebase from 'react-native-firebase';

import Button from '../../components/Button';
import TextField from '../../components/TextField';

export default class Auth extends Component {
    constructor() {
        super();
        this.unsubscribe = null;
    }

    state = {
        email: "test@test.com",
        password: "testing",
        type: 'customer',
        peopleAmount: '',
        seatsAmount: '',
        properties: {
            test: "testing, attention please"
        }
    }

    componentDidMount() {
        console.log("We got here bois");
        this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log(user);
                firebase.firestore().collection('users').doc(user.uid).get()
                .then(result => {
                    
                    console.log(result);
                    console.log(result.data().type);
                    if (result.data().type == 'customer') {
                        this.onCustomerLogin();
                    } else {
                        this.onRestaurantLogin();
                    }
                })
                .catch(err => console.log(err + "Hello"))
            } else {
                alert("Not logged in. Please Sign up or Log In");
            }
        })
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    handleSignUp = () => {
        firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => this.createAddedData())
        .catch(error => console.log(error))
    }

    createAddedData = () => {
        const { currentUser } = firebase.auth();
        const value = {
            type: this.state.type,
            properties: this.state.type == "customer" ? 
            { peopleAmount: this.state.peopleAmount } :
            { seatsAmount: this.state.seatsAmount }
        }
        return firebase.firestore().collection('users').doc(currentUser.uid).set(value);
    }
    
    handleLogin = () => {
        firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .catch(error => console.log(error))
    }

    onCustomerLogin() {
        Navigation.setRoot({
            root: {
                component: {
                    name: "screens.Customer"
                }
            }
        });
    }

    onRestaurantLogin() {
        Navigation.setRoot({
            root: {
                component: {
                    name: "screens.Restaurant"
                }
            }
        });
    }

    render() {
        let choiceAmount = (<TextField 
            placeholder="Amount of People"
            onChangeText={(peopleAmount) => this.setState({peopleAmount})}
            value={this.state.peopleAmount}
        />);
        if (this.state.type == "restaurant") {
            choiceAmount = (<TextField 
                placeholder="Amount of Seats"
                onChangeText={(seatsAmount) => this.setState({seatsAmount})}
                value={this.state.seatsAmount}
            />);
        }

        return (
            <View style={styles.container}>
                <Text style={styles.welcome}> Choose account type: </Text>
                <Picker
                    selectedValue={this.state.type}
                    style={{ height: 100, width: 200 }}
                    onValueChange={(itemValue) => this.setState({type: itemValue})}>
                    <Picker.Item label="Customer" value="customer" />
                    <Picker.Item label="Restaurant" value="restaurant" />
                </Picker>
                {choiceAmount}
                <TextField 
                    placeholder="E-mail"
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email}
                />
                <TextField 
                    placeholder="Password"
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                />
                <View style={styles.buttonContainer}>
                    <Button onPress={this.handleSignUp}> Sign Up </Button>
                    <Button onPress = {this.handleLogin}> Log In </Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: "100%"
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
