import { StyleSheet, Text, View, FlatList,TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { db } from "./config/firebase_config";
import { auth } from "./config/firebase_config";
import { collection, getDocs, query, where, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

const MyPurchasesScreen = ({navigation}) => {
    //State values
    const [ticketsList, setTicketsList] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState(null);

    //Retrive currently logged in use purchase history
    const getPurchasedTickets = () =>{
        const collectionRef = collection(db, "purchaseHistory");
        //where filter
        const filter = where("userId", "==", loggedInUser.uid);
        //query
        const q = query(collectionRef, filter);
       
        const arr = [];
    
        //get the realtime update from firestore
        onSnapshot(q, (snapshot) => {
            snapshot.docChanges().forEach((change) =>{
                if(change.type === 'added'){
                    console.log('added');
                    arr.push({id: change.doc.id, ...change.doc.data()})
                    setTicketsList(arr);
                }
            })
            // console.log(arr.length);
            //setTicketsList(arr);
        })

       // console.log(ticketsList.length)
    }

    //Navigation to Login screen
    const onLoginNewAccountPress = () =>{
        navigation.navigate("LoginScreen");
    }

    //Update the auth state and get the realtime list of purchases made
    //from firestore when the use logged in
    useEffect(()=>{
        onAuthStateChanged(auth, (user)=>{
            if(user){
                setLoggedInUser(user);
            }
            else{
                setLoggedInUser(null);
            }
        });

        console.log("Effect")
        //get the list of purchases made if the user is logged in
        if(loggedInUser)
            getPurchasedTickets();
        else
            setTicketsList([]);
    },[loggedInUser]);

    return(
    <View>
        {
            //If there is a logged in user, display the list of purchases made
            loggedInUser ? 
            (ticketsList.length > 0 ? (
                <View>
                    <Text style={styles.textStyle}>Your Tickets</Text>
                    <FlatList 
                    style={ styles.flatListStyle }
                    data={ ticketsList } 
                    keyExtractor={ item=>item.id }
                    renderItem={(purchaseMadeComponent)}
                    />
                </View>) : <Text style={styles.noPurchaseFoundTextStyle}>No Purchases History Found</Text>)
            :  
            //If there is no logged in user, display the TouchableOpacity element 
            (<View style={styles.viewStyle}>
                <Text style={styles.textStyle}>Your Tickets</Text>
                <Text style={styles.text_2Style}>You must be logged in to use this feature.</Text>
                <TouchableOpacity style={styles.buttonStyle} onPress={onLoginNewAccountPress}>
                    <Text style={styles.buttonTextStyle}>Login or Create New Account</Text>
                </TouchableOpacity>
            </View>)
        }
    </View>);
}

//Purchase made component
const purchaseMadeComponent = ({item}) =>{
    return(
    <View style={styles.itemStyle}>
        <View style={styles.itemViewStyle}>
            <View style={styles.iconStyle}>
                <Icon name="ticket" size={30}/>
            </View>
            <View style={styles.itemSubViewStyle}>
                <Text style={styles.text_3Style}>{item.movieName}</Text>
                <Text style={styles.text_4Style}>Num Tickets: {item.numTickets}</Text>
                <Text style={styles.colorText_Style}>Total Paid: ${item.total}</Text>
            </View>
        </View>
    </View>);
}

//Style sheet
const styles = StyleSheet.create({
    viewStyle:{
        paddingVertical: '60%',
        paddingHorizontal: 40,
    },
    flatListStyle: {
        marginBottom:150
    },
    textStyle:{
        textAlign:'center',
        fontSize: 26,
        fontWeight:'bold',
        marginVertical: 20
    },
    noPurchaseFoundTextStyle:{
        textAlign:'center',
        fontSize: 26,
        fontWeight:'bold',
        marginTop: 300
    },
    text_2Style:{
        fontSize: 16,
        textAlign: 'center'
    },
    text_3Style:{
        fontSize: 18,
        fontWeight: 'bold'
    },
    text_4Style:{
        fontSize: 16,
    },
    colorText_Style:{
        fontSize: 16,
        color:'#ff6347'
    },
    buttonStyle: {
        width: '100%',
        height: 50,
        backgroundColor: '#ff6347',
        justifyContent: 'center',
        alignItems: 'center',
        padding:10,
        marginVertical: 10,
        borderRadius: 5,
    },
    buttonTextStyle:{
        fontSize: 16,
        textAlign: 'center',
        color: "#fff",
        fontWeight: 'bold',
    },
    itemStyle:{
        borderBottomColor: '#ccc',
        borderTopColor:'#fff',
        borderBottomWidth: 1,
        padding: 10
    },
    itemViewStyle:{
        flexDirection:'row'
    },
    itemSubViewStyle:{
        flex: 9
    },
    iconStyle:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        margin:10
    }
});

export default MyPurchasesScreen;