import React, { Component } from 'react';
import { View, Text, Image, ActivityIndicator, Alert } from 'react-native';
import IconI from 'react-native-vector-icons/Ionicons';
import { Button } from 'native-base';
import { connect } from 'react-redux';

import { colors } from '../../constants/general/Color';
import { FirebaseLogout } from '../../constants/FirebaseHelper';
import * as actions from './../../actions'; 

class HomeScreen extends Component {
    static navigationOptions = {
        title: 'Home',
        tabBarIcon: ({ tintColor }) => <IconI name='ios-home' color={tintColor} size={25} />
    };

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            isFetchingWeather: true
        };
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((location) => {
            const { latitude, longitude } = location.coords;

            this.props.FetchWeather(latitude, longitude)
            .then(() => {
                this.setState({ isFetchingWeather: false });
            })
            .catch((err) => {
                Alert.alert('ERROR', `Gagal mengambil data cuaca. \n\nError : ${err.message}`, [{ text: 'oke' }]);
                this.setState({ isFetchingWeather: false });
            });
        });
    }

    _logout() {
        Alert.alert('WARNING', 'Apakah anda yakin untuk logout?', [{ text: 'tidak' }, {
            text: 'ya',
            onPress: () => {
                this.setState({ isLoading: true });

                FirebaseLogout()
                .then(() => {
                    this.props.ClearTodo();
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

    _renderCuaca() {
        if (this.state.isFetchingWeather) {
            return (
                <ActivityIndicator size='large' color={colors.softYellow} />
            );
        }

        const { name, main } = this.props.weather;

        if (!name) {
            return;
        }

        const { temp } = main;

        return (
            <View style={{ alignItems: 'center', borderWidth: 1, borderColor: colors.white, padding: 20 }}>
                <Text style={{ color: colors.white, fontSize: 18, textAlign: 'center', marginBottom: 5 }}>{`Lokasi Anda : ${name}`}</Text>
                <Text style={{ color: colors.white, fontSize: 18, textAlign: 'center' }}>{`Cuaca saat ini : ${temp}° C`}</Text>
            </View>
        );
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: colors.lightBlue, padding: 50 }}>
                {this._renderCuaca()}

                <Image resizeMethod='resize' source={require('./../../../assets/images/snorlax.png')} style={{ height: 167, aspectRatio: 1 }} />

                {this._renderButtonLogout()}
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        weather: state.weather.todaysWeather
    };
};

export default connect(mapStateToProps, actions)(HomeScreen);
