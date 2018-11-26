import React, { Component } from 'react';
import { View, Text, Image, ActivityIndicator, Alert } from 'react-native';
import IconI from 'react-native-vector-icons/Ionicons';
import { Button } from 'native-base';

import { colors } from '../../constants/general/Color';
import { FirebaseLogout } from '../../constants/FirebaseHelper';

class HomeScreen extends Component {
    static navigationOptions = {
        title: 'Home',
        tabBarIcon: ({ tintColor }) => <IconI name='ios-home' color={tintColor} size={25} />
    };

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false
        };
    }

    _logout() {
        Alert.alert('WARNING', 'Apakah anda yakin untuk logout?', [{ text: 'tidak' }, {
            text: 'ya',
            onPress: () => {
                this.setState({ isLoading: true });

                FirebaseLogout()
                .then(() => {
                    Alert.alert('BERHASIL', 'Berhasil logout', [{ text: 'ok' }]);
                    this.setState({ isLoading: false });
                })
                .catch((err) => {
                    Alert.alert('ERROR', err.message, [{ text: 'ok' }]);
                    this.setState({ isLoading: false });
                });
            }
        }]);
    }

    _renderButtonLogout() {
        if (this.state.isLoading) {
            return (
                <ActivityIndicator size='large' style={{ marginTop: 30 }} color={colors.white} />
            );
        }

        return (
            <Button 
                rounded 
                style={{ width: '100%', justifyContent: 'center', backgroundColor: colors.softYellow, marginTop: 30 }}
                onPress={this._logout.bind(this)}
            >
                <Text style={{ color: colors.black, width: '100%', textAlign: 'center' }}>LOGOUT</Text>
            </Button>
        );
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.lightBlue, padding: 50 }}>
                <Image resizeMethod='resize' source={require('./../../../assets/images/snorlax.png')} style={{ height: 167, aspectRatio: 1, marginBottom: 50 }} />

                {this._renderButtonLogout()}
            </View>
        );
    }
}

export default HomeScreen;
