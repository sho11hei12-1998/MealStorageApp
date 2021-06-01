import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, ScrollView, SafeAreaView,
  Button
} from 'react-native';
import { Icon, Header, Input } from 'react-native-elements';
import { AppleCard, AppOfTheDayCard } from 'react-native-apple-card-views';
import Modal from 'react-native-modal';

import Fire from 'app/screens/Fire_Posts';

const { width, height } = Dimensions.get('window');
class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allPosts: [],
      stock_status: false,

      // 初回のみModal表示
      userInfoModal: false,
      userName: null,
      address: null,
    };
    //  Firestoreのデータを読みこむ 
    this.downloadAllPosts();
  }

  componentDidMount = async () => {
    if (this.props.route.params != null) {
      const post = this.props.route.params;
      await this.setState({ allPosts: post });
    }
    this.downloadAllPosts();
    console.log(this.state.allPosts);
  }

  // ユーザーお住まいの県かつ直近１週間の情報のみをダウンロード
  async downloadAllPosts() {
    const posts = await Fire.shared.getPosts();
    this.setState({
      allPosts: posts,
    });
  }


  // user情報を登録
  async onPressResister() {
    const { iconUrl, userName, address } = this.state;
    await Fire.shared.uploadUserInfo({
      iconUrl, userName, address
    });
    alert('登録が完了しました。');
  }
  renderModal() {
    return (
      <Modal isVisible={this.state.userInfoModal} style={{ justifyContent: 'center' }}>
        <View style={{
          justifyContent: 'center',
          height: 300,
          backgroundColor: 'white',
          borderRadius: 10,
          overflow: 'hidden',
        }}>
          <Input
            placeholder='User Name'
            label={'ユーザー名'}
            value={this.state.userName}
            onChangeText={userName => this.setState({ userName })}
          />
          <Input
            placeholder='Enter Address'
            label={'お住まい'}
            value={this.state.address}
            onChangeText={address => this.setState({ address })}
          />

          <Button
            title="登録"
            onPress={() => {
              // this.onPressResister();
              this.setState({ userInfoModal: false });
            }}
          />
        </View>
      </Modal>
    );
  }

  stockItem(i) {
    this.setState({ stock_status: !this.state.stock_status });
    console.log("stock_status Changed!");
  }

  render() {
    const { allPosts } = this.state;
    return (
      <View style={styles.container}>
        {/* <SafeAreaView /> */}
        <Header
          backgroundColor="#fff"
          placement="left"
          leftComponent={{ text: 'おはよう', style: styles.headerStyle }}
          rightComponent={
            <View>
              <TouchableOpacity
                style={{ marginRight: 15 }}
                onPress={() => this.props.navigation.navigate('Search')}
              >
                <Icon
                  name='search'
                  type='material-icons'
                  color='black'
                  size={25}
                />
              </TouchableOpacity>
            </View>
          }
        />

        {/* Modal */}
        {this.renderModal()}

        {/* renderPostImage */}
        <ScrollView
          style={{ alignSelf: 'center', paddingTop: 10 }}
        >
          {allPosts
            .sort((a, b) => b.postIndex - a.postIndex)
            .map((item, i) => {
              {/* console.log(item); */ }
              return (
                <View
                  key={'post_' + i}
                  style={styles.itemCard_container}
                >
                  <AppleCard
                    smallTitle="焼肉"
                    largeTitle={item.shopName}
                    footnoteText={item.text}
                    footnoteTextStyle={{ fontSize: 20 }}
                    resizeMode="cover"
                    source={{ uri: item.imgUrl }}
                    backgroundStyle={{
                      width: width - 40,
                    }}
                    onPress={() => this.props.navigation.navigate('Detail', item)}
                  />
                  <TouchableOpacity
                    onPress={() => this.stockItem(i)}>
                    <Icon
                      name={
                        this.state.stock_status === false
                          ? 'turned-in-not' : 'done'
                      }
                      type='material-icons'
                      color='black'
                      size={35}
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerStyle: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 20
  },
  itemCard_container: {
    marginBottom: 50,
  }
});

export default HomeScreen;