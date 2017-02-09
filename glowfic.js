import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ListView,
  View
} from 'react-native';
import HTMLView from 'react-native-htmlview';

const tag = (rowData) => {
  console.log('rendering a tag');
  return <HTMLView
    value={rowData.content}/>;
};

const Thread = ({thread}) => {
  const ds = new ListView
    .DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    .cloneWithRows(thread);
  return <ListView
    dataSource={ds}
    renderRow={tag}
  />;
};

export default class Glowfic extends Component {

  constructor(props) {
    super(props);
    this.state = {thread: null};
  }
  render() {
    console.log('rendering!', this.state);
    if (this.state.thread === null) {
      fetch('https://glowfic.com/api/v1/posts/190').then((r) => r.json()).then((j) => {
        console.log('got json', j);
        const data = j.data;
        const top_post = (({character, content, icon, user}) =>
            ({id: 'toppost', character, content, icon, user}))(data);
        console.log('top post', top_post);
        const thread = [top_post, ...data.replies];
        this.setState({thread});
      }).catch(e => console.warn(e));
    }
    return (
      <View style={styles.container}>
        {
          this.state.thread === null ?
            <Text>"no thread!"</Text> :
            <Thread thread={this.state.thread}/>
        }

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
