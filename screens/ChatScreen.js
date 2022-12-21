import { Image, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function ChatScreen () {

    return (
<View style={styles.container}>
    <View style={styles.header}>
      <FontAwesome color={"white"} name={"arrow-left"} size={25} />
        <Text style={styles.title}> Chat with Faroukinho</Text>
        <FontAwesome color={"white"} name={"search"} size={25} />
    </View>
    <View style={styles.message}>
        <View style={styles.msgrecu}>
        <Image style={styles.img} source={require("../assets/farouk.jpg")}></Image>
        <View style={styles.msgrecucontainer}>
        <Text style={styles.textrecu}> C'est qui qui va gagner?</Text>
        </View>
        </View>
        <View style={styles.messageemis}>
        <Image style={styles.img}  source={require("../assets/yieng.png")}></Image>
        <View style={styles.msgemiscontainer}>
        <Text style={styles.textemis}> Je ne sais pas ?</Text>
        </View>        
        </View>
        <Text> Monday, 10:40 am</Text>
        <View style={styles.msgrecu}>
        <Image style={styles.img} source={require("../assets/farouk.jpg")}></Image>
        <View style={styles.msgrecucontainer}>
        <Text style={styles.textrecu}> C'est Farouk c'est Farouk !</Text>
        </View>
        </View>
        <View style={styles.messageemis}>
        <Image style={styles.img}  source={require("../assets/yieng.png")}></Image>
        <View style={styles.msgemiscontainer}>
        <Text style={styles.textemis}> ...</Text>
        </View>        
        </View>
    <View style={styles.inputContainer}>
    <TextInput style={styles.input} placeholder="Say something...">
    </TextInput>
    <FontAwesome color={"grey"} name={"arrow-right"} size={25} />
    </View>
    </View>

</View>

    );
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
       paddingBottom: 30
        
    },
    header: {
        width: "100%",
        height: "12%",
        backgroundColor: "green",
        justifyContent: "space-around",
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
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
height: "100%",
alignItems: "center",
      },
      msgrecu: {
width: "100%",
height: "20%",
display: "flex",
flexDirection:"row",
alignItems: "center",
},
messageemis: {
    width: "100%",
    height: "20%",
    display: "flex",
    flexDirection:"row-reverse",
    alignItems: "center",
},
msgrecucontainer: {
justifyContent: "center",
alignItems: "center",
width: "60%",
height: "50%",
margin: 20,
backgroundColor: "green",
borderRadius: 10
},
msgemiscontainer: {
justifyContent: "center",
alignItems: "center",
width: "60%",
height: "50%",
margin: 20,
backgroundColor: "white",
borderRadius: 10
},
textrecu: {
    color: "white",
justifyContent: "center",
alignItems:"center",

fontSize: 17

},
textemis: {
    color: "green",
justifyContent: "center",
alignItems:"center",
fontSize: 17

},
      inputContainer: {
        marginBottom: 10,
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

width: "100%",
height: "100%",
      }
})