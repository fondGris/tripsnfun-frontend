import { Button, StyleSheet, Text, View, Image, } from 'react-native';
import { SearchBar, StatusBar } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { useDispatch, useSelector } from "react-redux";
import {  addAllMarkers } from "../reducers/user";


export default function MapScreen() {
    const BACKEND_ADDRESS = "http://192.168.10.134:3000";
    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch();


    useEffect(() => {
    // appelle du backend pour recupérer les autres positions des autres
        fetch(`${BACKEND_ADDRESS}/getMarkers`)
          .then((response) => response.json())
          .then((data) => {
            //condition pour ne recuperé que les coordonnées des users avec un token différent et seulement si la condition isConnected est à true
            if (data.result) {
               let markers = data.markers.filter(e => e.token !== user.token)
               markers = markers.filter(e => e.isConnected !== false)

              dispatch(addAllMarkers(markers));
            }
          });
      }, []);

    //pour pouvoir set la position de l utilisateur sur la map;

    const [currentPosition, setCurrentPosition] = useState(null);

    //pour pouvoir faire une recherche sur la map

    const [search, setSearch] = useState('');

    //demande de l'autrorisation du user pour la geoloc à la charge de la page, et je donnes ma position à moi dans la base de données pour que les autres recoivent ma position
    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') {
                Location.watchPositionAsync({ distanceIntereval: 10 },
                    (location) => {
                        setCurrentPosition(location.coords);
                        // console.log("OK1");
                        // console.log( 'longitude', location.coords.longitude, 'latitude', location.coords.latitude);
                        //appel du backend pour poster les  coordonnées de l'utilisateur à sa connexion
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
                            .then((data) => {
                    });
            }
    )}  })();
    }, []);


    // pour avoir la position initial de l'utilisateur
    let initialPosition = null
    if (currentPosition == null) { return } else {
        initialPosition = {
            name: 'Ma Position',
            latitude: currentPosition.latitude,
            longitude: currentPosition.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,

        }
    }
    // //petit tableau de données utilisateur fitctif pour le test sur la map avec les autres markers
    // // const otherUsersData = [
    // //     { name: 'Kassim', latitude: 48.859, longitude: 2.347 },
    // //     { name: 'Farouk', latitude: 48.29, longitude: 4.074 },
    // //     { name: 'Yssam', latitude: 43.282, longitude: 5.405 },
    // //     { name: 'Marie', latitude: 43.091, longitude: -0.045 },

    // ]

    // affichage des autres utilisateurs 
if(user.markers) {
    var otherUsers = user.markers.map((data, i) => {
        return <Marker key={i} coordinate={{ latitude: data.latitude, longitude: data.longitude }} title={data.username} pinColor="#fecb2d" />;
    }) }

console.log('OK',user.markers);
    return (
        <View style={styles.container}>
            <Text> Map Screen</Text>


            {/* <SearchBar containerStyle={{top: 0, zIndex:1 , backgroundColor: 'transparent' }} inputContainerStyle={{ borderRadius: 20 }} placeholder="Search for a location" onChangeText={setSearch} value={search} placeholderTextColor={'white'}  /> */}
            <MapView style={styles.map} initialRegion={initialPosition} showsUserLocation followsUserLocation>

                {currentPosition && <Marker coordinate={currentPosition} title="My position" />}
                {otherUsers}
            </MapView>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, zIndex: -1,
        backgroundColor: 'white',
    },
    map: {
        flex: 1,
    },
    searchBar: {
        margin: '20',
    },
});
