/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import Geolocation from 'react-native-geolocation-service';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

class Speed extends Component {

  constructor(props) {
    super(props);
    this.state = { metersPerSecond: -1, milesPerHour: -1 };
  }

  componentDidMount() {
    const hasLocationPermission = true;

    if (hasLocationPermission) {
      setInterval(() => (
        Geolocation.getCurrentPosition(
          (position) => {
            const metersPerSecond = position.coords.speed;
            if (metersPerSecond < 0) {
              return;
            }
            this.setState({
              metersPerSecond: metersPerSecond,
              milesPerHour: metersPerSecond * 2.237
            })
          },
          (error) => {
              console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 500, maximumAge: 500 }
        )

      ), 1000);
    }
  }

  render() {
    return (
      <View>
        <Text>{this.state.metersPerSecond} meters per second</Text>
        <Text>{this.state.milesPerHour} miles per hour</Text>
      </View>
    )
  }
}

class App extends Component { 
  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.body}>
              <Speed></Speed>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
  
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
