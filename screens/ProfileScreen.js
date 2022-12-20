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
import { login, logout, removeAllMarkers , removeAllOtherUsers} from '../reducers/user';
import React, { useRef, useState } from 'react';
import { useFonts } from 'expo-font';
import * as ImagePicker from 'expo-image-picker';
import { useIsFocused } from '@react-navigation/native';

// import LinearGradient from 'react-native-linear-gradient';

export default function ProfileScreen({ navigation }) {
	const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);

    const [modalVisible, setModalVisible] = useState(false);
    const [image, setImage] = useState(null);

    // side menu
    // const isFocused = useIsFocused();
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
                    <Image source={require("../assets/img/Yssamm.jpg")} style={[styles.profilePicture, styles.drawerProfilePicture]} />
                    <Text style={styles.username}>Yssam Boubaya </Text>
                    <Text style={styles.nickname}>Boubax</Text>
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
                        {/* <Text style={styles.link}>
                            <FontAwesome name={"settings"} size={20} color="#888"/>    Settings
                        </Text> */}
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
//pensez à changez l adress du backend pour test
    // const BACKEND_ADDRESS = "http://192.168.10.162:3000";
    //pensez à changer l adress pour test
    const BACKEND_ADDRESS = "http://192.168.10.148:3000";

// fonctionalité pour se delog et vider les markers garder en local storage
	const handleLogout = () => {
        // console.log("OK1");
		dispatch(logout());
        dispatch(removeAllMarkers())
        dispatch(removeAllOtherUsers())
        // fetch du backend pour update le token de l'utilisateur 
        fetch(`${BACKEND_ADDRESS}/status/${user.token}`, { 
            method: "PUT",
            headers: { "Content-Type": "application/json" },
          })
            .then((response) => response.json())
            .then((data) => {
                //  console.log("OK2", data);
        })
              // a l appui du boutton redirige vers la page d accueil
        navigation.navigate("indexLogin")
	};

    const handleEdit = () => {
        setModalVisible(true);
      };

    const handleClose = () => {
    setModalVisible(false);
    setNewPlace('');
    };
    // console.log("modal : ", modalVisible )

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        // console.log('image ? => ', image);
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
        // console.log('image2 ? => ', image);
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
                <Modal visible={modalVisible} animationType="fade" transparent>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TouchableOpacity activeOpacity={0.8} style={{position: "absolute", top: 10, right: 10}} >
                                <FontAwesome name={"close"} size={25} color="#888" onPress={() => setModalVisible(!modalVisible)} />
                            </TouchableOpacity>
                            <Text style={styles.modalTitle}>
                                Edit your profile
                            </Text>

                            <View style={styles.imageProfileContainer}>
                                <Pressable style={styles.btnImage} activeOpacity={0.8} onPress={pickImage}>
                                    <Text style={styles.textImageBtn}>Pick your profile picture</Text>
                                </Pressable>
                                {image && <Image source={{ uri: image }} style={ styles.modalProfileImage } />}
                            </View>
                            <View style={styles.formRow}>
                                <View style={styles.inputContainer}>
                                    <TextInput placeholder="Your firstname" onChangeText={(value) => {console.log(value)}} value={{}} style={styles.input} />
                                </View>
                                <View style={styles.inputContainer}>
                                    <TextInput placeholder="Your lastname" onChangeText={(value) => {console.log(value)}} value={{}} style={styles.input} />
                                </View>
                            </View>
                            <View style={styles.formRow}>
                                <View style={styles.inputContainer}>
                                    <TextInput placeholder="Your Nickname" onChangeText={(value) => {console.log(value)}} value={{}} style={styles.input} />
                                </View>
                                <View style={styles.inputContainer}>
                                    <TextInput placeholder="Your Birthday" onChangeText={(value) => {console.log(value)}} value={{}} keyboardType="decimal-pad" style={styles.input} />
                                </View>
                            </View>
                            <View style={styles.formRow}>
                                <View style={styles.inputContainer}>
                                    <TextInput placeholder="Your Email" onChangeText={(value) => {console.log(value)}} value={{}} keyboardType="email-address" style={styles.input} />
                                </View>
                            </View>

                            <View style={styles.formRow}>
                                <View style={styles.inputContainer}>
                                    <TextInput placeholder="Your City" onChangeText={(value) => {console.log(value)}} value={{}} style={styles.input} />
                                </View>
                                <View style={styles.inputContainer}>
                                    <TextInput placeholder="Your Country" onChangeText={(value) => {console.log(value)}} value={{}} style={styles.input} />
                                </View>
                            </View>

                            <View style={styles.formRow}>
                                <View style={styles.inputContainer}>
                                    <TextInput placeholder="Your Hobbies" onChangeText={(value) => {console.log(value)}} value={{}} style={styles.input} />
                                </View>
                            </View>
                            <View style={styles.formRow}>
                                <View style={[styles.inputContainer, styles.inputTextContainer]}>
                                    <TextInput placeholder="About you" onChangeText={(value) => {console.log(value)}} value={{}} style={styles.input} />
                                </View>
                            </View>

                            <TouchableOpacity style={styles.submitBtn} activeOpacity={0.8}>
                                <Text style={styles.textButton}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <View>
                    <ImageBackground style={styles.header} source={require('../assets/img/headProfile.jpg')}>
                        <View style={styles.headerNav}>
                            <TouchableOpacity style={styles.btn} activeOpacity={0.8}>
                                <FontAwesome name={"bars"}size={30} color="#fff" onPress={() => drawer.current.openDrawer()}/>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>

                    <View style={[styles.profileInfos, styles.boxShadow]}>
                        <View style={styles.topBtn}>
                            <TouchableOpacity style={{margin: 10}} activeOpacity={0.8} >
                                <FontAwesome name={"edit"}size={25} color="#888" onPress={() => setModalVisible(!modalVisible)} />
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
                            <Text style={styles.languages}>speaks : <Image source={require('../assets/img/uk.png')} style={styles.flag} />  <Image source={require('../assets/img/dz.png')} style={styles.flag} />  <Image source={require('../assets/img/fr.png')} style={styles.flag} />
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
    modalTitle: {
        fontFamily: 'MontserratAlternatesSemiBold',
        color: "#333",
        fontSize: 22,
        fontWeight: "600",
        marginBottom: 10,
        marginBottom: 20,
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
