import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NowPlayingScreen from "./NowPlayingScreen";
import MovieDetailsScreen from "./MovieDetailsScreen";
import LoginScreen from "./LoginScreen";
import BuyTicketsScreen from "./BuyTicketsScreen";

const Stack = createNativeStackNavigator();

const NowPlayingStackScreen = () => {
    return(
        //Now Playing Stack Navigation
        <Stack.Navigator initialRouteName="NowPlayingScreen">
            <Stack.Screen name="NowPlayingScreen" component={NowPlayingScreen}/>
            <Stack.Screen name="MovieDetailsScreen" component={MovieDetailsScreen}/>
            <Stack.Screen name="LoginScreen" component={LoginScreen}/>
            <Stack.Screen name="BuyTicketsScreen" component={BuyTicketsScreen}/>
        </Stack.Navigator>
    );
}

export default NowPlayingStackScreen;