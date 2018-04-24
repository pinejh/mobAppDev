import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableOpacity } from 'react-native';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {count: 0};
    this.incr = 1
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.touch} onPress={() => {
          var num = this.state.count + this.incr;
          this.setState({ count: num });
          if (num % 1000 == 0) {
            Alert.alert('WOW');
            this.incr = 10
          }
          else if (num == 100) {
            Alert.alert('wow');
            this.incr = 5;
          }
        }}>
          <Text style={styles.number}>{this.state.count}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  touch: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  number: {
    fontSize: 50
  },
  button: {
    padding: 30
  }
});
