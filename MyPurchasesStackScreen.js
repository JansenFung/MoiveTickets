import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyPurchasesScreen from "./MyPurchasesScreen";
import LoginScreen from "./LoginScreen";

const Stack = createNativeStackNavigator();

const MyPurchasesStackScreen = ()=>{
    return(
        //My Purchase Stack navigation
        <Stack.Navigator initialRouteName="MyPurchasesScreen">
            <Stack.Screen name="MyPurchasesScreen" component={MyPurchasesScreen}/>
            <Stack.Screen name="LoginScreen" component={LoginScreen}/>
        </Stack.Navigator>
    );
}

export default MyPurchasesStackScreen;