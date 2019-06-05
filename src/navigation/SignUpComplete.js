import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class SignUpCompleteScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={{color:"black"}}>SignUpScreen</Text>
            </View>
        );
    }
}
export default SignUpCompleteScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});