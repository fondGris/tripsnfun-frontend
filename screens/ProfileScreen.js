import { Button, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
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
            <View >
                <Text> Profile Screen</Text>
                <TouchableOpacity style={styles.button} activeOpacity={0.8}>
                    <FontAwesome name={"pencil"}size={20}  onPress={() => handleLogout()} />
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