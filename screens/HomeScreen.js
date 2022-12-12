import { Button, StyleSheet, Text, View, Image } from 'react-native';

export default function HomeScreen() {
    return (
        <View style={styles.container}>
      <Text> Home Screen</Text>
      <Image source={require('../assets/map.jpg')} style={styles.map} />
        </View>

    );
  }
  
  const styles = StyleSheet.create({
    container:{
        backgroundColor:'green',
    },
    map: {
      width: '50%',
      height: '50%',
    },
  });
  