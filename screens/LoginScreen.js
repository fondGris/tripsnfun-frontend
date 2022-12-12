import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, } from 'react-native';

export default function LoginScreen({ navigation }) {
    return (
        <View style={styles.container}>

            <Text style={styles.title}>Login Screen</Text>

            <TextInput style={styles.input} placeholder="Login" />
            <TextInput style={styles.input} placeholder="Password" />
            <TouchableOpacity onPress={() => navigation.navigate('TabNavigator')} style={styles.button} activeOpacity={0.8}>
                <Text style={styles.textButton}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'red',
    },
    input: {
        width: '80%',
        marginTop: 25,
        borderBottomColor: '#ec6e5b',
        borderBottomWidth: 1,
        fontSize: 18,
    },
    textButton: {
        color: '#ffffff',
        height: 30,
        fontWeight: '600',
        fontSize: 16,
    },

})