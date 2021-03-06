import React from 'react';
import { Provider } from 'react-redux'
import store from './src/store';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import AppNavigator from './src/components/router/router';
console.disableYellowBox = true;
if (!__DEV__) {
  console.log = () => { };
  console.error = () => { };
}
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  componentWillMount = async () => {
  }

  componentDidMount() {

  }

  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <AppNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  logo: {
    height: 80,
    marginBottom: 16,
    marginTop: 32,
    width: 80,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  modules: {
    margin: 20,
  },
  modulesHeader: {
    fontSize: 16,
    marginBottom: 8,
  },
  module: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  }
});
