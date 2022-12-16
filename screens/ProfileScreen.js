import { StyleSheet, Text, View, Image, TouchableOpacity, Animated, ScrollView, SafeAreaView, Dimensions, ImageBackground, Platform, Pressable} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, removeAllMarkers } from '../reducers/user';
import React, { Component } from "react";

export default function ProfileScreen({ navigation }) {
	const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);

    const OFFSET = 40;
    const ITEM_WIDTH = Dimensions.get("window").width - (OFFSET * 2);
    const ITEM_HEIGHT = 180;

    const cards = [
        { title: "Pic 1", posterUrl: require("../assets/img/gallery01.jpg") },
        { title: "Pic 2", posterUrl: require("../assets/img/gallery02.png") },
        { title: "Pic 3", posterUrl: require("../assets/img/gallery03.png") },
        { title: "Pic 5", posterUrl: require("../assets/img/gallery05.jpg") },
        { title: "Pic 6", posterUrl: require("../assets/img/gallery06.jpg") },
        { title: "Pic 4", posterUrl: require("../assets/img/gallery04.jpg") },
        
    ]

    const scrollX = React.useRef(new Animated.Value(0)).current

	const handleLogout = () => {
		dispatch(logout());
        dispatch(removeAllMarkers())
        navigation.navigate("indexLogin")
	};

    return (
        <View style={styles.container}>
            <View>
                <ImageBackground style={styles.header} source={require('../assets/img/headProfile.jpg')}>
                    <View style={styles.headerNav}>
                        <TouchableOpacity style={styles.btn} activeOpacity={0.8}>
                            <FontAwesome name={"bars"}size={30} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>

                <View style={[styles.profileInfos, styles.boxShadow]}>
                    <View style={styles.topBtn}>
                        <TouchableOpacity style={{margin: 10}} activeOpacity={0.8} >
                            <FontAwesome name={"edit"}size={20} color="#888" />
                        </TouchableOpacity>
                        <Pressable style={[styles.badge, styles.boxShadow]} activeOpacity={0.8} onPress={() => navigation.navigate('Buddies')}>
                            <Text style={styles.badgeTitle}>buddies <Text style={styles.badgeNumberBuddies}> 28</Text></Text>
                        </Pressable>
                    </View>
                    <View style={styles.idCard}>
                        <Image source={require('../assets/img/Yssamm.jpg')} style={styles.profilePicture}/>
                        <Text style={styles.username}>Yssam Boubaya </Text>
                        <Text style={styles.nickname}>Boubax</Text>
                        <Text style={styles.city}>Villepinte, <Text style={styles.country}>Villepinte</Text></Text>
                        <Text style={styles.languages}>speaks : 
                            <Image source={require('../assets/img/uk.png')} style={styles.flag} />  <Image source={require('../assets/img/dz.png')} style={styles.flag} />  <Image source={require('../assets/img/fr.png')} style={styles.flag} />
                        </Text>
                        <Text style={styles.age}>Age : 45</Text>
                    </View>
                </View>

                <View style={styles.presentation}>
                    <Text style={styles.title}>
                        Hobbies
                    </Text>
                    <Text style={styles.text}>
                        Lorem ipsum dolor sit amet.
                    </Text>
                    <Text style={styles.title}>
                        Presentation
                    </Text>
                    <Text style={styles.text}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae ipsam temporibus iure eligendi porro, repellat earum tempora sed quidem a ad, voluptas, culpa unde. Quam facere optio dicta distinctio eveniet.
                    </Text>
                    <Text style={styles.title}>
                        My pics
                    </Text>
                </View>

            </View>
            <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
                <ScrollView
                    horizontal={true}
                    decelerationRate={"normal"}
                    snapToInterval={ITEM_WIDTH}
                    style={{ marginTop: 20, paddingHorizontal: 0 }}
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    disableIntervalMomentum
                    onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                    )}
                    scrollEventThrottle={12}
                >
                    {cards.map((item, idx) => {
                    const inputRange = [
                        (idx - 1) * ITEM_WIDTH,
                        idx * ITEM_WIDTH,
                        (idx + 1) * ITEM_WIDTH,
                    ]

                    const translate = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.85, 1, 0.85],
                    })

                    const opacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.5, 1, 0.5],
                    })

                    return (
                        <Animated.View
                        style={{
                            width: ITEM_WIDTH,
                            height: ITEM_HEIGHT,
                            marginLeft: idx === 0 ? OFFSET : undefined,
                            marginRight: idx === cards.length - 1 ? OFFSET : undefined,
                            opacity: opacity,
                            transform: [{ scale: translate }],
                        }}
                        >
                        <ImageBackground
                            source={item.posterUrl}
                            style={{
                            flex: 1,
                            resizeMode: "cover",
                            justifyContent: "center",
                            }}
                            imageStyle={{ borderRadius: 6}}
                        />
                        </Animated.View>
                    )
                    })}
                </ScrollView>
            </SafeAreaView>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: "flex-start"
    },
    header: {
        width: "100%",
        height: 250,
        marginRight: "auto",
        marginLeft: "auto",
        paddingTop: 50,

    },
    headerNav: {
        paddingLeft: 25,
        paddingRight: 25,

    },
    profileInfos: {
        width: "90%",
        marginRight: "auto",
        marginLeft: "auto",
        marginTop: -100,
        marginBottom: 15,
        backgroundColor: "#fff",
        borderRadius: 5,
    },
    topBtn: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    badge: {
        height: 55,
        width: 55,
        borderRadius: 25,
        marginTop: -25,
        marginRight: -10,
        backgroundColor: "#FF6D00",
        // backgroundColor: "linear-gradient(90deg, rgba(255,187,136,1) 0%, rgba(255,109,0,1) 100%)",
        color: "#fff",
        boxShadow: "2px 3px 3px 5px"
    },
    idCard: {
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
       },
    badgeTitle: {
        fontSize: 11,
        lineHeight:24,
        textAlign: "center",
        justifyContent: "center",
        color: "#fff",

    },
    badgeNumberBuddies: {
        fontSize:22,
        display: "block",
        fontWeight: "600"
    },
    profilePicture: {
        width: 115,
        height: 115,
        borderRadius: 55,
        marginTop: -70,
        marginBottom: 15,
    },
    username: {
        fontWeight: "600",
        fontSize: 22,
        marginBottom: -5

    },
    nickname: {
        fontSize: 16,
        marginBottom: 10
    },
    city: {
        color: "#05898E",
        marginBottom:5,
    },
    languages: {
        fontSize: 10,
        marginBottom:5,
    },
    age: {
        color: "#333",
        marginLeft: 15,
        marginBottom: 10,
        alignSelf: "flex-start",
    },
    flag: {

    },
    presentation: {
        width: "90%",
        marginRight: "auto",
        marginLeft: "auto"
    },
    title: {
        color: "#333",
        fontSize: 22,
        fontWeight: "600",
    },
    text: {
        color: "#333",
        fontSize: 14,
        marginBottom: 10,
    }

})

const generateBoxShadowStyle = (
    xOffset,
    yOffset,
    shadowColorIos,
    shadowOpacity,
    shadowRadius,
    elevation,
    shadowColorAndroid,
) => {
    if (Platform.OS === 'ios') {
        styles.boxShadow = {
            shadowColor: shadowColorIos,
            shadowOffset: {width: xOffset, height: yOffset},
            shadowOpacity,
            shadowRadius,
        };        
    } else if (Platform.OS === 'android') {
        styles.boxShadow = {
            elevation,
            shadowColor: shadowColorAndroid,
        };
    }
}
generateBoxShadowStyle(1, 1, '#171717', 0.7, 3, 8, '#171717');
