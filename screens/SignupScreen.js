import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { useState } from "react";

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function LoginScreen({ navigation }) {
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [emailError, setEmailError] = useState(false);

  const BACKEND_ADDRESS = "http://192.168.1.34:3000";

  const handleSubmit = () => {
    if (EMAIL_REGEX.test(signUpEmail)) {
      fetch(`${BACKEND_ADDRESS}/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: signUpUsername,
          email: signUpEmail,
          password: signUpPassword,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            setSignUpUsername("");
            setSignUpPassword("");
            setSignUpEmail("");
          }
        });
      navigation.navigate("TabNavigator");
    } else {
      setEmailError(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup Screen</Text>

      <TextInput
        style={styles.input}
        placeholder='Username'
        onChange={(e) => setSignUpUsername(e.target.value)}
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
      {emailError && <Text style={styles.error}>Invalid email address</Text>}
      <TextInput
        style={styles.input}
        placeholder='Password'
        textContentType='newPassword' 
        onChange={(e) => setSignUpPassword(e.target.value)}
        value={signUpPassword}
        autoComplete='password'
      />
      <TouchableOpacity
        onPress={() => handleSubmit()}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.textButton}>Submit</Text>
      </TouchableOpacity>
    </View>
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
    marginTop: 30,
    backgroundColor: "green",
    borderRadius: 10,
    marginBottom: 80,
  },
  textButton: {
    color: "#ffffff",
    height: 30,
    fontWeight: "600",
    fontSize: 16,
  },
});
