import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform, StyleSheet,} from "react-native";
import {registerUser} from '../api/auth';
import DateTimePicker from "@react-native-community/datetimepicker"
import InputField from '../components/InputField';

export default function RegisterScreen({navigation}){

  const [errors, setErrors] = useState({});
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleRegister = async () =>{

    setErrors({});
    if (password !== confirmPassword) {
      setErrors({
          confirmPassword: "Passwords do not match"
      });
    return;
    }
    try {
      const formattedDate = new Date().toLocaleDateString("en-CA")
      await registerUser(
        first_name,
        last_name,
        email,
        username,
        password,
        formattedDate,
      );
      alert("Registration Successful");

      navigation.replace("Login")
    } catch(errorData) {
      let newErrors = {};

      for (const field in errorData){
        if (Array.isArray(errorData[field])) {
          newErrors[field] = errorData[field][0];
        } else {
          newErrors[field] = errorData[field];
        }
      }
      
      setErrors(newErrors)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>

        <Text style={styles.title}>Create Account</Text>

        <InputField
          label="Username"
          value={username}
          onChangeText={setUsername}
          error={errors.username}
        />

        <InputField
          label="First Name"
          value={first_name}
          onChangeText={setFirstName}
        />

        <InputField 
          label='Last Name'
          value={last_name}
          onChangeText={setLastName}
        />

        <InputField
          label='Email'
          keyboardType='email-address'
          autoCapitalize='none'
          value={email}
          onChangeText={setEmail}
          error={errors.email}
        />

        <InputField
        label='Password'
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
        />

        <InputField
          label="Confirm Password"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          error={errors.confirmPassword}
        />

        <TouchableOpacity style={styles.dateButton}
        onPress={() => setShowPicker(true)}>
          <Text style={styles.dateText}>
            {date.toLocaleDateString()}
          </Text>
        </TouchableOpacity>
        {errors.date_of_birth && (
          <Text style={styles.errorText}>
            {errors.date_of_birth}
          </Text>
        )}
        {
          showPicker && (
            <DateTimePicker value={date}
            mode='date'
            display='default'
            maximumDate={new Date()}
            onChange = {(event, selectedData) =>{
              setShowPicker(false);

              if (selectedData){
                setDate(selectedData);
              }
            }}
            />
          )
        }
        <TouchableOpacity style={styles.registerButton}
        onPress={handleRegister}>

          <Text style={styles.registerButtonText}> Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={ () => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>
            Already have an account? Login
          </Text>
                    
        </TouchableOpacity>
      </View>


    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  }, 
  card: {
      width: "100%",
      maxWidth: 400,
      backgroundColor: "#fff",
      padding: 25,
      borderRadius: 15,

      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 3,
      },
      shadowOpacity: 0.1,
      shadowRadius: 6,

      elevation: 5,
  },

  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 5,
  },
  title: {
      fontSize: 28,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 25,
  },

  input: {
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 10,
      padding: 12,
      marginBottom: 12,
  },

  dateButton: {
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 10,
      padding: 14,
      marginBottom: 20,
  },

  dateText: {
      color: "#444",
  },

  registerButton: {
      backgroundColor: "#000",
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
  },

  registerButtonText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 16,
  },

  loginLink: {
      textAlign: "center",
      marginTop: 15,
  },
})

