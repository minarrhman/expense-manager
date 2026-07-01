import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

export default function TransactionCardDetailed({transaction, onPress}) {

    return (

        <TouchableOpacity style={styles.card}
        onPress={()=>onPress(transaction)}>

            <View>

                <Text style={styles.category}>
                    {transaction.category_name}
                </Text>

                <Text style={styles.description}>
                    {transaction.description}
                </Text>

                <Text style={styles.date}>
                    {transaction.date}
                </Text>

            </View>

            <Text
                style={[
                    styles.amount,
                    {
                        color:
                        transaction.type==="income"
                        ? "green"
                        : "red"
                    }
                ]}
            >

                {transaction.type==="income" ? "+" : "-"}৳
                {transaction.amount}

            </Text>

        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({

    card:{
        backgroundColor:'#fff',
        borderRadius:15,
        padding:15,
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:12
    },

    category:{
        fontSize:16,
        fontWeight:'600'
    },

    description:{
        color:'#666',
        marginTop:4
    },

    date:{
        marginTop:8,
        color:'#999',
        fontSize:12
    },

    amount:{
        fontSize:17,
        fontWeight:'bold'
    }

})