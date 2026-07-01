import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';

export default function FilterTabs({selected, setSelected}) {

    const tabs = ['all','income','expense'];

    return (
        <View style={styles.container}>

            {tabs.map(tab => (

                <TouchableOpacity
                    key={tab}
                    style={[
                        styles.button,
                        selected===tab && styles.activeButton
                    ]}
                    onPress={()=>setSelected(tab)}
                >

                    <Text
                        style={[
                            styles.text,
                            selected===tab && styles.activeText
                        ]}
                    >
                        {tab.charAt(0).toUpperCase()+tab.slice(1)}
                    </Text>

                </TouchableOpacity>

            ))}

        </View>
    )
}

const styles = StyleSheet.create({

    container:{
        flexDirection:'row',
        gap:10,
        marginBottom:15
    },

    button:{
        flex:1,
        padding:10,
        alignItems:'center',
        borderRadius:10,
        backgroundColor:'#fff'
    },

    activeButton:{
        backgroundColor:'#4F46E5'
    },

    text:{
        color:'#555'
    },

    activeText:{
        color:'#fff',
        fontWeight:'600'
    }

})