import { StyleSheet, Text, View, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function ProfileScreen() {

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.btn} activeOpacity={0.8}>
                    <FontAwesome name={"pencil"}size={35} color="#fff" />
                </TouchableOpacity>
            </View>

            <View style={styles.main}>
                <View style={styles.headCard}>
                    <TouchableOpacity style={styles.btn} activeOpacity={0.8}>
                        <FontAwesome name={"pencil"}size={35} color="#888" />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.badge}>
                            Buddies <Text style={styles.strong}> 28</Text>
                        </Text>
                    </View>
                    <Image source="../assets/img/Yssamm.jpg" style={styles.profilePicture} />

                </View>

                <Text> Profile Screen</Text>



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