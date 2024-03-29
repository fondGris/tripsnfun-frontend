import {Image, StyleSheet, Text, View,TextInput,TouchableOpacity,KeyboardAvoidingView,} from "react-native";
import { useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //pensez à changer l adress pour test
  const BACKEND_ADDRESS = "https://tripsnfun-backend.vercel.app/";


  const handleSubmit = () => { // Fonction pour se connecter
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
               // Si le compte existe, l'utilisateur sera redirigé vers la MapScreen, 
              //ses infos seront enregistrées dans le reducer et la valeur des inputs sera réinitialisé
          setEmail("");
          setPassword("");
          dispatch(login({ userInfos: data.data, token: data.token }));
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
      <View style={styles.form}>
        <Image source={require("../assets/img/logo.png")} style={styles.logo} />
        <Text style={styles.title}> Sign In</Text>
        <TextInput
          onChangeText={(value) => setEmail(value)}
          style={styles.input}
          placeholder='Email'
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
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.showPassword}
          >
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

        <TouchableOpacity onPress={() => navigation.navigate("reset")}>
          <Text style={styles.forgotPassword}> Forgot your password?</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  form: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
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
    textAlign: "center",
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
    backgroundColor: "#05898E",
    borderRadius: 50,
  },
  textButton: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 18,
    lineHeight: 18,
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
    marginRight: "auto",
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
    right: 20,
  },
  forgotPassword: {
    marginTop: 25,
    color: "#333",
    fontSize: 14,
    textAlign: "center",
  },
  error: {
    marginTop: 10,
    color: "#f30",
    fontWeight: "600",
  },
});
