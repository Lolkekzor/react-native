import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/Ionicons';

export default class FirstPageModal extends Component {


    getRadioButton = (index) => {
        if (this.props.isPressed[index] == false)
            return (
                <TouchableOpacity onPress={() => this.props.selectItem(index)} style={{ padding: 10 }}>
                    <Icon name="ios-radio-button-off" size={30} color="#A01F5B" />
                </TouchableOpacity>
            )
        else
            return (
                <TouchableOpacity onPress={() => this.props.selectItem(index)} style={{ padding: 10 }}>
                    <Icon name="ios-radio-button-on" size={30} color="#A01F5B" />
                </TouchableOpacity>
            )
    }

    render() {
        return (
            <Modal
                isVisible={this.props.isModalVisible}
                onBackdropPress={() => this.props.toggleModal()}
                onBackButtonPress={() => this.props.toggleModal()}
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
                    <TouchableOpacity onPress={this.props.toggleModal}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 10 }}>Done</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
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
});