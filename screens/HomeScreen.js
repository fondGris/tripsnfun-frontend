import { Button, StyleSheet, Text, View, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function HomeScreen() {

    //pour pouvoir set la position de l utilisateur sur la map;
    const [currentPosition, setCurrentPosition] = useState(null);

    //demande de l'autrorisation du user pour la geoloc à la charge de la page;
    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') {
                Location.watchPositionAsync({ distanceIntereval: 10 },
                    (location) => {
                        setCurrentPosition(location.coords);
                    });
            }
        })();
    }, []);
    // console.log(currentPosition)
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

    const otherUsersData = [
        { name: 'Kassim', latitude: 48.859, longitude: 2.347 },
        { name: 'Farouk', latitude: 48.29, longitude: 4.074 },
        { name: 'Yssam', latitude: 43.282, longitude: 5.405 },
        { name: 'Marie', latitude: 43.091, longitude: -0.045 },

    ]

    const otherUsers = otherUsersData.map((data, i) => {
        return <Marker key={i} coordinate={{ latitude: data.latitude, longitude: data.longitude }} title={data.name} pinColor="#fecb2d" />;
    })


    return (
        <View style={styles.container}>
            <Text> Home Screen</Text>
            <MapView style={styles.map} initialRegion={initialPosition} showsUserLocation followsUserLocation >

                {currentPosition && <Marker coordinate={currentPosition} title="My position" />}
                {otherUsers}
            </MapView>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'green',
    },
    map: {
        flex: 1,
    },
});
