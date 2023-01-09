import { useState } from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {removeAvatarOther, logout, delAvatar, removeAllMarkers, removeAllOtherUsers, removeUsernameOther} from "../reducers/user";
import { useDispatch, useSelector, } from "react-redux";



export default function ChatScreen({navigation}) {
  const [message, setMessage] = useState("");
  const [msg, setMsg] = useState([]);
const user = useSelector((state) => state.user.value);
const dispatch = useDispatch();


const handleLogout = () => {
    dispatch(logout()); // Supprime les infos du user dans le reducer 
    dispatch(removeAllMarkers()); // Supprime tout les markers dans le reducer
    dispatch(removeAllOtherUsers()); // Supprime tout les autres utilisateurs dans le reducer
    dispatch(delAvatar()) // Supprime l'image de l'utilisateur dans le reducer
    // fetch du backend pour update le token de l'utilisateur
    fetch(`${BACKEND_ADDRESS}/status/${user.token}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
        })
        dispatch(removeAvatarOther()) // Supprime l'image de l'utilisateur cliqué dans la MapScreen
        dispatch(removeUsernameOther()) // Supprime les informations de l'utilisateur cliqué dans la MapScreen
          // a l appui du boutton redirige vers la page d accueil
    navigation.navigate("indexLogin")
};

  const newMessage = msg.map((data, i) => {
// Fonction qui récupère et affiche le nouveau message 
    return (
      <View style={styles.messageemis}>
        <Image
          style={styles.img}
           source={{uri : (user.userInfos.userInfos.avatar)}}
         ></Image>
        <View style={styles.msgemiscontainer}>
          <Text style={styles.textemis}>{data}</Text>
        </View>
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome onPress={() => navigation.navigate("user")} color={"white"} name={"arrow-left"} size={25} />
        <Text style={styles.title}> Chat with {user.usernameOther} </Text>
        <FontAwesome onPress={() => handleLogout()} color={"white"} name={"search"} size={25} />
      </View>
      <View style={styles.message}>
        <View style={styles.msgrecu}>
          <Image
            style={styles.img}
            source={{uri : (user.avatarOther)}}
          ></Image>
          <View style={styles.msgrecucontainer}>
            <Text style={styles.textrecu}> Salut, tu fait quoi demain ?</Text>
          </View>
        </View>
        <View style={styles.messageemis}>
          <Image
            style={styles.img}
            source={{uri : (user.userInfos.userInfos.avatar)}}
          ></Image>
          <View style={styles.msgemiscontainer}>
            <Text style={styles.textemis}> Hey, rien de prévu et toi ?</Text>
          </View>
        </View>
        <Text> Monday, 10:40 am</Text>
        <View style={styles.msgrecu}>
          <Image
            style={styles.img}
            source={{uri : (user.avatarOther)}}
          ></Image>
          <View style={styles.msgrecucontainer}>
            <Text style={styles.textrecu}> J'aimerais bien visiter Grigny, ça te tente ?</Text>
          </View>
        </View>

        {newMessage}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={(value) => setMessage(value)}
            value={message}
            style={styles.input}
            placeholder='Say something...'
          ></TextInput>
          <FontAwesome
          style={styles.font}
            onPress={() => {
              msg.push(message);
              setMessage("");
            }}
            color={"grey"}
            name={"arrow-right"}
            size={25}
          />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 30,
  },
  header: {
    width: "100%",
    height: "12%",
    backgroundColor: "#05898E",
    justifyContent: "space-around",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    paddingTop:25
  },
  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "300",
  },
  img: {
    margin: 10,
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  message: {
    width: "100%",
    height: "80%",
    alignItems: "center",
  },
  msgrecu: {
    width: "100%",
    height: "20%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  messageemis: {
    width: "100%",
    height: "20%",
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  msgrecucontainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "60%",
    height: "50%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  msgemiscontainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "60%",
    height: "50%",
    margin: 20,
    backgroundColor: "#05898E",
    borderRadius: 10,
  },
  textrecu: {
    color: "#05898E",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    fontSize: 17,
  },
  textemis: {
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 17,
  },
  inputContainer: {
    position:"absolute",
    bottom:0,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    width: "100%",
    height: "10%",
    backgroundColor: "#D3D3D3",
  },
  input: {
    width: "50%",

  },
  font: {
    borderBottomWidth: 1,
    
  },
});
