import { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import HTMLView from 'react-native-htmlview';

export default class Glowfic extends Component {

  constructor(props) {
    super(props);
    this.state = {thread: null};
  }
  render() {
    console.log('rendering!');
    if (this.state.thread === null) {
      fetch('https://glowfic.com/api/v1/posts/190').
        then(r => r.json()).
        then(r => this.setState({thread: r})).
        catch(e => console.warn(e));
    }
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>
          {
            (() => {
              if (this.state.thread === null) {
                return "no thread!";
              } else {
                return "found the thread! Got " + this.state.thread.data.replies.length + " tags!";
              }
            })()
          }

        </Text>
        {(() => {
          if (this.state.thread !== null) {
            return <HTMLView
              value={this.state.thread.data.content}
            />;
          }
        })()}
      </View>
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
});
