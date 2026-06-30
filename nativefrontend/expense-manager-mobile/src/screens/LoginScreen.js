import React,{useState} from 'react';
import {
    View, Text, TextInput,TouchableOpacity, StyleSheet
} from 'react-native';
import loginUser  from "../api/auth"
import {saveToken} from "../utils/storage"



export default function LoginScreem({ navigation }){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
      try {
        const data = await loginUser(username, password);

      await saveToken(data.access);

      navigation.replace("Main");
    }catch(error){
      console.log(error);
      alert("Invalid Credentials")
    }
    };



return (
    <View style={styles.container}>
        <Text style={styles.title}>Expense Flow</Text>

        <Text style={styles.subtitle}>Welcome</Text>

        <TextInput
        style={styles.input}
        placeholder='Username'
        value={username}
        onChangeText={setUsername}
        />

        <TextInput
        style={styles.input}
        placeholder='Password'
        value={password}
        secureTextEntry={true}
        onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>
                Login
            </Text>

        </TouchableOpacity>

        <View style={styles.registerContainer}>
            <Text>
                Don't have an account?
            </Text>

            <TouchableOpacity onPress={()=>{
                navigation.navigate('Register')
            }}>
                <Text style={styles.registerText}>
                    Register
                </Text>
                
            </TouchableOpacity>
        </View>

    </View>
)}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
    backgroundColor: "#ffffff",
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    textAlign: "center",
    marginBottom: 40,
    fontSize: 16,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 14,
    marginBottom: 15,
  },

  loginButton: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },

  registerText: {
    color: "#2563eb",
    fontWeight: "bold",
    marginLeft: 5,
  },
});
