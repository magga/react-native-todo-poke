import React, { Component } from 'react';
import { View, Text, Image, ActivityIndicator, Alert } from 'react-native';
import { Item, Input, Button, Toast } from 'native-base';
import IconI from 'react-native-vector-icons/Ionicons';

import { colors } from '../../constants/general/Color';
import { FirebaseSignup } from '../../constants/FirebaseHelper';

class SignupScreen extends Component {
    static navigationOptions = {
        title: 'Signup',
        headerStyle: {
            backgroundColor: colors.lightBrown
        },
        headerTitleStyle: {
            color: colors.white
        },
        headerBackTitleStyle: {
            color: colors.white
        },
        headerTintColor: colors.white
    }

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            email: '',
            password: '',
            ulangPassword: ''
        };
    }

    _renderLogo() {
        return (
            <Image resizeMethod='resize' source={require('./../../../assets/images/pikachu.png')} style={{ height: 150, width: 150, marginBottom: 50 }} />
        );
    }

    _renderForm() {
        return (
            <View style={{ width: '100%' }}>
                <Item rounded style={{ backgroundColor: 'white', borderColor: 'white' }}>
                    <IconI name='ios-mail' size={25} style={{ marginLeft: 20, marginTop: 4, marginRight: 10 }} />
                    <Input 
                        placeholder='Email' 
                        autoCapitalize='none' 
                        autoCorrect={false} 
                        value={this.state.email}
                        onChangeText={(text) => this.setState({ email: text })}
                    />
                </Item>

                <Item rounded style={{ marginTop: 10, backgroundColor: 'white', borderColor: 'white' }} >
                    <IconI name='ios-key' size={25} style={{ marginLeft: 20, marginTop: 4, marginRight: 10 }} />
                    <Input 
                        placeholder='Password' 
                        autoCapitalize='none' 
                        autoCorrect={false} 
                        secureTextEntry 
                        value={this.state.password}
                        onChangeText={(text) => this.setState({ password: text })}
                    />
                </Item>

                <Item rounded style={{ marginTop: 10, backgroundColor: 'white', borderColor: 'white' }} >
                    <IconI name='md-shuffle' size={25} style={{ marginLeft: 20, marginTop: 4, marginRight: 10 }} />
                    <Input 
                        placeholder='Ulang Password' 
                        autoCapitalize='none' 
                        autoCorrect={false} 
                        secureTextEntry 
                        value={this.state.ulangPassword}
                        onChangeText={(text) => this.setState({ ulangPassword: text })}
                    />
                </Item>
            </View>
        );
    }

    _signup() {
        const { email, password, ulangPassword } = this.state;

        if (!email) {
            return Toast.show({ text: 'Harap masukkan email terlebih dahulu', buttonText: 'oke', duration: 2500, type: 'danger' });
        }

        if (!password) {
            return Toast.show({ text: 'Harap masukkan password terlebih dahulu', buttonText: 'oke', duration: 2500, type: 'danger' });
        }

        if (password !== ulangPassword) {
            return Toast.show({ text: 'Password yang anda masukkan tidak sama', buttonText: 'oke', duration: 2500, type: 'danger' });
        }

        this.setState({ isLoading: true });

        FirebaseSignup(email, password)
        .then(() => {
            Alert.alert('BERHASIL', 'Berhasil signup', [{ text: 'ok' }]);
            this.setState({ isLoading: false });
        })
        .catch((err) => {
            Alert.alert('ERROR', err.message, [{ text: 'ok' }]);
            this.setState({ isLoading: false });
        });
    }

    _renderButtonSignup() {
        if (this.state.isLoading) {
            return (
                <ActivityIndicator size='large' style={{ marginTop: 30 }} color={colors.white} />
            );
        }

        return (
            <Button 
                rounded 
                style={{ width: '100%', justifyContent: 'center', backgroundColor: colors.lightBrown, marginTop: 30 }}
                onPress={this._signup.bind(this)}
            >
                <Text style={{ color: colors.white, width: '100%', textAlign: 'center' }}>SIGNUP</Text>
            </Button>
        );
    }

    render() {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: colors.darkBrown, flex: 1 }}>
                {this._renderLogo()}
                {this._renderForm()}
                {this._renderButtonSignup()}
            </View>
        );
    }
}

export default SignupScreen;
