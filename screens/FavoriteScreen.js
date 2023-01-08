import { StyleSheet, Text, TextInput, View , Image, ScrollView} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector, } from "react-redux";



export default function FavoriteScreen({navigation}) {
  const user = useSelector((state) => state.user.value);
      
// fonction pour afficher les autres users existant
let buddies= user.otherUsers.map((data,i) => { 
     return (
 <View key={i} style={styles.card}>
        <Image style={styles.image}   source={{uri : (data.avatar)}}></Image>
        <View style={styles.description}>
<Text style={styles.name}>{data.firstname} {data.lastname}</Text>
<Text style={styles.location}>{data.city} , {data.country}</Text>
        </View>
      </View>
    )
})
  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <FontAwesome onPress={() => navigation.navigate("user")} color={"white"} name={"arrow-left"} size={25} />
        <Text style={styles.title}> Favorites Buddies</Text>
        <FontAwesome color={"white"} name={"search"} size={25} />
      </View>
      <ScrollView style={styles.contentContainer}>
      <TextInput style={styles.input} placeholder="Username" />
      {buddies}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: "center",

  },
  contentContainer: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
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
input: {
  width: "90%",
  height: 55,
  borderRadius: 10,
  marginTop: 20,
  marginBottom: 20,
  backgroundColor: "white",
  paddingLeft: 20,
  marginRight: "auto",
  marginLeft: "auto",
},
card: {
    width: "90%",
    height: 100,
    display: "flex",
    flexDirection: "row",
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "white",
    marginTop : 10,
    marginRight: "auto",
    marginLeft: "auto",
    borderWidth: 1,
    borderColor: "#aaa",
},
image: {
  width:70,
  height:70,
    marginLeft: 10,
    borderRadius: 10,
},
description: {
    marginLeft: 30,
    marginBottom: 30,
},
name: {
    fontWeight: "bold",
    color: "#05898E",
},
location: {
fontSize: 13,
color: "grey"
}

});
