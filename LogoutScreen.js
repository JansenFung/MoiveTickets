import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { auth } from "./config/firebase_config";
import { signOut } from "firebase/auth";

const LogoutScreen = ({ navigation }) =>{
    //Handle logout function
    const handleLogout = async () =>{
        try{
            await signOut(auth);
            Alert.alert("Logout Success");
            navigation.navigate('NowPlayingScreen');
        }
        catch (err){
            console.error(`Error occurred : ${ err.message }`);
        }
    }
    
    return (
        <View style={ styles.container }>
            <Text style={ styles.text }>Are you ready to logout?</Text>
            {/* Logout button */}
            <TouchableOpacity style={ styles.button } onPress={ handleLogout }>
                <Text style={ styles.buttonText }>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        width: '80%',
        height: 50,
        backgroundColor:'#ff6347',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize:16,
    },
});

export default LogoutScreen;