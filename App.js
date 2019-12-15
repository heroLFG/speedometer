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
  Colors
} from 'react-native/Libraries/NewAppScreen';

import {PermissionsAndroid} from 'react-native';

async function requestFineLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Speedometer Location Permission',
        message:
          'gavin wants your info ' +
          'to do cool things.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the fine location');
    } else {
      console.log('fine location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

class Gavin extends Component {
  render() {
    return (
      <Text style={styles.big}>{this.props.text}<Text style={styles.smallFont}>mph</Text></Text>
    )
  }
}

class Speed extends Component {

  constructor(props) {
    super(props);
    requestFineLocationPermission();
    this.state = { reads: 0, metersPerSecond: -1, milesPerHour: -1 };
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  componentDidMount() {
    const hasLocationPermission = true;

    if (hasLocationPermission) {
      this.intervalID = setInterval(() => (
        Geolocation.getCurrentPosition(
          (position) => {
            const reads = this.state.reads
            const metersPerSecond = position.coords.speed;
            if (metersPerSecond < 0 || position.coords.accuracy > 20) {
              this.setState({ reads: reads + 1 })
              return;
            }
            this.setState({
              json: JSON.stringify(position),
              metersPerSecond: Math.round(metersPerSecond),
              milesPerHour: Math.round(metersPerSecond * 2.23694),
              reads: reads + 1
            })
          },
          (error) => {
              console.log(error.code, error.message);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
            distanceFilter: 0
          }
        )

      ), 1000);
    }
  }

  render() {
    return (
      <View>
        <Gavin text={this.state.milesPerHour}></Gavin>
        <View style={styles.footer}>
          <Text>{this.state.json}</Text>
          <Text>{this.state.reads} reads</Text>
        </View>
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
  big: {
    fontSize: 80,
    textAlign: 'center',
    paddingTop: '15%',
    paddingBottom: '15%'
  },
  smallFont: {
    fontSize: 12
  },
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
    bottom: 5
  },
});

export default App;
