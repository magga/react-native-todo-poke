import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import IconI from 'react-native-vector-icons/Ionicons';

import { colors } from '../../constants/general/Color';

class TodoLocalScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Todo Local',
            headerStyle: {
                backgroundColor: colors.red
            },
            headerTitleStyle: {
                color: colors.white
            },
            headerRight: (
                <TouchableOpacity>
                    <IconI name='md-add' size={25} color='white' style={{ marginRight: 20 }} />
                </TouchableOpacity>
            ),
            headerBackTitle: null
        };
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.yellow, padding: 50 }}>
                <Image resizeMethod='resize' source={require('./../../../assets/images/pikachu.png')} style={{ height: 167, aspectRatio: 1, marginBottom: 50 }} />

                <Text style={{ fontSize: 20, color: colors.red }}>Coming soon...</Text>
            </View>
        );
    }
}

export default TodoLocalScreen;
