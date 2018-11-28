import React, { Component } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Image, Linking, Platform, Alert } from 'react-native';
import { Grid, Row, Input, Button, Toast } from 'native-base';
import { connect } from 'react-redux';

import { colors } from '../../../constants/general/Color';

class ViewTodoScreen extends Component {
    static navigationOptions = () => {
        return {
            title: 'View Todo',
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
            isOpeningMap: false
        };
    }

    _lihatLokasi() {
        const { lokasiLat, lokasiLon } = this.props.current;

        if (!lokasiLat && !lokasiLon) {
            return Toast.show({ text: 'Todo ini tidak memiliki lokasi', buttonText: 'oke', duration: 3000, type: 'danger' });
        }

        let url = '';

        if (Platform.OS === 'ios') {
            url = `http://maps.apple.com/?ll=${lokasiLat},${lokasiLon}`;
        } else {
            url = `geo:${lokasiLat},${lokasiLon}`;
        }

        this.setState({ isOpeningMap: true });

        Linking.openURL(url)
        .then(() => {
            this.setState({ isOpeningMap: false });
        })
        .catch((err) => {
            Alert.alert('ERROR', `Tidak dapat membuka peta. \n\nError : ${err.message}`, [{ text: 'oke' }]);
            this.setState({ isOpeningMap: false });
        });
    }

    _renderButtonLihatLokasi() {
        if (this.state.isOpeningMap) {
            return (
                <ActivityIndicator size='large' style={{ margin: 15 }} color={colors.softDarkBrown} />
            );
        }

        return (
            <Button 
                rounded 
                style={{ flex: 1, justifyContent: 'center', backgroundColor: colors.softDarkBrown, margin: 15 }}
                onPress={this._lihatLokasi.bind(this)}
            >
                <Text style={{ color: colors.white, width: '100%', textAlign: 'center' }}>Lihat Lokasi</Text>
            </Button>
        );
    }

    _renderRowDetail(judul, isi) {
        const { inputStyle, textStyle } = styles;

        return (
            <Grid style={{ flex: 1, margin: 15 }}>
                <Row>
                    <Text style={textStyle}>{judul}</Text>
                </Row>

                <Row style={{ marginTop: 10 }}>
                    <Input 
                        style={inputStyle} 
                        value={isi} 
                        multiline 
                        disabled
                    />
                </Row>
            </Grid>
        );
    }

    _renderIcon(icon) {
        let imageSrc = '';

        if (!icon || icon === '') {
            imageSrc = require('./../../../../assets/images/pikachu.png');
        } else {
            imageSrc = { uri: icon };
        }

        return (
            <View style={{ alignItems: 'center' }}>
                <Image 
                    resizeMethod='resize' 
                    source={imageSrc} 
                    style={{ height: 167, aspectRatio: 1, marginBottom: 50 }} 
                />
            </View>
        );
    }

    _renderForm() {
        const { nama, lokasi, icon } = this.props.current;

        return (
            <View style={{ marginVertical: 20 }}>
                {this._renderIcon(icon)}
                {this._renderRowDetail('Nama', nama)}
                {this._renderRowDetail('Lokasi', lokasi)}
                {this._renderButtonLihatLokasi()}
            </View>
        );
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: colors.softYellow }}>
                <ScrollView style={{ paddingHorizontal: 20 }}>
                    {this._renderForm()}
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

const mapStateToProps = (state) => {
    return {
        current: state.todos.currentTodo
    };
};

export default connect(mapStateToProps)(ViewTodoScreen);
