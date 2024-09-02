import { View, Text, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from '../../constants';
import FormField from "../../components/FormField";
import CustomButton from '../../components/CustomButton';
import { useState } from "react";
import { Link } from "expo-router";

const SignIn = () => {
   const [form, setForm] = useState({
      email: '',
      password: '',
   });
   const [isSubmitting, setIsSubmitting] = useState(false);
   
   
   const onSubmit = () => {
      console.log(form);
   }
   return (
      <SafeAreaView className={"bg-primary h-full"}>
         <ScrollView>
         <View className="h-[85vh] justify-center px-4 my-4">
            <Image source={images.logo} resizeMode="contain" className="w-[115px] h-[35px]" />
            <Text className='text-2xl text-white mt-10 font-psemibold'>Log in to Crash</Text>

            <FormField
               label="Email"
               placeholder="NotBruceWayne@dc.com"
               value={form.email}
               handleChangeText={(e) => setForm({ ...form, email: e })}
               otherStyles='mt-7'
               keyboardType="email-address"
            />
            <FormField
               label="Password"
               value={form.password}
               handleChangeText={(e) => setForm({ ...form, password: e })}
               otherStyles='mt-7'
            />

            <CustomButton 
               title="Sign in"
               handlePress={onSubmit}
               containerStyles='mt-7'
               isLoading={isSubmitting}
            />

            <View className="flex-row justify-center gap-2 pt-5">
               <Text className='text-lg text-gray-100 font-pregular'>
                  Don't have an account?
               </Text>

               <Link className="text-lg font-psemibold text-secondary-100" href="/sign-up">Sign Up</Link>
            </View>
         </View>
         </ScrollView>
      </SafeAreaView>
   )
};
export default SignIn;