import {TouchableOpacity, StyleSheet, Text, View, TextInput } from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function ResetPassScreen ({ navigation }) {

    return (
<View style={styles.container}>

<Text style={styles.title}> Reset Your Password</Text>
<TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("login")}>
    <FontAwesome name={"arrow-left"} color={"black"} size={25} />
</TouchableOpacity>
<TextInput style={styles.input} placeholder='Email'/>
<TouchableOpacity style={styles.button} activeOpacity={0.8}>
    <Text style={styles.textButton}>Reset</Text>
</TouchableOpacity>

</View>

    );
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#00C9D1",
      },
      title: {
        marginTop: 40,
        width: "80%",
        fontSize: 35,
        color: "white",
      },
      input: {
        backgroundColor: "white",
        width: "80%",
        height: "10%",
        borderRadius: 50,
        marginTop: 25,
        fontSize: 18,
        paddingLeft: 20,
      },
      button: {
        alignItems: "center",
        paddingTop: 8,
        justifyContent: "center",
        width: "80%",
        height: "10%",
        marginTop: 30,
        backgroundColor: "#05898E",
        borderRadius: 50,
      },
      textButton: {
        color: "#ffffff",
        height: 30,
        fontWeight: "600",
        fontSize: 16,
      },
  })