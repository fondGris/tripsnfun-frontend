import { Button, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function ProfileScreen() {

    return (
        <View style={styles.container}>
            <View >
                <Text> Profile Screen</Text>
                <TouchableOpacity style={styles.button} activeOpacity={0.8}>
                    <FontAwesome name={"pencil"}size={20} />
                    <Image />
                </TouchableOpacity>


            </View>
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
})