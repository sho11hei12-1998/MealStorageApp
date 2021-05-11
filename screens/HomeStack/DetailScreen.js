import React from 'react';
import {
  StyleSheet, Text, View, Button, TouchableOpacity, Image
} from 'react-native';
import { Icon } from 'react-native-elements';

class DetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DetailPosts: [],
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Image
            style={{
              width: 350,
              height: 350,
            }}
          // source={{ uri: item.imgUrl }}
          />
        </View>
        {/* <View style={{ alignItems: 'flex-end' }}>
          <Icon
            name='heart'
            type='material-community'
            color='gray'
            size={30}
            style={{ margin: 10 }}
          />
          <Icon
            name='comment'
            type='material-community'
            color='gray'
            size={30}
            style={{ margin: 10 }}
          />
          <Icon
            name='share'
            type='material-community'
            color='gray'
            size={30}
            style={{ margin: 10 }}
          />
          <TouchableOpacity>
            <Icon
              reverse
              name='person'
              type='material-icons'
              color='orange'
              size={20}
              style={{ marginRight: 30 }}
            />
          </TouchableOpacity>
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});


export default DetailScreen;