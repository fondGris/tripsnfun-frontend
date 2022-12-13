import { Button, StyleSheet, Text, TextInput, View , Image} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";


export default function FavoriteScreen() {
  const favoriteBuddies = [
    {
      image: "../assets/yieng.png",
      firstName: "Jeanne",
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
        image: "../assets/yieng.png",
        firstName: "Bruce",
        lastName: "Andrews",
        city: "Hambourg",
        country: "Germany",
      },{
        image: "../assets/yieng.png",
        firstName: "Charles",
        lastName: "Adams",
        city: "Paris",
        country: "France",
      },{
        image: "../assets/yieng.png",
        firstName: "Dianna",
        lastName: "Miller",
        city: "Dakar",
        country: "Senegal",
      },
  ];

let buddies= favoriteBuddies.map((data,i) => {
    return (
 <View key={i} style={styles.card}>
        <Image style={styles.image} source={require("../assets/yieng.png")}></Image>
        <View style={styles.description}>
<Text style={styles.name}>{data.firstName} {data.lastName}</Text>
<Text style={styles.location}>{data.city} , {data.country}</Text>
        </View>
      </View>
    )
})
  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <FontAwesome color={"white"} name={"arrow-left"} size={25} />
        <Text style={styles.title}> Favorites Buddies</Text>
        <FontAwesome color={"white"} name={"glass"} size={25} />
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
    backgroundColor: "grey",
    alignItems: "center",
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
input: {
    width: "90%",
    height: "8%",
    borderRadius: 10,
marginTop: 20,
marginBottom: 20,
backgroundColor: "white",
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
    marginLeft: 10,
},
description: {
    marginLeft: 30,
    marginBottom: 30,
},
name: {
    fontWeight: "bold",
},
location: {
fontSize: 13,
color: "grey"
}

});
