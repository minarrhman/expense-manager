import React, {useState, useRef, useEffect} from "react";
import {View, Animated, Image, StyleSheet} from "react-native";
import { getToken } from "../utils/storage";

export default function SplashScreen({navigation}) {
    const fadeAnim = useRef( new Animated.Value(0)).current;

    useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          if (token) {
            navigation.replace("Main");
          } else {
            navigation.replace("Login");
          }
        }, 300);
      });
    };

    checkAuth();
  }, []);

    return (
        <View style={styles.container}>
            <Animated.Image
            source={require("../../assets/logo.png")}
            style={
                [
                    styles.logo,
                    {
                        opacity: fadeAnim,
                    },
                ]
            }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    logo:{
        width:220,
        height: 220,
        resizeMode: "contain"
    },
});