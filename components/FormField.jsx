import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { icons } from "../constants";

const FormField = ({ label, placeholder, value, handleChangeText, otherStyles = '', ...props }) => {
   const [showPassword, setShowPassword] = useState(false);
   
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='text-base text-gray-100 font-pmedium'>{label}</Text>

      <View 
         className={`
            w-full h-16 px-4 rounded-2xl
            bg-black-100 border-2 border-black-200
            focus:border-secondary-100
            flex-row items-center
         `}
      >
         <TextInput
            value={value}
            onChangeText={handleChangeText}
            className='flex-1 text-white text-base font-pmedium'
            placeholder={placeholder}
            placeholderTextColor='#7b7b8b'
            secureTextEntry={label === 'Password' && !showPassword}
         />
         {label === 'Password' && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
               <Image
                  source={showPassword ? icons.eyeHide : icons.eye}
                  className='w-6 h-6'
                  resizeMode="contain"
               />
            </TouchableOpacity>
         )}
      </View>
    </View>
  );
};
export default FormField;