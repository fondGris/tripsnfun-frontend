import { StyleSheet, Text, View, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, removeAllMarkers } from '../reducers/user';

export default function ProfileScreen({ navigation }) {
	const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);


	const handleLogout = () => {
		dispatch(logout());
        dispatch(removeAllMarkers())
        navigation.navigate("indexLogin")
	};

    return (
        <View style={styles.container}>
            <View>

                <View style={styles.header}>
                <TouchableOpacity style={styles.button} activeOpacity={0.8} color="#fff">
                        <FontAwesome name={"pencil"}size={20} />
                    </TouchableOpacity>
                </View>

                <View style={styles.main}>
                    <Text> Profile Screen</Text>
                    <TouchableOpacity style={styles.button} activeOpacity={0.8} >
                        <FontAwesome name={"pencil"}size={20} />
                    </TouchableOpacity>
                </View>

                

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