import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { SearchBar, StatusBar } from "react-native-elements";
import MapView, { Marker } from "react-native-maps";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import { addAllMarkers, addOtherUsers } from "../reducers/user";

export default function MapScreen() {
  //pensez à changer l adress pour test
  const BACKEND_ADDRESS = "http://192.168.10.187:3000";
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(user.markers);
    // appelle du backend pour recupérer les autres positions des autres
    fetch(`${BACKEND_ADDRESS}/getMarkers`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          let markers = data.markers.filter((e) => e.token !== user.token);
          markers = markers.filter((e) => e.isConnected !== false);
          dispatch(addAllMarkers(markers));
          // console.log(markers);
          for(let element of markers) {
          fetch(`${BACKEND_ADDRESS}/users/getUser/${element.token}`)
          .then((response) => response.json())
          .then((userdata) => {
            if(userdata.result) {
              if(!user.otherUsers.includes(userdata.data)) {

                console.log("USERDATA" , userdata);
                dispatch(addOtherUsers(userdata.data))}
              }
          
        });
      }}
    });
  }, []);
  console.log("OTHER  USER", user.otherUsers);
  
  //pour pouvoir set la position de l utilisateur sur la map;
  const [currentPosition, setCurrentPosition] = useState(null);
  //pour pouvoir faire une recherche sur la map
  const [search, setSearch] = useState("");
  // const [userdata, setUserData] = useState([]);

  //demande de l'autrorisation du user pour la geoloc à la charge de la page, et je donnes ma position à moi dans la base de données pour que les autres recoivent ma position
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        Location.watchPositionAsync({ distanceIntereval: 10 }, (location) => {
          setCurrentPosition(location.coords);
          fetch(`${BACKEND_ADDRESS}/markers`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              token: user.token,
              username: user.username,
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }),
          })
            .then((response) => response.json())
            .then((data) => {});
        });
      }
    })();
  }, []);

  // to make the map set on the user position
  let initialPosition = null;
  if (currentPosition == null) {
    return;
  } else {
    initialPosition = {
      name: "Ma Position",
      latitude: currentPosition.latitude,
      longitude: currentPosition.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
  }
  // console.log("TESTE", user.markers)
  /* const user1 = user.markers.map((data, i ) => {  
  fetch(`${BACKEND_ADDRESS}/users/getUser/${data.token}`)
  .then((response) => response.json())
  .then((userdata) => { console.log("TEST", userdata.data), console.log("MARKER", user.markers)
  })
})  */

  const user2 = [
    {
      image: require("../assets/kassim.jpg"),
      firstName: "Kassim",
      lastName: "du93",
      langues: "Français, Arabe",
      description: "fan de crypto, la blockchain c'est la vie ! ",
      ville: "Villepinte",
      pays: "France",
    },
    {
      image: require("../assets/img/Yssamm.jpg"),
      firstName: "Boubax",
      lastName: "Yssam",
      langues: "Français, Anglais",
      description: "ma femme doit porter son collier !",
      ville: "Paris",
      pays: "France",
    },
    {
      image: require("../assets/icon.png"),
      firstName: "Jean",
      lastName: "Feng",
      langues: "Français, Anglais",
      description: "fan de jeuxvideo",
      ville: "Paris",
      pays: "France",
    },
    {
      image: require("../assets/farouk.jpg"),
      firstName: "Farouk",
      lastName: "DESAINTJEAN",
      langues: "Français, portugais",
      description: "fan du Brésil et aime voyager tout seul",
      ville: "Paris",
      pays: "France",
    },
  ];
  if(user.otherUsers) {
  var user3 = user.otherUsers.map((data, i) => {
    return (
      <View style={styles.card} key={i}>
        <Image style={styles.img} source={ require("../assets/icon.png")}></Image>
        <View style={styles.cardRight}>
          <Text style={styles.name}>
            {data.firstname} {data.lastname}{" "}
          </Text>
          <Text style={styles.langues}>{data.langues} </Text>
          <Text style={styles.description}>{data.description} </Text>
          <Text style={styles.ville}>
            {data.city}, {data.country}{" "}
          </Text>
        </View>
      </View>
    );
  
  });
  }
  if (user.markers) {
    var otherUsers = user.markers.map((data, i) => {
      return (
        <Marker
          key={i}
          coordinate={{ latitude: data.latitude, longitude: data.longitude }}
          title={data.username}
          pinColor='#fecb2d'
        />
      );
    });
  }

  return (
    <View style={styles.container}>
      {/* <SearchBar containerStyle={{top: 0, zIndex:1 , backgroundColor: 'transparent' }} inputContainerStyle={{ borderRadius: 20 }} placeholder="Search for a location" onChangeText={setSearch} value={search} placeholderTextColor={'white'}  /> */}
      <MapView
        resizeMode='cover'
        style={styles.map}
        initialRegion={initialPosition}
        showsUserLocation
        followsUserLocation
      >
        {currentPosition && (
          <Marker coordinate={currentPosition} title='My position' />
        )}
        {otherUsers}
      </MapView>

      <SafeAreaView style={styles.cardContainer}>
        <ScrollView
          horizontal={true}
          decelerationRate={"normal"}
          bounces={false}
          style={{ marginTop: 40, paddingHorizontal: 0 }}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={12}
        >
          {user3}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  map: {
    flex: 1,
  },
  img: {
    marginLeft: 10,
    height: 70,
    width: 65,
  },
  cardRight: {
    marginLeft: 20,
    padding: 5,
    paddingBottom: 10,
    marginBottom: 10,
  },

  cardContainer: {
    flex: 0.2,
    backgroundColor: "transparent",
    marginTop: -170,
  },
  card: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 10,
    backgroundColor: "#FEFEFE",
    height: 100,
    width: 300,
    borderRadius: 10,
    resizeMode: "cover",
    justifyContent: "flex-start",
  },
  langues: {
    paddingBottom: 5,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    paddingBottom: 5,
  },
  description: {
    fontSize: 14,
    paddingBottom: 5,
  },
});
