import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, } from 'react-native';

export default function LoginScreen({ navigation }) {
    return (
        <View style={styles.container}>

            <Text style={styles.title}>Login Screen</Text>

            <TextInput style={styles.input} placeholder="Email" />
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
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
      },

    title: {
        width: '80%',
        fontSize: 38,
        fontWeight: '600',
      },

    input: {
        width: '80%',
        marginTop: 25,
        borderBottomColor: 'orange',
        borderBottomWidth: 1,
        fontSize: 18,
    },
    button: {
        alignItems: 'center',
        paddingTop: 8,
        width: '80%',
        marginTop: 30,
        backgroundColor: 'green',
        borderRadius: 10,
        marginBottom: 80,
      },
    textButton: {
        color: '#ffffff',
        height: 30,
        fontWeight: '600',
        fontSize: 16,
    },

})