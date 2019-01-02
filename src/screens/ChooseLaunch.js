import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Navigation } from "react-native-navigation";

import Button from '../components/Button';

export default class RestaurantRequests extends Component {
    
    launchUser = () => {
        Navigation.setRoot({
            root: {
              stack: {
                children: [
                  {
                    component: {
                      name: "screens.FirstPage", 
                      options: {
                        topBar: {
                          visible: false,
                          drawBehind: true,
                        }
                      }
                    }
                  }
                ]
              }
            }
        })
    }

    launchRestaurant = () => {
        Navigation.setRoot({
            root: {
              stack: {
                children: [
                  {
                    component: {
                      name: "screens.RestaurantRequests",
                      options: {
                        topBar: {
                          visible: false,
                          drawBehind: true,
                        }
                      }
                    }
                  }
                ]
              }
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Button onPress={this.launchUser}> Lauch as User </Button>
                <Button onPress={this.launchRestaurant}> Lauch as Restaurant </Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E91E63",
        alignItems: 'center'
    }
});
