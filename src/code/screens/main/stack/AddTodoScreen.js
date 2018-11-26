import React, { Component } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Grid, Row, Input, Button, Toast } from 'native-base';
import RNGooglePlaces from 'react-native-google-places';
import shortid from 'shortid';
import firebase from 'firebase';

import { colors } from '../../../constants/general/Color';
import { FirebaseSetData } from '../../../constants/FirebaseHelper';

class AddTodoScreen extends Component {
    static navigationOptions = () => {
        return {
            title: 'Add Todo',
            headerStyle: {
                backgroundColor: colors.darkBlue
            },
            headerTitleStyle: {
                color: colors.white
            },
            headerTintColor: colors.white
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            nama: '',
            lokasi: '',
            lokasiLat: null,
            lokasiLon: null,
            icon: null,
            isOpeningMap: false,
            isLoading: false
        };
    }

    _pilihLokasi() {
        this.setState({ isOpeningMap: true });

        RNGooglePlaces.openPlacePickerModal()
        .then((place) => {
            console.log('place', place);

            const { address, latitude, longitude } = place;

            this.setState({ isOpeningMap: false, lokasi: address, lokasiLat: latitude, lokasiLon: longitude });
        })
        .catch((err) => {
            Toast.show({ text: err.message, buttonText: 'ok', duration: 3000, type: 'danger' });
            this.setState({ isOpeningMap: false });
        });
    }

    _renderButtonPilihLokasi() {
        if (this.state.isOpeningMap) {
            return (
                <ActivityIndicator size='large' style={{ margin: 15 }} color={colors.softDarkBrown} />
            );
        }

        return (
            <Button 
                rounded 
                style={{ flex: 1, justifyContent: 'center', backgroundColor: colors.softDarkBrown, margin: 15 }}
                onPress={this._pilihLokasi.bind(this)}
            >
                <Text style={{ color: colors.white, width: '100%', textAlign: 'center' }}>Pilih Lokasi</Text>
            </Button>
        );
    }

    _renderRowDetail(judul, field, disabled = false) {
        const { inputStyle, textStyle } = styles;

        return (
            <Grid style={{ flex: 1, margin: 15 }}>
                <Row>
                    <Text style={textStyle}>{judul}</Text>
                </Row>

                <Row style={{ marginTop: 10 }}>
                    <Input 
                        style={inputStyle} 
                        value={this.state[field]} 
                        multiline 
                        disabled={disabled} 
                        onChangeText={(text) => this.setState({ [field]: text })}
                        autoCorrect={false}
                    />
                </Row>
            </Grid>
        );
    }

    _renderForm() {
        return (
            <View>
                {this._renderRowDetail('Nama', 'nama')}
                {this._renderRowDetail('Lokasi', 'lokasi', true)}
                {this._renderButtonPilihLokasi()}
                {this._renderRowDetail('Icon', 'icon')}
            </View>
        );
    }

    _renderButtonSimpan() {
        if (this.state.isLoading) {
            return (
                <ActivityIndicator size='large' style={{ margin: 15 }} color={colors.lightBlue} />
            );
        }

        return (
            <Button 
                rounded 
                style={{ flex: 1, justifyContent: 'center', backgroundColor: colors.lightBlue, margin: 15 }}
                onPress={this._simpan.bind(this)}
            >
                <Text style={{ color: colors.white, width: '100%', textAlign: 'center' }}>SIMPAN</Text>
            </Button>
        );
    }

    _simpan() {
        const { nama, lokasi, lokasiLat, lokasiLon, icon } = this.state;

        if (!nama) {
            return Toast.show({ text: 'Harap masukkan nama terlebih dahulu', buttonText: 'oke', duration: 2500, type: 'danger' });
        }

        Alert.alert('WARNING', 'Apakah anda yakin data anda sudah benar?', [{ text: 'batal' }, {
            text: 'ya',
            onPress: () => {
                this.setState({ isLoading: true });

                const id = shortid.generate();

                FirebaseSetData(`todo/${firebase.auth().currentUser.uid}/${id}`, {
                    id,
                    nama,
                    lokasi,
                    lokasiLat,
                    lokasiLon,
                    icon,
                    createdDate: (new Date()).toISOString()
                })
                .then(() => {
                    Alert.alert('BERHASIL', 'Todo berhasil dibuat', [{ text: 'ok' }]);
                    this.setState({ isLoading: false });
                    this.props.navigation.goBack();
                })
                .catch((err) => {
                    Alert.alert('ERROR', `Can't insert data. \n\nError: ${err.message}`, [{ text: 'ok' }]);
                    this.setState({ isLoading: false });
                });
            }
        }]);
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: colors.softYellow }}>
                <ScrollView style={{ padding: 20 }}>
                    {this._renderForm()}
                    {this._renderButtonSimpan()}
                </ScrollView>
            </View>
        );
    }
}

const styles = {
    inputStyle: { 
        flex: 1, 
        borderBottomWidth: 0.4, 
        borderBottomColor: 'black', 
        fontSize: 14, 
        color: 'black', 
        margin: 5,
        paddingBottom: 10
    },
    textStyle: { 
        fontSize: 16, 
        color: 'black' 
    }
};

export default AddTodoScreen;
