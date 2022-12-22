import {
    StyleSheet,
    Text,
    View,
    Image,
    DrawerLayoutAndroid,
    TextInput,
    TouchableOpacity,
    Animated,
    ScrollView,
    SafeAreaView,
    Dimensions,
    ImageBackground,
    Platform,
    Pressable,
    Modal
    } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, removeAllMarkers , removeAllOtherUsers, addAvatar} from '../reducers/user';
import React, { useRef, useState, useEffect, } from 'react';
import { useIsFocused } from '@react-navigation/native';



export default function UserScreen({ navigation }) {
	const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [age, setAge] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [hobbies, setHobbies] = useState("");
    const [description, setDescription] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    const BACKEND_ADDRESS = "https://tripsnfun-backend.vercel.app/";

    useEffect(() => {
        // appelle du backend pour recupérer les autres positions des autres
        console.log("ok1", user.tokenUserScreen);
        fetch(`${BACKEND_ADDRESS}/users/getUser/${user.tokenUserScreen}`)
          .then((response) => response.json())
          .then((data) => {
            console.log("ok2");
            if (data.result) {
                console.log(data);
                setUsername(data.data.username)
                setFirstname(data.data.firstname)
                setLastname(data.data.lastname)
                setEmail(data.data.email)
                setAvatar(data.data.avatar)
                setAge(data.data.age)
                setCity(data.data.city)
                setCountry(data.data.country)
                setHobbies(data.data.hobbies)
                setDescription(data.data.description)
            }})
    
            });
        
   
    // User Info from the form
   

    const drawer = useRef(null);
    const navigationView = () => (
        <View style={[styles.container, styles.navigationContainer]}>
            <TouchableOpacity activeOpacity={0.8} style={{position: "absolute", top: 50, right: 10}} >
                <FontAwesome name={"close"} size={25} color="#333" onPress={() => drawer.current.closeDrawer()} />
            </TouchableOpacity>

            <View style={{alignItems: "center"}}>
                <Text style={[styles.title, styles.drawerTitle]}>Trips'n<Text style={{color:"#ff6d00"}}>Fun</Text></Text>
                <Image source={require("../assets/img/logo.png")} style={styles.logo} />
                <View style={{alignItems: "center"}}>
                    <Image source={{ uri: user.avatar }} style={[styles.profilePicture, styles.drawerProfilePicture]} />
                    <Text style={styles.username}>{firstname} {lastname}</Text>
                    <Text style={styles.nickname}>{username}</Text>
                </View>
            </View>

            <View style={{alignItems: "center"}}>
                <Text style={[styles.text, styles.links]}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Text style={styles.link}>
                            <FontAwesome name={"image"} size={20} color="#888"/>    My Trips
                        </Text>
                        <Text style={styles.link}>
                            <FontAwesome name={"commenting"} size={20} color="#888"/>    Notifications
                        </Text>
                       
                    </TouchableOpacity>
                </Text>
            </View>

            <View style={{alignItems: "flex-start", marginBottom: 50}}>
                <Pressable style={{backgroundColor: "#05898E", paddingHorizontal: 30, paddingVertical:8, borderRadius: 20}} activeOpacity={0.8} onPress={() => handleLogout()}>
                    <Text style={{color: "#fff"}}>logout</Text>
                </Pressable>
            </View>
        </View>
    );

    const OFFSET = 40;
    const ITEM_WIDTH = Dimensions.get("window").width - (OFFSET * 2);
    const ITEM_HEIGHT = 180;

    const cards = [
        { title: "Pic 1", key: 1, posterUrl: require("../assets/img/gallery01.jpg") },
        { title: "Pic 2", key: 2, posterUrl: require("../assets/img/gallery02.png") },
        { title: "Pic 3", key: 3, posterUrl: require("../assets/img/gallery03.png") },
        { title: "Pic 5", key: 4, posterUrl: require("../assets/img/gallery05.jpg") },
        { title: "Pic 6", key: 5, posterUrl: require("../assets/img/gallery06.jpg") },
        { title: "Pic 4", key: 6, posterUrl: require("../assets/img/gallery04.jpg") },
    ]

    const scrollX = React.useRef(new Animated.Value(0)).current


// fonctionalité pour se delog et vider les markers garder en local storage
	const handleLogout = () => {
		dispatch(logout());
        dispatch(removeAllMarkers());
        dispatch(removeAllOtherUsers());
        
        // fetch du backend pour update le token de l'utilisateur 
        fetch(`${BACKEND_ADDRESS}/status/${user.token}`, { 
            method: "PUT",
            headers: { "Content-Type": "application/json" },
          })
            .then((response) => response.json())
            .then((data) => {
        })
              // a l appui du boutton redirige vers la page d accueil
        navigation.navigate("indexLogin")
	};

    
    
    const isFocused = useIsFocused();
    if (!isFocused) {
        return <View />;
      }
    return (
        
        <DrawerLayoutAndroid
            ref={drawer}
            drawerWidth={300}
            renderNavigationView={navigationView}
            drawerLockMode="locked-closed"
        >
            <View style={styles.container}>
                

                <View>
                    <ImageBackground style={styles.header} source={require('../assets/img/headProfile.jpg')}>
                        <View style={styles.headerNav}>
                            <TouchableOpacity style={styles.btn} activeOpacity={0.8}>
                                <FontAwesome name={"bars"}size={30} color="#fff" onPress={() => drawer.current.openDrawer()}/>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>

                    <View style={[styles.profileInfos, styles.boxShadow]}>
                        
                        <View style={styles.idCard}>
                            <Image source={{ uri: user.avatar }} style={styles.profilePicture}/>

                            <Text style={styles.username}>{firstname} {lastname}</Text>
                            <Text style={styles.nickname}>{username}</Text>
                            <Text style={styles.city}>{city}, <Text style={styles.country}>{country}</Text></Text>
                            <Text style={styles.languages}>speaks : <Image source={require('../assets/img/uk.png')} style={styles.flag} />  <Image source={require('../assets/img/dz.png')} style={styles.flag} />  <Image source={require('../assets/img/fr.png')} style={styles.flag} />
                            </Text>
                            <Text style={styles.age}>Age : {age}</Text>
                        </View>
                    </View>

                    <View style={styles.presentation}>
                        <Text style={styles.title}>
                            Hobbies
                        </Text>
                        <Text style={styles.text}>
                        {hobbies}
                        </Text>
                        <Text style={styles.title}>
                            Presentation
                        </Text>
                        <Text style={styles.text}>
                        {description}
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
                        style={{ marginTop: 10, paddingHorizontal: 0 }}
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
                            <Animated.View key={idx}
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
                                imageStyle={{ borderRadius: 8}}
                            />
                            </Animated.View>
                        )
                        })}
                    </ScrollView>
                </SafeAreaView>
            </View>

        </DrawerLayoutAndroid>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
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
        borderColor: "#05898E",
        borderWidth: 1,
        backgroundColor: "#ff6d00",
        marginTop: -70,
        marginBottom: 5,
    },
    drawerProfilePicture: {
        marginTop: 25,
    },
    username: {
        fontFamily: 'MontserratAlternatesSemiBold',
        fontSize: 22,
        marginBottom: -5
    },
    nickname: {
        fontFamily: 'MontserratAlternatesMedium',
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
        fontFamily: 'MontserratAlternatesSemiBold',
        color: "#333",
        fontSize: 22,
        fontWeight: "600",
        marginBottom: 5
    },
    modal: {
        flex: 1,
        height: "100%",
    },
    modalTitle: {
        fontFamily: 'MontserratAlternatesSemiBold',
        color: "#333",
        fontSize: 22,
        fontWeight: "600",
        marginBottom: 10,
        marginBottom: 10,
        marginLeft: 20,
    },
    drawerTitle: {
        color: "#05898E",
        marginBottom:10
    },
    text: {
        fontFamily: 'RobotoRegular',
        color: "#333",
        fontSize: 14,
        marginBottom: 10,
    },
    links: {
        textAlignVertical: "center",
        height:50
    },
    link:  {
        marginBottom:10,
    },
    modalView: {
        position: "relative",
        width: "90%",
        marginLeft: "auto",
        marginRight: "auto",
        top: 50,
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        alignItems: 'flex-start',
        shadowColor: '#000',
        shadowOffset: {
          width: 5,
          height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
    },
    formRow: {
        flexDirection: "row",
        textAlign: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    inputContainer: {
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
        height: 50,
        paddingRight: 20,
        paddingLeft: 20,
        backgroundColor: "#efefef",
        borderColor: "#05898E",
        borderWidth: 1,
        borderRadius: 25,
        fontSize: 16,
        marginHorizontal: 5,
        flexGrow: 1
    },
    inputTextContainer: {
        justifyContent: "flex-start",
        paddingTop: 10,
        height: 150,
    },
    input: {
        width:"100%",
    },
    submitBtn: {
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
        height: 50,
        paddingRight: 30,
        paddingLeft: 30,
        backgroundColor: "#05898E",
        borderRadius: 30,
        fontSize: 16,
        marginHorizontal: 10
    },
    textButton: {
        fontSize: 18,
        color: "#fff",
        fontFamily: 'RobotoRegular',
    },
    btnImage: {
        alignItems: 'center',
        justifyContent: "center",
        marginTop: 20,
        marginHorizontal: 5,
        boxSizing: "border-box",
        height: 50,
        paddingRight: 30,
        paddingLeft: 30,
        backgroundColor: "#FFBB88",
        borderWidth: 1,
        borderColor: "#05898E",
        borderRadius: 25,
        fontSize: 16,
        flexGrow: 1
    },
    textImageBtn: {
        color: "#05898E",
    },
    imageProfileContainer: {
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        alignSelf: "center",
    },
    modalProfileImage: {
        flexGrow: 3,
        height: 50,
        borderRadius: 50,
        borderWidth: 1,
        marginHorizontal: 5,
        borderColor: "#ff6d00",
    },
    navigationContainer: {
        // backgroundColor: "#efefef"
        paddingTop: 55,
        justifyContent: "space-between",
        alignItems:"center",
    },
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
