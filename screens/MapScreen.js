import { Button, StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { SearchBar, StatusBar } from "react-native-elements";
import MapView, { Marker } from "react-native-maps";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import { addAllMarkers } from "../reducers/user";

export default function MapScreen() {
  
  //pensez à changer l adress pour test
    const BACKEND_ADDRESS = "http://192.168.1.135:3000";
    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch();


    useEffect(() => {
    // appelle du backend pour recupérer les autres positions des autres
        fetch(`${BACKEND_ADDRESS}/getMarkers`)
          .then((response) => response.json())
          .then((data) => {
            if (data.result) {
               let markers = data.markers.filter(e => e.token !== user.token)
               markers = markers.filter(e => e.isConnected !== false)
              dispatch(addAllMarkers(markers));
            }
          });
      }, []);
      // console.log();
    
    //pour pouvoir set la position de l utilisateur sur la map;
    const [currentPosition, setCurrentPosition] = useState(null);
    //pour pouvoir faire une recherche sur la map
    const [search, setSearch] = useState('');

    //demande de l'autrorisation du user pour la geoloc à la charge de la page, et je donnes ma position à moi dans la base de données pour que les autres recoivent ma position
    useEffect(() => {
      // console.log("OK1");
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') {
                Location.watchPositionAsync({ distanceIntereval: 10 },
                    (location) => {
                      // console.log("OK2");
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
                            .then((data) => {
                    });
            }
    )}  })();
    }, []);
    // console.log(currentPosition) pour les info de la position initial

    // to make the map set on the user position
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
    //petit tableau de données utilisateur fitctif pour le test sur la map avec les autres markers
    // const otherUsersData = [
    //     { name: 'Kassim', latitude: 48.859, longitude: 2.347 },
    //     { name: 'Farouk', latitude: 48.29, longitude: 4.074 },
    //     { name: 'Yssam', latitude: 43.282, longitude: 5.405 },
    //     { name: 'Marie', latitude: 43.091, longitude: -0.045 },
    //]

    const user2 = [
      { firstName: "Yeng", lastName:"Doe", langues: "Français, Anglais", description :"fan de pizza", ville: "Paris", pays:"France"},
      { firstName: "Boubax", lastName:"Yssam",  langues: "Français, Anglais", description :"fan de manga", ville: "Paris", pays:"France"}
     ]
const user3 = user2.map((data,i) => { console.log('USER2',data.firstName)
  return (
    <View style={styles.card}>
      <Image style={styles.img} source={require("../assets/yieng.png")}></Image>
      <View style={styles.cardRight}>
        <Text style={styles.name}>{data.firstName} {data.lastName} </Text>
        <Text style={styles.langues}>{data.langues} </Text>
        <Text style={styles.description}>{data.description} </Text>
        <Text style={styles.ville}>{data.ville}, {data.pays} </Text>
        </View> 
    </View>
  )
})

if(user.markers) {
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

// console.log(user.markers);
    return (
        <View style={styles.container}>
            <Text> Map Screen</Text>

      {/* <SearchBar containerStyle={{top: 0, zIndex:1 , backgroundColor: 'transparent' }} inputContainerStyle={{ borderRadius: 20 }} placeholder="Search for a location" onChangeText={setSearch} value={search} placeholderTextColor={'white'}  /> */}
      <MapView
        resizeMode="cover"
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

      <ScrollView horizontal={true} style={styles.cardContainer}  showsVerticalScrollIndicator ={false}
  showsHorizontalScrollIndicator={false} e={{ flexGrow: 1, height: '100%'}}>
      
        {user3}
     
</ScrollView>

      
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
  img:{
marginLeft:10,
  },
  cardRight:{
    marginLeft: 20,
    padding:5,
    paddingBottom: 10,
    marginBottom: 10,
    
  },

  cardContainer:{
   
    width:"100%",
    display:"flex",
    flexDirection: "row",
    height:0,

  },
 card: {
  alignItems:"center",
   display:"flex",
   flexDirection:"row",
   margin:20,
   backgroundColor:"white",
    height:100,
    width:300,
    borderRadius:10,
  },
  langues:{
    paddingBottom: 5,
  },
  name:{
    fontWeight:"bold",
    fontSize:16,
    paddingBottom: 5,
  },
  description:{
    fontSize: 14,
    paddingBottom: 5,
  },
});
