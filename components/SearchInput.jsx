import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { icons } from "../constants";
// TODO: Text center better solution
const SearchInput = ({ label, placeholder, value, handleChangeText, otherStyles = '', ...props }) => {
   const [showPassword, setShowPassword] = useState(false);
   
  return (
   <View 
      className={`
         w-full h-16 px-4 rounded-2xl
         bg-black-100 border-2 border-black-200
         focus:border-secondary-100
         flex-row items-center space-x-4
      `}
   >
      <TextInput
         value={value}
         onChangeText={handleChangeText}
         className='flex-1 text-white text-base mt-0.5 font-pregular mb-5'
         placeholder={'Search for a video topic'}
         placeholderTextColor='#7b7b8b'
         secureTextEntry={label === 'Password' && !showPassword}
         {...props}
      />
      <TouchableOpacity>
         <Image
            source={icons.search}
            className='w-5 h-5'
            resizeMode="contain"
         />
      </TouchableOpacity>
   </View>
  );
};
export default SearchInput;