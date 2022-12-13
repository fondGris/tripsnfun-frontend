import {TouchableOpacity, StyleSheet, Text, View, TextInput, Image, KeyboardAvoidingView } from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function ResetPassScreen ({ navigation }) {

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.form}>
          <View style={styles.header}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("login")} style={styles.arrowContainer}>
              <FontAwesome name={"arrow-left"} color={"black"} size={25} style={styles.arrow} />
            </TouchableOpacity>
            <Image source={require('../assets/img/logo.png')} style={styles.logo} />
          </View>
        <Text style={styles.title}> Reset Your Password</Text>

        <TextInput
          onChangeText={(value) => setEmail(value)}
          style={styles.input}
          placeholder='Email'
        />
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("login")}
          >
            <Text style={styles.textButton}>Reset</Text>
        </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>

    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: '#fff',
  },
  form: {
      flex: 1,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
  },
  logo:{
      height: 88,
      width: 73,
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: 10,
      marginBottom: 50,
  },
  title: {
      width: "80%",
      color: "#333",
      fontSize: 32,
      marginBottom: 20
  },
  header: {
    width: "80%",
    alignItems: "center",
    flexDirection: 'row',
  },
  arrowContainer: {
    textAlign:"left",
  },
  arrow: {
      color: "#333",
      marginRight: -25,
      marginTop:-40,
  },
  btn: {
    alignItems: "center",
    paddingTop: 8,
    justifyContent: "center",
    width: "80%",
    height: 50,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#05898E",
    borderRadius: 50,
  },
  textButton: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 18,
    lineHeight: 18
  },
  input: {
      width: "80%",
      height: 50,
      backgroundColor: "#f5f5f5",
      borderRadius: 25,
      paddingLeft: 32,
      paddingRight: 32,
      marginBottom: 20,
      marginLeft: "auto",
      marginRight: "auto"
      },
  error: {
    color: "white",
    fontWeight: "500",
  },
  })