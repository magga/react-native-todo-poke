import React, { Component } from 'react';
import { View, Image, ActivityIndicator } from 'react-native';
import firebase from 'firebase';

import { colors } from '../constants/general/Color';

class LoadingScreen extends Component {
    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            this.props.navigation.navigate(user ? 'main' : 'auth');
        });
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.yellow }}>
                <Image resizeMethod='resize' source={require('./../../assets/images/pikachu.png')} style={{ height: 150, width: 150, marginBottom: 50 }} />
                <ActivityIndicator size='large' color={colors.red} />
            </View>
        );
    }
}

export default LoadingScreen;
