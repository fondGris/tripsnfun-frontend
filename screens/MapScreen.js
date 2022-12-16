import { Button, StyleSheet, Text, View, Image } from "react-native";
import { SearchBar, StatusBar } from "react-native-elements";
import MapView, { Marker } from "react-native-maps";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import { addAllMarkers } from "../reducers/user";

export default function MapScreen() {
  const BACKEND_ADDRESS = "http://192.168.10.105:3000";
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
   useEffect(() => {
   (async () => {
     const { status } = await Location.requestForegroundPermissionsAsync();
     if (status === "granted") {
       Location.watchPositionAsync({ distanceIntereval: 10 }, (location) => {
           setCurrentPosition(location.coords);
           setLatitude(location.coords.latitude);
           setLongitude(location.coords.longitude)
          
       });
     }
   })();
  }, []);  

  useEffect(() => {    
    // AU CHARGEMENT DE LA PAGE, RECUPERE MOI TOUT LES MARKERS DANS MA BASE DE DONNE
    fetch(`${BACKEND_ADDRESS}/getMarkers`)
      .then((response) => response.json())
      .then((data) => {
        // SI LE RESULTAT EST VRAI
        if (data.result) {
            console.log("OK1" ,data.markers);
        // RECHERCHE DANS MA BASE DE DONNE SI LE TOKEN DANS MON REDUCER EXISTE DEJA
            if (data.markers.includes(user.token)) {
                console.log("OK3");
                // SI IL EXISTE, MET A JOUR LA LATITUDE ET LA LONGITUDE ET IS CONNECTED
                fetch(`${BACKEND_ADDRESS}/changeMarker/${user.token}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        latitude: latitude,
                        longitude: longitude,
                    }),
                })
                .then((response) => response.json())
                .then((data) => {
                    console.log("OK4");
                });
            } else {
                console.log("OK5");
                // SI IL N'EXISTE PAS, CREE MOI UN NOUVEAU MARKER
                fetch(`${BACKEND_ADDRESS}/markers`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        token: user.token,
                        username: user.username,
                        latitude: latitude,
                        longitude: longitude,
                    }),
                }).then((response) => response.json())
                .then((data) => {
                    console.log("OK5");
                });
            }
        
        console.log("OK6");
          // RECUPERE MOI TOUT LES MARKERS AVEC UN TOKEN DIFFERENT DU MIEN
          let markers = data.markers.filter((e) => e.token !== user.token);
          // RECUPERE MOI ENSUITE TOUT LES MARKERS DES GENS CONNECTE
          markers = markers.filter((e) => e.isConnected !== false);
          // ENVOIE MOI TOUT CES MARKERS DANS MON REDUCER
          dispatch(addAllMarkers(markers));
        }
      });
  }, []);
console.log(currentPosition);
  //pour pouvoir set la position de l utilisateur sur la map;
  const [currentPosition, setCurrentPosition] = useState(null);
  //pour pouvoir faire une recherche sur la map
  const [search, setSearch] = useState("");

  //demande de l'autrorisation du user pour la geoloc à la charge de la page, et je donnes ma position à moi dans la base de données pour que les autres recoivent ma position
  // console.log(currentPosition) pour les info de la position initial

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
  //petit tableau de données utilisateur fitctif pour le test sur la map avec les autres markers
  const otherUsersData = [
    { name: "Kassim", latitude: 48.859, longitude: 2.347 },
    { name: "Farouk", latitude: 48.29, longitude: 4.074 },
    { name: "Yssam", latitude: 43.282, longitude: 5.405 },
    { name: "Marie", latitude: 43.091, longitude: -0.045 },
  ];
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
      <Text> Map Screen</Text>

      {/* <SearchBar containerStyle={{top: 0, zIndex:1 , backgroundColor: 'transparent' }} inputContainerStyle={{ borderRadius: 20 }} placeholder="Search for a location" onChangeText={setSearch} value={search} placeholderTextColor={'white'}  /> */}
      <MapView
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: -1,
    backgroundColor: "white",
  },
  map: {
    flex: 1,
  },
  searchBar: {
    margin: "20",
  },
});
