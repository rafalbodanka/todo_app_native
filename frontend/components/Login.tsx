import { Input } from '@rneui/themed';
import { useRef, useState } from 'react';
import { View, Text, TextInput, Button } from "react-native";
import { TouchableHighlight } from 'react-native-gesture-handler';
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from '@expo/vector-icons/Entypo';
import { router, useNavigation } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppDispatch } from '../redux/hooks';
import { setIsLoggedIn } from '../redux/auth';
import { useTheme } from '@react-navigation/native';
export default function Login() {

    const [emailInputValue, setEmailInputValue] = useState("")
    const [passwordInputValue, setPasswordInputValue] = useState("")
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const dispatch = useAppDispatch()
    const theme = useTheme();
    const passwordInputRef = useRef(null)
    const handleChangePasswordVisibility = () => {
        setPasswordVisible(prev => !prev)
      };
      const [isEmailValid, setIsEmailValid] = useState(true);
      const [isPasswordValid, setIsPasswordValid] = useState(true);
      const [invalidEmailMessage, setInvalidEmailMessage] =
      useState("Invalid email");
      const [invalidPasswordMessage, setInvalidPasswordMessage] = useState(
        "Password must have 8-30 characters"
      );

      const validateLoginData = (
        email: string,
        password: string
      ) => {
        let isValid = true;

        //email validation
        if (
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
          email.length < 5 ||
          email.length > 100
        ) {
          setInvalidEmailMessage("Invalid email");
          setIsEmailValid(false);
          isValid = false;
        }
        if (email.length < 1) {
          setInvalidEmailMessage("Email field can't be empty");
          setIsEmailValid(false);
          isValid = false;
        }
    
        //password validation
        if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password) === false) {
          setInvalidPasswordMessage(
            "Enter least one number and one special character"
          );
          setIsPasswordValid(false);
          isValid = false;
        }
        if (password.length < 8 || password.length > 30) {
          setInvalidPasswordMessage(
            "Password must have 8-30 characters, one number and one special character"
          );
          setIsPasswordValid(false);
          isValid = false;
        }
        return isValid;
      };

    const API_URL = process.env.EXPO_PUBLIC_API_URL
    const handleLogin = async () => {
      const isLoginDataValid = validateLoginData(
        emailInputValue,
        passwordInputValue
      );
      if (!isLoginDataValid) return;
        try {
            const response = await axios.post(
              `${API_URL}/users/login`,
              {
                email: emailInputValue,
                password: passwordInputValue,
              },
              { withCredentials: true }
            );
            if (response.status === 200) {
            const receivedCookie = response.headers['set-cookie']
            if (!receivedCookie) throw Error
            const [cookieName, cookieValue] = receivedCookie.toString().split(';')[0].split('=');
              try {
                await AsyncStorage.setItem(cookieName, cookieValue);
              } catch (e) {
              }
              router.replace('/')
            }
        } catch (err) {
          setInvalidPasswordMessage("Invalid credentials.")
          setIsPasswordValid(false)
        }
    }

    return (
        <SafeAreaView className='h-full' style={{backgroundColor: theme.colors.background}}>
            <View className="flex justify-center items-center w-full mt-20">
                <View className="w-3/5">
                <Input placeholder='Email'
                errorMessage={!isEmailValid ? invalidEmailMessage : ""}
                inputStyle={{color: theme.colors.text}}
                onChangeText={(val) => {
                  setEmailInputValue(val)
                  setIsEmailValid(true)
                }
                }>
                </Input>
                    <View className='relative'>
                        <Input ref={passwordInputRef} placeholder='Password'
                        errorMessage={!isPasswordValid ? invalidPasswordMessage : ""}
                        inputStyle={{color: theme.colors.text}}
                        secureTextEntry={!isPasswordVisible} textContentType='password'
                        onChangeText={(val) => {
                          setPasswordInputValue(val)
                          setIsPasswordValid(true)
                        }}
                        spellCheck={false}
                        >
                        </Input>
                        <View className='absolute right-0 top-0 h-3/4 px-2 flex translate-x-8 flex-col justify-center items-center'>
                            <TouchableHighlight onPress={handleChangePasswordVisibility}>
                                <Ionicons name={isPasswordVisible ? "eye-with-line" : "eye"} size={20} className='' color={theme.colors.text}></Ionicons>
                            </TouchableHighlight>
                        </View>
                    </View>
                    <Button title={"Log in"} color={"#311B92"} onPress={handleLogin}></Button>
                </View>
            </View>
        </SafeAreaView>
    )
}