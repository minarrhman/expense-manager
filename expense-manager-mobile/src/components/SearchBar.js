import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

export default function SearchBar({value, onChange}) {

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Search transactions..."
                value={value}
                onChangeText={onChange}
                style={styles.input}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginBottom:15
    },

    input:{
        backgroundColor:"#fff",
        borderRadius:12,
        paddingHorizontal:15,
        height:50
    }
})