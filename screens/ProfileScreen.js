import { StyleSheet, Text, View, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, removeAllMarkers } from '../reducers/user';

export default function ProfileScreen({ navigation }) {
	const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);
    const BACKEND_ADDRESS = "http://192.168.10.137:3000";


	const handleLogout = () => {
        console.log("OK1");
		dispatch(logout());
        dispatch(removeAllMarkers())
        fetch(`${BACKEND_ADDRESS}/status/${user.token}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
          })
            .then((response) => response.json())
            .then((data) => {        console.log("OK2", data);
        })
              
        navigation.navigate("indexLogin")
	};

    return (
        <View style={styles.container}>
            <View >
                <Text> Profile Screen</Text>
                <TouchableOpacity style={styles.button} activeOpacity={0.8}>
                    <FontAwesome name={"pencil"}size={20} onPress={() => handleLogout()} />
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