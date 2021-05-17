import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Icon, Header, Card } from 'react-native-elements';

const { width, height } = Dimensions.get("window");

class CategoryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '焼肉'
    };
  }

  componentDidMount() {
    // const title_name = this.props.navigation.state.params;
    // this.setState({ title: title_name });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor="#fff"
          placement="center"
          leftComponent={
            <View>
              <TouchableOpacity
                style={{ marginRight: 15 }}
                onPress={() => this.props.navigation.navigate('Profile')}
              >
                <Icon
                  name='arrow-left'
                  type='material-community'
                  color='black'
                  size={25}
                />
              </TouchableOpacity>
            </View>
          }
          centerComponent={{ text: this.state.title, style: styles.headerStyle }}
        />
        <ScrollView>
          <View>
            <Card></Card>
          </View>
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
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CategoryScreen;