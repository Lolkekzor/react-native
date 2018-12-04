import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Navigation } from 'react-native-navigation';
import firebase from 'react-native-firebase';

import TextField from '../components/TextField';
import Button from '../components/Button';

export default class Customer extends Component {
    constructor() {
        super();
        this.ref = firebase.firestore().collection('messages');
        this.loading = true;
        this.state = {
            text: "",
            target: "",
            currentUser: null
        }
    }

    componentDidMount() {
        const { currentUser } = firebase.auth()
        console.log(currentUser);
        this.setState({ currentUser })
    }

    onSendMessage = () => {
        this.ref.add({
            message: this.state.text,

            target: this.state.target
            // hello from tosa
        });
    }

    handleSignOut = () => {
        firebase.auth().signOut()
        .then(() => {
            Navigation.setRoot({
                root: {
                    component: {
                        name: "screens.Auth"
                    }
                }
            });
        })
    }

    render() {
        let displayContent = <ActivityIndicator />;
        if (this.state.currentUser) {
            displayContent = (
                <View style={styles.container}>
                    <Text style={styles.welcome}> Customer account: {this.state.currentUser.uid} </Text>
                    <TextField 
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text} 
                    />
                    <TextField 
                        onChangeText={(target) => this.setState({target})}
                        value={this.state.target} 
                    />
                    <Button onPress={this.onSendMessage}> Submit </Button>
                    <Button onPress={this.handleSignOut}> Logout </Button>
                </View>
            );
        }

        return (
            <View style={styles.container}> 
                {displayContent}
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
