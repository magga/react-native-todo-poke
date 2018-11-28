import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList, Image, Alert } from 'react-native';
import { ListItem, Body, Right, Thumbnail } from 'native-base';
import IconI from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';
import _ from 'lodash';
import { connect } from 'react-redux';

import { colors } from '../../constants/general/Color';
import { FirebaseDeleteData } from '../../constants/FirebaseHelper';
import * as actions from './../../actions';

class TodoFirebaseScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Todo Local',
            headerStyle: {
                backgroundColor: colors.softDarkBrown
            },
            headerTitleStyle: {
                color: colors.white
            },
            headerRight: (
                <TouchableOpacity onPress={() => navigation.navigate('add_todo', { type: 'local' })}>
                    <IconI name='md-add' size={25} color='white' style={{ marginRight: 20 }} />
                </TouchableOpacity>
            ),
            headerBackTitle: null
        };
    }

    _hapusTodo(data) {
        const { nama, id } = data;

        Alert.alert('WARNING', `Apakah anda yakin akan menghapus "${nama}"?`, [{ text: 'tidak' }, {
            text: 'ya',
            onPress: () => {
                this.props.DeleteTodo(id);

                Alert.alert('BERHASIL', `"${nama}" berhasil dihapus`, [{ text: 'oke' }]);
            }
        }]);
    }

    _renderList() {
        return (
            <FlatList
                data={_.orderBy(this.props.all, ['createdDate'], ['desc'])}
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
                                <View style={{ flexDirection: 'column' }}>
                                    <TouchableOpacity 
                                        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                        onPress={() => {
                                            this.props.ViewTodo(item);
                                            this.props.navigation.navigate('view_todo');
                                        }}
                                    >
                                        <Text style={{ color: colors.softDarkBrown, marginRight: 10 }}>detail</Text>
                                        <IconI name='ios-arrow-forward' size={20} color={colors.softDarkBrown} />
                                    </TouchableOpacity>

                                    <TouchableOpacity 
                                        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 5 }}
                                        onPress={() => this._hapusTodo(item)}
                                    >
                                        <IconI name='ios-trash' size={25} color={colors.softDarkBrown} />
                                    </TouchableOpacity>
                                </View>
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
        return (
            <View style={{ flex: 1, backgroundColor: colors.lightBlue }}>
                {this._renderList()}
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        all: state.todos.allTodo
    };
};

export default connect(mapStateToProps, actions)(TodoFirebaseScreen);
