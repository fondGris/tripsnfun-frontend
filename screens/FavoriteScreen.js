import { Button, StyleSheet, Text, TextInput, View , Image} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector, } from "react-redux";



export default function FavoriteScreen({navigation}) {
  const user = useSelector((state) => state.user.value);


  // tableau de data fictif pour le test des affichages des  users mis en favoris
  const favoriteBuddies = [
    {
      image: "../assets/farouk.jpg",
      firstName: "Jean",
      lastName: "Calmant",
      city: "Paris",
      country: "France",
    },{
        image: "../assets/yieng.png",
        firstName: "Julie",
        lastName: "Marshall",
        city: "Sao Paulo",
        country: "Brazil",
      },{
        image: "../assets/kassim.jpg",
        firstName: "Bruce",
        lastName: "Andrews",
        city: "Hambourg",
        country: "Germany",
      },{
        image: "../assets/icon.png",
        firstName: "Charles",
        lastName: "Adams",
        city: "Paris",
        country: "France",
      },{
        image: "../assets/img/Yssamm.jpg",
        firstName: "Ganna",
        lastName: "Miller",
        city: "Dakar",
        country: "Senegal",
      },
  ];
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
      <TextInput style={styles.input} placeholder="Username">

      </TextInput>
      {buddies}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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
    height: "8%",
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "white",
    paddingLeft: 20
},
card: {
    width: "90%",
    height: "12%",
    display: "flex",
    flexDirection: "row",
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "white",
    marginTop : 10,
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
    color:"black"
},
location: {
fontSize: 13,
color: "grey"
}

});
