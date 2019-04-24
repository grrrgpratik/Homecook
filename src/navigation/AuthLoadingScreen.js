import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class AuthLoadingScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>AuthLoadingScreen</Text>
            </View>
        );
    }
}
export default AuthLoadingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});