import { Button, StyleSheet, Text, View } from 'react-native';

export default function FavoriteScreen() {

    return (
        <View style={styles.container}>
            <Text> Favorite Buddies Screen</Text>
        </View>

    );
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'blue',
    }
})