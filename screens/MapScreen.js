import { Button, StyleSheet, Text, View, Image, ScrollView, SafeAreaView} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import { addAllMarkers,addTokenUserScreen,addOtherUsers, addAvatarOther, addUsernameOther} from "../reducers/user";

export default function MapScreen({navigation}) {
  const [currentPosition, setCurrentPosition] = useState(null);

  //pensez à changer l adress pour test
  const BACKEND_ADDRESS = "https://tripsnfun-backend.vercel.app/";
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  useEffect(() => {
    // Récupère tout les markers
    fetch(`${BACKEND_ADDRESS}/getMarkers`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          // Supprime le marker de l'utilisateur qui est connecté et supprime ceux des utilisateurs déconnectés 
          let markers = data.markers.filter((e) => e.token !== user.token);
          markers = markers.filter((e) => e.isConnected !== false);
          dispatch(addAllMarkers(markers));
          for (let element of markers) {
            // Grâce au token des markers, on récupère toutes les informations des users qui sont connectés
            fetch(`${BACKEND_ADDRESS}/users/getUser/${element.token}`)
              .then((response) => response.json())
              .then((userdata) => {
                if (userdata.result) {
                  if (!user.otherUsers.includes(userdata.data)) {
                    // On ajoute ces informations dans le reducer
                    dispatch(addOtherUsers(userdata.data));
                  }
                }
              });
          }
        }
      });
  }, []);

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
              username: user.userInfos.userInfos.username,
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
  const goUserProfile = () => {
   navigation.navigate('user')
  };

  if (user.otherUsers) {
    // Cette fonction permet d'afficher toutes les information des autres users connecté et de récupérer les informations du user cliqué
    // Grâce aux fonction "addUsernameOther" et "addTokenUserScreen". Au clique, nous serons redirigé vers la page userScreen.
    var user3 = user.otherUsers.map((data, i) => {
      return (
        <ScrollView style={styles.card} key={i} contentContainerStyle={{flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start"}}>
          <Image  style={styles.img} source={{ uri: data.avatar }}></Image>
          <View  style={styles.cardRight}>
            <Text onPress={() => { dispatch(addUsernameOther(data.username)), dispatch(addTokenUserScreen(data.token)), dispatch(addAvatarOther(data.avatar)) ,goUserProfile()}} style={styles.name}>
              {data.firstname} {data.lastname}{" "}
            </Text>
            <Text onPress={() => {goUserProfile()}} style={styles.description}>{data.hobbies} </Text>
            <Text onPress={() => { dispatch(addTokenUserScreen(data.token)) , dispatch(addAvatarOther(data.avatar)) ,goUserProfile()}} style={styles.ville}>
              {data.city}, {data.country}{" "}
            </Text>
          </View>
        </ScrollView>
      );
    });
  }
  if (user.markers) {
    // Fonction qui affiche les markers dans la map
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
    marginTop: 10,
    height: 70,
    width: 65,
    borderRadius: 5
  },
  cardRight: {
    marginLeft: 20,
    padding: 5,
    paddingBottom: 10,
    marginBottom: 10,
    width: 180
  },
  cardContainer: {
    flex: 0.2,
    backgroundColor: "transparent",
    marginTop: -170,
  },
  card: {
    // alignItems: "center",
    flex: 1,
    // flexDirection: "row",
    marginHorizontal: 10,
    backgroundColor: "#FEFEFE",
    height: 100,
    width: 300,
    borderRadius: 10,
    resizeMode: "cover",
    // justifyContent: "flex-start",
    borderWidth: 1,
    borderColor: "#aaa",
  },
  langues: {
    paddingBottom: 5,
  },
  name: {
    fontWeight: "bold",
    color: "#05898E",
    fontSize: 16,
    paddingBottom: 5,
  },
  description: {
    fontSize: 14,
    paddingBottom: 5,
  },
});
