import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, } from 'react-native';
import { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default function LoginScreen({ navigation }) {

    const [showPassword, setShowPassword] = useState(false);


    return (
        <View style={styles.container}>

            <Text style={styles.title}>Login Screen</Text>

            <TextInput style={styles.input} placeholder="Email" />
            <TextInput style={styles.input} placeholder="Password" autoCapitalize={'none'} autoCorrect={false} secureTextEntry={!showPassword} onChangeText={() => {}} textContentType={'password'} />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
        <Text>{showPassword ? <FontAwesome name={'eye'} size={25} /> : <FontAwesome name={'eye-slash'} size={25} />} </Text>
      </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('TabNavigator')} style={styles.button} activeOpacity={0.8}>
                <Text style={styles.textButton}>Submit</Text>
            </TouchableOpacity>
            <Text> OR </Text>
            <TouchableOpacity onPress={() => navigation.navigate('signup')} style={styles.button} activeOpacity={0.8}>
                <Text style={styles.textButton}>Create an account</Text>
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
        backgroundColor: '#05898E',
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