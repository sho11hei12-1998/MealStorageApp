import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import { Searchbar } from 'react-native-paper';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const icon_name = [
  {
    id: 0,
    name: "restaurant",
    color: "orange",
    text: "カテゴリー"
  },
  {
    id: 1,
    name: "restaurant",
    color: "orange",
    text: "カテゴリー"
  },
  {
    id: 2,
    name: "restaurant",
    color: "orange",
    text: "カテゴリー"
  },
  {
    id: 3,
    name: "restaurant",
    color: "orange",
    text: "カテゴリー"
  },
  {
    id: 4,
    name: "restaurant",
    color: "orange",
    text: "カテゴリー"
  },
];

class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView />
        <Searchbar
          placeholder="検索"
          onChangeText={text => this.setState({ search: text })}
          value={this.state.search}
          returnKeyType='search'
          style={{ marginBottom: 20, marginHorizontal: 20 }}
        />

        {/* 探す */}
        <Text style={styles.title}>探す</Text>
        <View style={{ alignItems: 'flex-start', flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 }}>
          {icon_name.map((item, idx) => {
            return (
              <TouchableOpacity
                key={'icon_' + idx}
              // onPress={() => this.props.navigation.navigate('')}
              >
                <View style={styles.icon_container}>
                  <Icon
                    reverse
                    name={item.name}
                    type='ionicon'
                    color={item.color}
                    size={30}
                  />
                  <Text>{item.text}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.title}>トレンドキーワード</Text>


        <Text style={styles.title}>検索履歴</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 17,
    paddingLeft: 20,
    paddingVertical: 10
  },
  icon_container: {
    alignItems: 'center',
    width: SCREEN_WIDTH / 3,
    paddingBottom: 15,
  }
});


export default SearchScreen;