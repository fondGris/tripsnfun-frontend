import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { useState } from "react";
import { useDispatch} from "react-redux";
import { login } from '../reducers/user';


//creation du regex pour filtrer si c'est un mail ou non dans une variable
const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function SignupScreen({ navigation }) {
  const dispatch = useDispatch();

  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const BACKEND_ADDRESS = "http://192.168.10.191:3000";

  //fonction qui se lance a l'appui du boutton submit, la il check si la chaine de character est un email avec le regex,
  const handleSubmit = () => {
    if (EMAIL_REGEX.test(signUpEmail)) {
      // si c'est bon il va fetch le backend pour enregistrer les donneés entrées, l email, le password et le username
      fetch(`${BACKEND_ADDRESS}/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: signUpEmail,
          password: signUpPassword,
          username: signUpUsername,
        }),
      })
        .then((response) => response.json())
        .then((data) => {;
          // une fois les données enregistrer en back on transforme ça en json
          if (data.result) {
            // et on set les etats avec les données entrées
            dispatch(login({ username: signUpUsername, token: data.token }));

            setSignUpUsername("");
            setSignUpPassword("");
            setSignUpEmail("");
            navigation.navigate("TabNavigator");
          }

          if (data.error === "User already exists") {
            console.log(data);
            setEmailError(true);
            setErrorMessage("User already exists");
          }
          if (data.error === "Missing or empty fields") {
            setEmailError(true);
            setErrorMessage("Missing or empty fields");
          }
        });
    } else {
      setEmailError(true);
      setErrorMessage("Invalid email address");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.form}>
        <View style={styles.header}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("indexLogin")} style={styles.arrowContainer}>
            <FontAwesome name={"arrow-left"} color={"black"} size={25} style={styles.arrow} />
          </TouchableOpacity>
        </View>
        <Image source={require('../assets/img/logo.png')} style={styles.logo} />
        <Text style={styles.title}> Sign Up</Text>

        <TextInput
          style={styles.input}
          placeholder='Nickname'
          onChangeText={(value) => setSignUpUsername(value)}
          value={signUpUsername}
        />
        <TextInput
          style={styles.input}
          placeholder='Email'
          onChangeText={(value) => setSignUpEmail(value)}
          autoComplete='email'
          keyboardType='email-address'
          textContentType='emailAddress'
          value={signUpEmail}
        />
        <View style={styles.passwordContainer}>
          <TextInput
          style={styles.inputPassword}
          placeholder='Password'
          autoCapitalize={"none"}
          autoCorrect={false}
          secureTextEntry={!showPassword}
          onChangeText={(value) => setSignUpPassword(value)}
          textContentType={"password"}
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

        <TouchableOpacity
          onPress={() => handleSubmit()}
          style={styles.btn}
          activeOpacity={0.8}
        >
          <Text style={styles.textButton}>Sign Up</Text>
        </TouchableOpacity>
        {emailError && <Text style={styles.error}>{errorMessage}</Text>}
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
      marginBottom: 30,
  },
  title: {
    width: "80%",
    color: "#333",
    fontSize: 32,
    marginBottom: 30,
    textAlign: "center"
  },
  header: {
    position: "absolute",
    top: 50,
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  arrowContainer: {
    textAlign:"left",
  },
  arrow: {
      color: "#333",
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
  passwordContainer: {
      position: "relative",
      width: "80%",
      height: 50,
      backgroundColor: "#f5f5f5",
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
      color: "#333",
      fontSize: 14,
      textAlign: "center"
  },
  error: {
    marginTop: 10,
    color: "#f30",
    fontWeight: "600",
  },
});
