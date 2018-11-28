import React from 'react';
import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import IconI from 'react-native-vector-icons/Ionicons';

import LoadingScreen from './../screens/LoadingScreen';

// AUTH
import LoginScreen from './../screens/auth/LoginScreen';
import SignupScreen from './../screens/auth/SignupScreen';

// MAIN
import HomeScreen from './../screens/main/HomeScreen';
import TodoFirebaseScreen from './../screens/main/TodoFirebaseScreen';
import TodoLocalScreen from './../screens/main/TodoLocalScreen';

// MAIN STACK
import AddTodoScreen from './../screens/main/stack/AddTodoScreen';
import ViewTodoScreen from './../screens/main/stack/ViewTodoScreen';

const TodoFirebaseStackNavigator = createStackNavigator({
    todo_firebase: TodoFirebaseScreen,
    add_todo: AddTodoScreen,
    view_todo: ViewTodoScreen
});

TodoFirebaseStackNavigator.navigationOptions = ({ navigation }) => {
    return {
        title: 'Todo Firebase',
        tabBarIcon: ({ tintColor }) => <IconI name='ios-cloud' color={tintColor} size={25} />,
        tabBarVisible: navigation.state.index === 0,
    };
};

const TodoLocalStackNavigator = createStackNavigator({
    todo_local: TodoLocalScreen,
    add_todo: AddTodoScreen,
    view_todo: ViewTodoScreen
});

TodoLocalStackNavigator.navigationOptions = ({ navigation }) => {
    return {
        title: 'Todo Local',
        tabBarIcon: ({ tintColor }) => <IconI name='ios-phone-portrait' color={tintColor} size={25} />,
        tabBarVisible: navigation.state.index === 0,
    };
};

const AuthNavigator = createStackNavigator({
    login: LoginScreen,
    signup: SignupScreen
});

const MainNavigator = createBottomTabNavigator({
    home: HomeScreen,
    todo_firebase_stack: TodoFirebaseStackNavigator,
    todo_local_stack: TodoLocalStackNavigator
});

const AppNavigator = createSwitchNavigator({
    
    loading: LoadingScreen,
    auth: AuthNavigator,
    main: MainNavigator,
});

export default AppNavigator;
