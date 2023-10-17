import { useRef, useState } from 'react';
import { View, Text, TextInput, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input } from '@rneui/themed';
import Ionicons from '@expo/vector-icons/Entypo';
import { TouchableHighlight } from 'react-native';
import axios from 'axios';
import { router } from 'expo-router';
import { useTheme } from '@react-navigation/native';

export default function SignUp() {

  const theme = useTheme()

    const [firstNameInputValue, setFirstNameInputValue] = useState("")
    const [lastNameInputValue, setLastNameInputValue] = useState("")
    const [emailInputValue, setEmailInputValue] = useState("")
    const [passwordInputValue, setPasswordInputValue] = useState("")
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [isRegisteredSuccesfully, setIsRegisteredSuccesfully] = useState(false)

  // register form validation
  const [isFirstNameValid, setIsFirstNameValid] = useState(true);
  const [isLastNameValid, setIsLastNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [invalidFirstNameMessage, setInvalidFirstNameMessage] =
    useState("Invalid first name");
  const [invalidLastNameMessage, setInvalidLastNameMessage] = useState(
    "Last name must have 8-30 characters"
  );
  const [invalidEmailMessage, setInvalidEmailMessage] =
    useState("Invalid email");
  const [invalidPasswordMessage, setInvalidPasswordMessage] = useState(
    "Password must have 8-30 characters"
  );

  const validateRegisterData = (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    let isValid = true;

    //first name validation
    if (!/^[\p{L}'][ \p{L}'-]*[\p{L}]$/u.test(firstName)) {
      setInvalidFirstNameMessage("First name should contain only letters");
      setIsFirstNameValid(false);
      isValid = false;
    }
    if (firstName.length < 1) {
      setInvalidFirstNameMessage("First name is too short");
      setIsFirstNameValid(false);
      isValid = false;
    }
    if (firstName.length > 46) {
      setInvalidFirstNameMessage("First name is too long.");
      setIsFirstNameValid(false);
      isValid = false;
    }
    //last name validation
    if (!/^[\p{L}'][ \p{L}'-]*[\p{L}]$/u.test(lastName)) {
      setInvalidLastNameMessage("Last name should contain only letters");
      setIsLastNameValid(false);
      isValid = false;
    }
    if (lastName.length < 1) {
      setInvalidLastNameMessage("Last name is too short");
      setIsLastNameValid(false);
      isValid = false;
    }
    if (lastName.length > 46) {
      setInvalidLastNameMessage("First name is too long.");
      setIsLastNameValid(false);
      isValid = false;
    }

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


  const handleRegister = async () => {
    const isRegisterDataValid = validateRegisterData(
      firstNameInputValue,
      lastNameInputValue,
      emailInputValue,
      passwordInputValue
    );
    if (!isRegisterDataValid) return;
    try {
      const response = await axios.post("http://192.168.100.176:5000/users/signup", {
        firstName: firstNameInputValue,
        lastName: lastNameInputValue,
        email: emailInputValue,
        password: passwordInputValue,
      });
      
      if (response.status === 201) {
        setIsRegisteredSuccesfully(true);
      }
    } catch (err: any) {
    }
  };


    const passwordInputRef = useRef(null)
    const handleChangePasswordVisibility = () => {
        setPasswordVisible(prev => !prev)
      };

    return (
        <SafeAreaView>
            <View className="flex justify-center items-center w-full mt-20">
                <View className="w-3/5">
                  {!isRegisteredSuccesfully ?
                  <>
                    <Input placeholder='First name' inputStyle={{color: theme.colors.text}}
                    errorMessage={!isFirstNameValid ? invalidFirstNameMessage : ""} textContentType='name'
                    onChangeText={(val) => {
                      setFirstNameInputValue(val)
                      setIsFirstNameValid(true)
                      }}>
                    </Input>
                    <Input placeholder='Last name' inputStyle={{color: theme.colors.text}}
                    errorMessage={!isLastNameValid ? invalidLastNameMessage : ""}
                    textContentType='familyName'
                    onChangeText={(val) => {
                      setLastNameInputValue(val)
                      setIsLastNameValid(true)
                      }}>
                    </Input>
                    <Input placeholder='Email' inputStyle={{color: theme.colors.text}}
                    errorMessage={!isEmailValid ? invalidEmailMessage : ""}
                    onChangeText={(val) => {
                      setEmailInputValue(val)
                      setIsEmailValid(true)
                      }}>
                    </Input>
                    <View className='relative'>
                        <Input ref={passwordInputRef} placeholder='Password'
                        inputStyle={{color: theme.colors.text}} secureTextEntry={!isPasswordVisible}
                        errorMessage={!isPasswordValid ? invalidPasswordMessage : ""}
                        textContentType='password'
                        onChangeText={(val) => {
                          setPasswordInputValue(val)
                          setIsPasswordValid(true)
                          }}>
                        </Input>
                        <View className='absolute right-0 top-0 h-3/4 flex px-2 translate-x-8 flex-col justify-center items-center'>
                            <TouchableHighlight onPress={handleChangePasswordVisibility}>
                                <Ionicons name={isPasswordVisible ? "eye-with-line" : "eye"} size={20} className='' color={theme.colors.text}></Ionicons>
                            </TouchableHighlight>
                        </View>
                    </View>
                    <Button title={"Sign up"} color={"#311B92"} onPress={handleRegister}></Button>
                  </>
                  :
                  <View>
                    <Text className='text-[#F2F2F2] text-center'>Account created succesfully.</Text>
                    <Text className='text-[#F2F2F2] text-center my-4'>You can now log in.</Text>
                    <Button title={"OK"} color={"#311B92"} onPress={()=> router.back()}></Button>
                  </View>
                  }
                </View>
            </View>
        </SafeAreaView>
    )
}