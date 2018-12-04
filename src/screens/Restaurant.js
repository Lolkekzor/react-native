import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Navigation } from 'react-native-navigation';
import firebase from 'react-native-firebase';

import Button from '../components/Button';

export default class Restaurant extends Component {
    constructor() {
        super();
        this.ref = firebase.firestore().collection('messages');
        this.unsubscribe = null;
        this.state = {
            targeted: false,
            messages: []
        }
    }

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onCollectionUpdate = (querySnapshot) => {
        const messages = [];
        querySnapshot.forEach((content) => {
            messages.push({
                key: content.id,
                message: content.data().message
            })
        })

        this.setState({
            messages
        })
    }

    handleSignOut = () => {
        this.unsubscribe();

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

    toggleTargeted = () => {
        if (this.state.targeted) {
            this.unsubscribe();
            this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
        } else {
            this.unsubscribe();
            this.unsubscribe = this.ref.where("target", "==", firebase.auth().currentUser.email).onSnapshot(this.onCollectionUpdate);
        }

        this.state.targeted = !this.state.targeted;
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}> Restaurant account </Text>
                <Button onPress={this.handleSignOut}> Logout </Button>
                <Button onPress={this.toggleTargeted}> Targeted Only Toggle </Button>
                <FlatList
                    data={this.state.messages}
                    renderItem={({ item }) => <Text>{item.message}</Text>}
                />
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
