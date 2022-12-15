import { StyleSheet, Text, View, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function ProfileScreen() {

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.button} activeOpacity={0.8}>
                    <FontAwesome name={"pencil"}size={35} color="#fff" />
                </TouchableOpacity>
            </View>

            <View style={styles.main}>
                <Text> Profile Screen</Text>
                <TouchableOpacity style={styles.button} activeOpacity={0.8}>
                    {/* <FontAwesome name={"pencil"}size={20} /> */}






                    <Image />
                </TouchableOpacity>


            </View>
        </View>

    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: "flex-start",
        paddingTop: 60,
    },
    header: {
        width: "90%",
        marginRight: "auto",
        marginLeft: "auto",
        backgroundColor: "#505",
        padding:5,
    },
    main: {
        width: "90%",
        marginRight: "auto",
        marginLeft: "auto",
    }

})