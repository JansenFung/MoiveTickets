import { useState } from 'react';
import { StyleSheet,Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from "./config/firebase_config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = ({ navigation }) =>{
    //Email address and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //Login by Firebase Authentication
    const handleLogin = async () =>{
        try{
            //Check if the email address or password is empty
            if (email.trim() === '' || password.trim() === ''){
                Alert.alert('Error', 'Please enter your email address and password');
                return;
            }
            
            const userCredentials = await signInWithEmailAndPassword(auth, email, password);
            
            console.log(`Login successfully : ${ JSON.stringify(userCredentials.user.email) }`);
            
            navigation.goBack();
        }
        catch (err){
            Alert.alert('Error', 'Invalid Emall address or password');
            console.log(err);
        }
    }
    
    //Create new account by Firebase Authentication
    const handleCreateAccount = async () =>{
        try{
            //Check if the email address or password is empty
            if (email.trim() === '' || password.trim() === ''){
                Alert.alert('Error', 'Please enter your email address and password');
                return;
            }
        
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            
            console.log(`account created successfully : ${ JSON.stringify(userCredentials.user.email) }`);
            
            navigation.goBack();
        }
        catch (err){
            Alert.alert('Error', 'Invalid Emall address or password');
            console.log(err);
        }
    }
    
    return (
        <View style={ styles.container }>
            <Text style={ styles.headerStyle }>Login to Your Account</Text>
            <Text style={ styles.textStyle }>You must be logged in to use this feature.</Text>
            {/* Email address textbox */}
            <Text style={ styles.text_2Style }>Email address:</Text>
            <TextInput
                style={ styles.input }
                placeholder="Enter email"
                value={ email }
                onChangeText={ setEmail }
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={ false }
            />
            {/* Password textbox */}
            <Text style={ styles.text_2Style }>Password:</Text>
            <TextInput
                style={ styles.input }
                placeholder="Enter password"
                value={ password }
                onChangeText={ setPassword }
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={ false }
            />
            {/* Login button */}
            <TouchableOpacity style={ styles.button } onPress={ handleLogin }>
                <Text style={ styles.buttonText }>Login</Text>
            </TouchableOpacity>
            {/* Create new account button */}
            <TouchableOpacity style={ styles.button } onPress={ handleCreateAccount }>
                <Text style={ styles.buttonText }>Create New Account</Text>
            </TouchableOpacity>
        </View>
    );
};

//Style sheet
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    headerStyle:{
        textAlign:'center',
        fontSize: 26,
        fontWeight:'bold',
     },
    textStyle:{
        textAlign:'center',
        fontSize: 18,
        marginBottom: 20
    },
    text_2Style: {
        fontSize: 16,
        margin: 5
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    button: {
        width: '100%',
        height: 50,
        color:'#ff6347',
        backgroundColor:'#ff6347',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default LoginScreen;