import { Redirect, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import CustomButton from '../components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider';

export default function Index() {
   const { isLoading, isLoggedIn } = useGlobalContext();

   if(!isLoading && isLoggedIn) {
      return <Redirect href="/home" />
   }
   
   return (
     <SafeAreaView className='h-full bg-primary'>
      <ScrollView contentContainerStyle={{ height: '100%' }}>
         <View className='w-full h-[85vh] items-center justify-center px-4'>
            <Image source={images.logo} className='w-[130px] h-[80px]' resizeMode='contain' />

            <Image 
               source={images.cards} 
               className='max-w-[380px] w-full max-h-[300px]' 
               resizeMode='contain' 
            />

            <View className='relative mt-5'>
               <Text className='text-3xl font-bold text-white text-center'>
                  Discover Endless Possibilities with {' '}<Text className='text-secondary-200'>Crash</Text>
               </Text>
               <Image 
                  source={images.path} 
                  className='w-[136px] h-[15px] absolute -bottom-2 -right-8' 
                  resizeMode='contain'
               />
            </View>

            <Text className='text-sm font-pregular text-gray-100 mt-7 text-center'>
               Where creativity meets innovation: embark on a journey of limitless exploration with Crash
            </Text>

            <CustomButton 
               title='Continue with email'
               handlePress={() => router.push('/sign-in')}
               containerStyles='w-full mt-7'
            />

            <StatusBar backgroundColor='#161622' style='light' />
         </View>
      </ScrollView>
     </SafeAreaView>
   );
}