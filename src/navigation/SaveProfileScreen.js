import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Platform
} from 'react-native';
import { SaveProfile } from 'container_f';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Color } from 'common_f';

class EditProfileScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.back}
            onPress={() => navigation.goBack()}
          >
            <MaterialCommunityIcons
              name='chevron-left'
              color={'black'}
              size={30}
            />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>EDIT PROFILE</Text>
            <Text style={[styles.title, { color: Color.secondary }]}>SAVE</Text>
          </View>
        </View>
      )
      // headerTransparent: true
      //mode: "modal"
    };
  };
  render() {
    const { navigate } = this.props.navigation;
    return <SaveProfile />;
  }
}
export default EditProfileScreen;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row'
  },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    flexDirection: 'row',
    marginTop: Platform.OS === 'ios' ? 14 : 0
  },
  back: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 16,
    color: Color.black,
    fontFamily: 'Nunito-Black',
    alignSelf: 'center',
    marginLeft: 82
    //padding: 10
  },
  titleContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row'
    //backgroundColor: "red"
  }
});
