import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { Root } from 'native-base';

import AppNavigator from './src/code/route/RouteConfig';
import { firebaseConfig } from './src/code/constants/secrets';

class App extends Component {
	constructor(props) {
		super(props);

		if (!firebase.apps.length) {
			firebase.initializeApp(firebaseConfig);
		}
	}

	render() {
		return (
			<Root>
				<View style={{ flex: 1 }}>
					<AppNavigator />
				</View>
			</Root>
		);
	}
}

export default App;
