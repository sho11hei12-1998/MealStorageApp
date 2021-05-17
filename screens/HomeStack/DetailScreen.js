import React from 'react';
import { ImageBackground } from 'react-native';
import {
  StyleSheet, Text, View, Button, TouchableOpacity, Image,
  SafeAreaView, Dimensions
} from 'react-native';
import { Icon } from 'react-native-elements';

const { width, height } = Dimensions.get('window');

class DetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DetailPost: [],
    };
  }

  componentDidMount = async () => {
    const DetailPost = this.props.route.params;
    await this.setState({ DetailPost: DetailPost });
    console.log(this.state.DetailPost);
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <ImageBackground
            style={{
              width: width,
              height: width,
            }}
            source={{ uri: this.state.DetailPost.imgUrl }}
          >
            <SafeAreaView />
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={{ alignSelf: 'flex-start', marginLeft: 20, }}
            >
              <Icon
                reverse
                name='close'
                type='material-icons'
                color='gray'
                size={20}
              />
            </TouchableOpacity>
          </ImageBackground>
        </View>

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