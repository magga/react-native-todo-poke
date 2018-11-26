import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList, Image } from 'react-native';
import { ListItem, Body, Right, Thumbnail } from 'native-base';
import IconI from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';
import _ from 'lodash';

import { colors } from '../../constants/general/Color';

class TodoFirebaseScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Todo Firebase',
            headerStyle: {
                backgroundColor: colors.softDarkBrown
            },
            headerTitleStyle: {
                color: colors.white
            },
            headerRight: (
                <TouchableOpacity onPress={() => navigation.navigate('add_todo')}>
                    <IconI name='md-add' size={25} color='white' style={{ marginRight: 20 }} />
                </TouchableOpacity>
            ),
            headerBackTitle: null
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            data: []
        };

        this._listen();
    }

    componentWillUnmount() {
        if (this.ref) {
            this.ref.off();
        }
    }

    _listen() {
        this.ref = firebase.database().ref(`todo/${firebase.auth().currentUser.uid}`);
        
        this.ref.on('value', (snapshot) => {
            if (snapshot.val()) {
                this.setState({ data: _.toArray(snapshot.val()), isLoading: false });
            }
        });
    }

    _renderList() {
        return (
            <FlatList
                data={_.orderBy(this.state.data, ['createdDate'], ['desc'])}
                renderItem={({ item }) => {
                    const { nama, lokasi, icon } = item;

                    let imageSrc = '';

                    if (icon && icon !== '') {
                        imageSrc = { uri: icon };
                    } else {
                        imageSrc = require('./../../../assets/images/pikachu.png');
                    }

                    return (
                        <ListItem>
                            <Image resizeMethod='resize' style={{ width: 75, height: 75 }} source={imageSrc} />
                            <Body style={{ marginLeft: 10 }}>
                                <Text style={{ fontSize: 18 }}>{nama}</Text>
                                <Text style={{ marginTop: 10, fontSize: 12 }}>{lokasi}</Text>
                            </Body>
                            <Right>
                                <TouchableOpacity 
                                    style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                    // onPress={() => this.props.navigation.navigate('detail_kta', { kta: item })}
                                >
                                    <Text style={{ color: colors.softDarkBrown, marginRight: 10 }}>detail</Text>
                                    <IconI name='ios-arrow-forward' size={20} color={colors.softDarkBrown} />
                                </TouchableOpacity>
                            </Right>
                        </ListItem>
                    );
                }}
                keyExtractor={(item) => item.id}
                style={{ flex: 1, backgroundColor: 'white' }}
                ListEmptyComponent={() => {
                    return (
                        <Text style={{ fontSize: 16, color: colors.softDarkBrown, textAlign: 'center', marginTop: 30 }}>Data tidak ditemukan</Text>
                    );
                }}
            />
        );
    }

    render() {
        if (this.state.isLoading) {
            return (
                <ActivityIndicator size='large' style={{ marginTop: 30 }} color={colors.softDarkBrown} />
            );
        }

        return (
            <View style={{ flex: 1, backgroundColor: colors.lightBlue }}>
                {this._renderList()}
            </View>
        );
    }
}

export default TodoFirebaseScreen;
