import { Text, View, Image, StyleSheet,ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { auth } from "./config/firebase_config";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect,useState } from "react";

const MovieDetailsScreen = ({ navigation, route }) =>{
    //selected movie data from route props
    const { movie } = route.params;
    const [loggedInUser, setloggedInuser] = useState(null);

    //Navigate to the LoginScreen
    const onSignInCreateNewAccountPress = () =>{
        navigation.navigate("LoginScreen");
    }

    //Navigate to the BuyTicketsScreen
    const onBuyTicketsPress = () =>{
        navigation.navigate("BuyTicketsScreen", {
            selectedMovie: JSON.stringify(movie), 
            user: JSON.stringify(loggedInUser)
        });
    }

    //Check if there is a logged in user
    useEffect(()=>{
        return onAuthStateChanged(auth, (user) =>{
            if (user)
                setloggedInuser(user);
            else
                setloggedInuser(null);
        });
    },[])

    return (
        <ScrollView style={ styles.container }>
            {/* Backdrop Image */}
            <Image
                source={ {
                    uri: `https://image.tmdb.org/t/p/w500${ movie.backdrop_path }`
                } }
                style={ styles.backdrop }
            />
            {/* Movie Detail */}
            <View style={ styles.detailsContainer }>
                {/* Movie name and average voter rating */}
                <View style={ styles.titleRatingContainer }>
                    <Text style={ styles.title }>{ movie.title }</Text>
                    <View style={ styles.ratingContainer }>
                        <Ionicons name="star" size={ 25 } color="#FFD700" />
                        <Text style={ styles.rating }>{ movie.vote_average }/10</Text>
                    </View>   
                </View>
                {/* Release Date */}
                <Text style={ styles.releaseDate }>{ movie.release_date }</Text>
                {/* Movie Overview */}
                <Text style={styles.summaryTextStyle}>Plot Summary</Text>
                <Text style={ styles.overview }>{ movie.overview }</Text>
                {
                    //If there is no logged in user, then display the following text
                    !loggedInUser &&
                    (<Text style={ styles.textStyle }>You must be logged in to use this feature.</Text>)
                }
                {/* Disable the Buy Tickets button is there is no logged in user */}
                <TouchableOpacity
                    style={ loggedInUser ? styles.buttonStyle : styles.diableButtonStyle }
                    disabled={ !loggedInUser }
                    onPress={ onBuyTicketsPress }
                >
                    <Text style={ loggedInUser ? styles.buttonTextStyle : styles.disableButtonTextStyle }>
                        Buy Tickets
                    </Text>
                </TouchableOpacity>
                {
                    //If there is no logged in user, then display the Login or Create New Account button
                    !loggedInUser && (
                        <TouchableOpacity style={ styles.buttonStyle } onPress={ onSignInCreateNewAccountPress }>
                            <Text style={ styles.signinCreateNewAccountButtonTextStyle }>
                                Login or Create New Account
                            </Text>
                        </TouchableOpacity>)
                }
            </View>
        </ScrollView>
    );
};

//Style sheet
const styles = StyleSheet.create({
    container: {
        flex: 1,
     },
     backdrop: {
        width: '100%',
        height: 250,
        resizeMode:'stretch'
    },
    detailsContainer: {
        flex: 1,
        padding: 10,
    },
    titleRatingContainer: {
        flexDirection:'row'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        flex: 7
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        flex: 3
    },
    rating: {
        marginLeft: 5,
        fontSize: 24,
        fontWeight: 'bold',
    },
    releaseDate: {
        fontSize: 18,
        color: '#666',
        marginBottom: 10,
    },
    summaryTextStyle:{
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical:10
    },
    overview: {
        fontSize: 18,
        marginTop: 10,
        marginBottom: 60,
    },
    buttonStyle:{
        backgroundColor:'#ff6347',
        justifyContent:'center',
        padding: 15,
        margin: 15,
        borderRadius: 5
    },
    diableButtonStyle:{
        backgroundColor:'#dcdcdc',
        padding: 15,
        margin: 15,
        borderWidth:0.5,
        borderColor:'gray',
        borderRadius: 5
    },
    disableButtonTextStyle: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonTextStyle: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: 'bold',
        color:'#fffff0',
    },
    signinCreateNewAccountButtonTextStyle:{
        color:'#fffff0',
        textAlign:'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    textStyle:{
        textAlign:'center',
        fontSize:16,
    }
});

export default MovieDetailsScreen;
