import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import { Icon, Header } from 'react-native-elements';
import MapView from 'react-native-maps';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class FavoriteScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screenType: 0
    };
  }

  render() {
    console.log('screenType=' + this.state.screenType);
    return (
      <View style={styles.container}>
        <SafeAreaView />
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Button title='行きたいところ' onPress={() => this.setState({ screenType: 0 })} />
          <Button title='行ったところ' onPress={() => this.setState({ screenType: 1 })} />
        </View>

        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 35.681236,
            longitude: 139.767125,
            latitudeDelta: 0.02, //小さくなるほどズーム
            longitudeDelta: 0.02,
          }} >
          <MapView.Marker
            coordinate={{
              latitude: 35.681236,
              longitude: 139.767125,
            }}
            title={"東京駅"}
            description={"JRの駅です。"}
            onPress={() => alert("click")}
          />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
  }
});


export default FavoriteScreen;