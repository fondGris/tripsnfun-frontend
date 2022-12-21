import {
    Image,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    ImageBackground,
  } from "react-native";
  import { useState } from "react";
  import FontAwesome from "react-native-vector-icons/FontAwesome";
  import { useDispatch } from "react-redux";
  import {login} from '../reducers/user'
  // import { useFonts } from 'expo-font';


  export default function IndexLoginScreen({ navigation }) {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

//pensez à changer l adress pour test
    const BACKEND_ADDRESS = "http://192.168.10.187:3000";
    const handleSubmit = () => {
      fetch(`${BACKEND_ADDRESS}/users/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((data) => { 
          // (console.log(data))
          if (data.result) {
             // si data exist il lancera la fonction login du reducer user grace à dispatch et remettra les etats Email et Password à un champs vide

            setEmail("");
            setPassword("");
            dispatch(login({ userInfos: data.data, token: data.data.token }));
            navigation.navigate("TabNavigator");
          }
          if (data.error === "User not found or wrong password") {

            setEmailError(true);
            setErrorMessage("User not found or wrong password");
          }
          if (data.error === "Missing or empty fields") { 
            // console.log("ERROR MESS 2 OK")
            setEmailError(true);
            setErrorMessage("Missing or empty fields");
          }
        });
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
          <ImageBackground source={require('../assets/img/indexBackground.jpg')} style={styles.background} >
          <Text style={[styles.title, styles.drawerTitle]}>Trips'n<Text style={{color:"#ff6d00"}}>Fun</Text></Text>
            <Image source={require('../assets/img/logo.png')} style={styles.logo} />
            <Text style={styles.title}>Hello there, Welcome Onboard!</Text>
            <TextInput
                onChangeText={(value) => setEmail(value)}
                style={styles.input}
                placeholder='Email'
                value={email}
            />
            <View style={styles.passwordContainer}>
                <TextInput
                style={styles.inputPassword}
                placeholder='Password'
                autoCapitalize={"none"}
                autoCorrect={false}
                secureTextEntry={!showPassword}
                onChangeText={(value) => setPassword(value)}
                textContentType={"password"}
                value={password}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.showPassword}>
                    <Text>
                        {showPassword ? (
                        <FontAwesome color={"#05898E"} name={"eye"} size={20} />
                        ) : (
                        <FontAwesome color={"#888"} name={"eye-slash"} size={20} />
                        )}{" "}
                    </Text>
                </TouchableOpacity>
            </View>
            {emailError && <Text style={styles.error}>{errorMessage}</Text>}
            <TouchableOpacity
                onPress={() => handleSubmit()}
                style={styles.btn}
                activeOpacity={0.8}
            >
                <Text style={styles.textButton}>Sign In</Text>
            </TouchableOpacity>
            <Text style={styles.subTitle}> Or </Text>
            <TouchableOpacity
                onPress={() => navigation.navigate("signup")}
                style={styles.btn}
                activeOpacity={0.8}
            >
                <Text style={styles.textButton}>Create an account</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('reset')}>
                <Text style={styles.forgotPassword}> Forgot your password?</Text>
            </TouchableOpacity>

          </ImageBackground>
        </KeyboardAvoidingView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: '#05898E',
    },
    background: {
        flex: 1,
        width: "100%",
        height: "100%",
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
        color: "#fff",
        fontSize: 32,
        marginLeft: "auto",
        marginRight: "auto",
        fontFamily: 'RobotoRegular',
    },
    drawerTitle: {
      fontFamily: 'MontserratAlternatesSemiBold',
      textAlign: "center",
      color: "#05898E",
  },
    subTitle: {
        textAlign: "center",
        color: "#fb8",
        fontSize: 32,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 30,
        marginBottom: 30,
    },
    btn: {
      alignItems: "center",
      paddingTop: 8,
      justifyContent: "center",
      width: "80%",
      height: 50,
      marginLeft: "auto",
      marginRight: "auto",
      backgroundColor: "#FFBB88",
      borderRadius: 50,
    },
    textButton: {
      color: "#05898E",
      fontWeight: "600",
      fontSize: 18,
      lineHeight: 18
    },
    input: {
        width: "80%",
        height: 50,
        backgroundColor: "#fefefe",
        borderRadius: 25,
        paddingLeft: 32,
        paddingRight: 32,
        marginBottom: 20,
        marginLeft: "auto",
        marginRight: "auto"
        },
    passwordContainer: {
        position: "relative",
        width: "80%",
        height: 50,
        backgroundColor: "#fefefe",
        borderRadius: 25,
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: 20,
    },
    inputPassword: {
        width: "100%",
        height: 50,
        borderRadius: 25,
        paddingLeft: 32,
        paddingRight: 32,
        marginBottom: 16,
    },
    showPassword: {
        position: "absolute",
        top: 15,
        right: 20
    },
    forgotPassword: {
        marginTop: 25,
        color: "#fb8",
        fontSize: 14,
        textAlign: "center"
    },
    error: {
      marginTop: 10,
      color: "#fff",
      fontWeight: "600",
    },
  });
