import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";

import { useState } from "react";

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function LoginScreen({ navigation }) {
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")

  const BACKEND_ADDRESS = "http://192.168.10.216:3000";

  const handleSubmit = () => {
    if (EMAIL_REGEX.test(signUpEmail)) {

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
        .then((data) => {

          if (data.result) {

            setSignUpUsername("");
            setSignUpPassword("");
            setSignUpEmail("");
            navigation.navigate("TabNavigator");
          } 
          if(data.error === 'User already exists') {
            setEmailError(true);
            setErrorMessage("User already exists")
          }
          if(data.error === 'Missing or empty fields'){
            setEmailError(true)
            setErrorMessage('Missing or empty fields')
          }

        });
    } else {
setEmailError(true);
setErrorMessage("Invalid email address")
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <Text style={styles.title}>Signup Screen</Text>

      <TextInput
        style={styles.input}
        placeholder='Username'
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
      <TextInput
        style={styles.input}
        placeholder='Password'
        textContentType='newPassword' 
        onChangeText={(value) => setSignUpPassword(value)}
        value={signUpPassword}
        autoComplete='password'
      />
      <View style={styles.submit}>
      <TouchableOpacity
        onPress={() => handleSubmit()}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.textButton}>Submit</Text>
      </TouchableOpacity>
      {emailError && <Text style={styles.error}>{errorMessage}</Text>}
    </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    width: "80%",
    fontSize: 38,
    fontWeight: "600",
  },

  input: {
    width: "80%",
    marginTop: 25,
    borderBottomColor: "orange",
    borderBottomWidth: 1,
    fontSize: 18,
  },
  button: {
    alignItems: "center",
    paddingTop: 8,
    width: "80%",
   
    backgroundColor: "green",
    borderRadius: 10,
   
  },
  textButton: {
    color: "#ffffff",
    height: 30,
    fontWeight: "600",
    fontSize: 16,
  },
  submit : {
    width: "100%",
    height: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color:"red",
    fontWeight: "500",
  }

});
