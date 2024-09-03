import { View, Text, ScrollView, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from '../../constants';
import FormField from "../../components/FormField";
import CustomButton from '../../components/CustomButton';
import { useState } from "react";
import { Link, router } from "expo-router";
import { signIn } from "../../lib/appwrite";

const SignIn = () => {
   const [form, setForm] = useState({
      email: '',
      password: '',
   });
   const [isSubmitting, setIsSubmitting] = useState(false);
   
   
   const onSubmit = async () => {
      if(!form.email || !form.password) {
         Alert.alert('Cannot Create Account', 'Please fill in all fields');
         return
      };
      setIsSubmitting(true);

      try {
         await signIn(form.email, form.password);
         // TODO: set to global state

         router.replace('/home');
      } catch(error) {
         Alert.alert('Error', error.message);
         setIsSubmitting(false);
      }
   }
   return (
      <SafeAreaView className={"bg-primary h-full"}>
         <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
         <View className="min-h-[85vh] justify-center px-4 my-4">
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