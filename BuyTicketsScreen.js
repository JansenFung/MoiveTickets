import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { db } from "./config/firebase_config";
import { addDoc, collection } from "firebase/firestore";
import { StackActions } from "@react-navigation/native";

const BuyTicketsScreen = ({ navigation, route }) => {
    //reviece selected movie and user data from route props
    let { selectedMovie, user } = route.params;
    selectedMovie = JSON.parse(selectedMovie);
    user = JSON.parse(user);
   
    //state values
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [numTickets, setNumTickets] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [total, setTotal] = useState(0);
    
    const TICKET_PRICE = 12;
    const TAX_RATE = 0.13;

    //Increase the number of tickets by 1 and calculate the subtotal, total, and tax
    const onIncreaseTicketNumberPress = () =>{
        const numberOfTickets = numTickets + 1;
        setNumTickets(numberOfTickets);

        const subTotalAmount = numberOfTickets * TICKET_PRICE;
        setSubTotal(subTotalAmount);

        const taxAmount = subTotalAmount * TAX_RATE;
        setTax(taxAmount);

        const totalAmount = subTotalAmount + taxAmount;
        setTotal(totalAmount);
    }

    //Decrease the number of tickets by 1 and calculate the subtotal, total, and tax
    const onDecreaseTicketNumberPress = () =>{
        //calculate the subtotal, total, tax if the number of ticket is greater than 0
        if (numTickets > 0){
            const numberOfTickets = numTickets - 1;
            setNumTickets(numberOfTickets);

            const subTotalAmount = numberOfTickets * TICKET_PRICE;
            setSubTotal(subTotalAmount);

            const taxAmount = subTotalAmount * TAX_RATE;
            setTax(taxAmount);

            const totalAmount = subTotalAmount + taxAmount;
            setTotal(totalAmount);
        }
    }

    //Purchase tickets
    const onConfirmPurchasePress = async() =>{
        //Check if the name is empty
        if (name.trim() === ''){
            Alert.alert("Error", "Please enter your name");
            return;
        }

        //Check if the email address is empty
        if (email.trim() === ''){
            Alert.alert("Error", "Please enter your email address");
            return;
        }

        const regex = /^\w+[\.-]?\w+@\w{3,}\.\w{2,3}$/i
     
        //Check email address format
        if (!regex.test(email)){
            Alert.alert("Error", "Invalid Email address format");
            return;
        }

        //Check if the number of selected ticket is 0
        if (numTickets === 0){
            Alert.alert("Error", "Please select Tickes");
            return;
        }

        try{
            //Firecloud collection reference
            const collectionRef = collection(db, 'purchaseHistory');

            //Purchase detail 
            const orderSummary = {
                movieId: selectedMovie.id,
                movieName: selectedMovie.title,
                nameOnPurchase: name,
                numTickets: numTickets,
                total: total,
                userId: user.uid
            }
            //Insert the purchase detail in the Firestore
            await addDoc(collectionRef, orderSummary);

            Alert.alert("Purchase Success!");

            //Back to the NowPlayinScreen
            navigation.dispatch(StackActions.popToTop());
        }
        catch(err){
            console.log(`Error: Unable to save in Firestore ${err}`);
        }
    }

    //Automatically populate with the logged in user's email address
    useEffect(()=>{
        setEmail(user.email);
    },[])

    return (
    <ScrollView style={ styles.viewStyle }>
        <Text style={ styles.screenTitleStyle }>Buy Tickets</Text>
        <Text style={ styles.titleStyle }>{ selectedMovie.title }</Text>
        {/* email address textInput */}
        <Text style={ styles.text_2Style }>Your email address:</Text>    
        <TextInput
            style={ styles.borderStyle }
            placeholder="Enter email address" 
            value={ email } 
            onChangeText={ setEmail }
            keyboardType="email-address"
            autoCorrect={ false }
            autoCapitalize="none"
        />
        {/* user name textInput */}
        <Text style={ styles.text_2Style }>Your name:</Text>
        <TextInput 
            style={ styles.borderStyle }
            placeholder="Enter name" 
            value={ name } 
            onChangeText={ setName }
            autoCorrect={ false }
            autoCapitalize="none"
        />
        {/* number of tickets */}
        <Text style={ styles.text_2Style }>Number of Tickets:</Text>
        <View style={ styles.subViewStyle }>
            {/* decrease the number of tickets */}
            <Icon 
                style={ styles.iconStyle } 
                onPress={ onDecreaseTicketNumberPress }
                name="minus" 
                color="#ff6347" 
                size={ 15 }/>
            <Text style={ styles.numberTextStyle }>{ numTickets }</Text>
             {/* increase the number of tickets */}
            <Icon 
                style={ styles.iconStyle } 
                onPress={ onIncreaseTicketNumberPress }
                name="plus" 
                color="#ff6347" 
                size={15}/>
        </View>
        {
            //Display the order summary if the number of tickets is greater than 0
            (numTickets > 0) && (
            <OrderSummaryComponent 
                info={{
                    title: selectedMovie.title,
                    numberOfTickets: numTickets,
                    subTotal: subTotal,
                    tax: tax,
                    total: total
                }}
            />)
        }
        {/* confirm purchase button */}
        <TouchableOpacity 
            style={ styles.buttonStyle } 
            onPress={ onConfirmPurchasePress }>
            <Text style={ styles.buttonTextStyle }>Confirm Purchase</Text>
        </TouchableOpacity>
    </ScrollView>
    );
}

//Order summary component
const OrderSummaryComponent = (props) => {
    return(
    <View>
        <Text style={ styles.text_2Style }>Order Summary:</Text>
        <View style={ styles.borderStyle }> 
            <Text style={ styles.textStyle }>{ props.info.title }</Text>
            <Text style={ styles.textStyle }>Number of Tickets: { props.info.numberOfTickets }</Text>
            <Text style={ styles.textStyle }>Subtotal: ${ props.info.subTotal.toFixed(2) }</Text>
            <Text style={ styles.textStyle }>Tax: ${ props.info.tax.toFixed(2) }</Text>
            <Text style={ styles.totalStyle }>Total: ${ props.info.total.toFixed(2) }</Text>
        </View>
    </View>);
}

//Style sheet
const styles = StyleSheet.create({
    viewStyle:{
        padding: 20
    },
    subViewStyle:{
        flexDirection:'row',
        width: "30%",
        height: 40,
        marginBottom: 40
    },
    screenTitleStyle:{
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    titleStyle:{
        fontSize: 22,
        textAlign:'center',
        marginBottom: 20
    },
    textStyle:{
        fontSize: 18,
        padding:5
    },
    text_2Style:{
        fontSize: 16,
        padding:5
    },
    borderStyle:{
        borderWidth: 1,
        borderColor: "#d3d3d3",
        borderRadius: 5,
        padding: 8,
        marginVertical:5,
    },
    numberTextStyle:{
        textAlign:'center',
        padding: 5,
        fontSize: 20,
        marginHorizontal: 5,
        flex:1
    },
    iconStyle:{
        flex: 1,
        borderWidth: 1,
        borderColor: "#ff6347",
        borderRadius: 5,
        padding: 10,
        textAlign:'center'
        
    },
    buttonStyle:{
        backgroundColor:"#ff6347",
        padding: 15,
        marginVertical: 50,
        borderRadius: 5,
    },
    buttonTextStyle:{
        color:'#fffff0',
        textAlign:'center',
        fontSize: 16,
        fontWeight:'bold'
    },
    totalStyle:{
        backgroundColor:'#ffd700',
        fontSize:18,
        padding: 5
    }
});

export default BuyTicketsScreen;