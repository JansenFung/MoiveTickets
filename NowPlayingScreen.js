import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';

const MovieList = ({ navigation }) =>
{   //movie data retreived from Web API
    const [movies, setMovies] = useState([]);

    //Fetch the data from Web API
    useEffect(() =>
    {
        axios.get(
            'https://api.themoviedb.org/3/movie/now_playing?api_key=fa8d56f996704d9cfc741c662920e342&language=en-US&page=1&region=CA'
        )
        .then(response => {
            setMovies(response.data.results);
        })
        .catch(error => {
            console.log(error);
        });
    }, []);

    //Movie Item Component
    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={ styles.itemContainer }
            onPress={ () => navigation.navigate('MovieDetailsScreen', { movie: item }) }
        >
            <View style={ styles.subContainer }>
                <Text style={ styles.title }>{ item.title }</Text>
                <Text style={ styles.releaseDate }>Release Date: { item.release_date }</Text>
            </View>
            <View style={ styles.iconContainer}>
                <AntDesign name="rightcircleo" size={ 24 } color="black" style={ styles.iconStyle } />
            </View>
        </TouchableOpacity>
    );
    
    return (
        <View>
            <Text style={ styles.textStyle }>Now Playing</Text>
            {/* Movies list */}
            <FlatList
                data={ movies }
                renderItem={ renderItem }
                keyExtractor={ item => item.id.toString() }
                contentContainerStyle={styles.flatListStyle}
            />
        </View>
        );
};

//Style sheet
const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      flex:1
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      width: '100%',
    },
    subContainer: {
        flex: 9
    },
    textStyle: {
        fontSize: 26,
        textAlign: 'center',
        paddingVertical: 5,  
    },
    flatListStyle: {
        paddingBottom:50
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      maxWidth: '100%',
      marginBottom: 5,
    },
    releaseDate: {
      fontSize: 14,
      color: '#666',
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding:10,
        flex: 1
    }
  });
  
export default MovieList;