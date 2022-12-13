import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch } from "react-redux";
import { login } from '../reducers/user';


export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const BACKEND_ADDRESS = "http://192.168.1.34:3000";
  console.log(password);
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
        if (data.result) {
          setEmail("");
          setPassword("");
          dispatch(login({ username: data.username, token: data.token }));
          navigation.navigate("TabNavigator");
        }
        if (data.error === "User not found or wrong password") {
          setEmailError(true);
          setErrorMessage("User not found or wrong password");
        }
        if (data.error === "Missing or empty fields") {
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
      <View style={styles.img}></View>
      <View style={styles.card}>
        <Text style={styles.title}>Hello there, Welcome Onboard!</Text>

        <TextInput
          onChangeText={(value) => setEmail(value)}
          style={styles.input}
          placeholder='Email'
        />
        <View style={styles.motdepasse}>
          <TextInput
            style={styles.inputpassword}
            placeholder='Password'
            autoCapitalize={"none"}
            autoCorrect={false}
            secureTextEntry={!showPassword}
            onChangeText={(value) => setPassword(value)}
            textContentType={"password"}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text>
              {showPassword ? (
                <FontAwesome color={"white"} name={"eye"} size={20} />
              ) : (
                <FontAwesome color={"white"} name={"eye-slash"} size={20} />
              )}{" "}
            </Text>
          </TouchableOpacity>
        </View>
        {emailError && <Text style={styles.error}>{errorMessage}</Text>}
        <TouchableOpacity
          onPress={() => handleSubmit()}
          style={styles.button}
          activeOpacity={0.8}
        >
          <Text style={styles.textButton}>Sign In</Text>
        </TouchableOpacity>
        <Text style={styles.or}> Or </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("signup")}
          style={styles.button}
          activeOpacity={0.8}
        >
          <Text style={styles.textButton}>Create an account</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('reset')}>
        <Text style={styles.password}> Forgot your password?</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#00C9D1",
  },
  img: {
    width: "100%",
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "100%",
    height: "70%",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
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
  inputpassword: {
    backgroundColor: "white",
    width: "80%",
    height: "67%",
    borderRadius: 50,
    fontSize: 18,
    paddingLeft: 20,
    marginLeft: 25,
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
  password: {
    marginTop: 15,
    color: "white",
  },
  motdepasse: {
    width: "100%",
    height: "15%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  or: {
    fontSize: 30,
    color: "white",
    marginTop: 15,
  },
  error: {
    color: "white",
    fontWeight: "500",
  },
});
