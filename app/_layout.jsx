import { SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import GlobalProvider from '../context/GlobalProvider';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
   const [fontsLoaded, error] = useFonts({
     Poppins: require('../assets/fonts/Poppins-Regular.ttf'),
     PoppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
     PoppinsMedium: require('../assets/fonts/Poppins-Medium.ttf'),
     PoppinsThin: require('../assets/fonts/Poppins-Thin.ttf'),
     PoppinsExtraLight: require('../assets/fonts/Poppins-ExtraLight.ttf'),
     PoppinsLight: require('../assets/fonts/Poppins-Light.ttf'),
     PoppinsSemiBold: require('../assets/fonts/Poppins-SemiBold.ttf'),
     PoppinsExtraBold: require('../assets/fonts/Poppins-ExtraBold.ttf'),
     PoppinsBlack: require('../assets/fonts/Poppins-Black.ttf')
   })

   useEffect(() => {
      if(error) throw error;
      if(fontsLoaded) SplashScreen.hideAsync();
      if(!fontsLoaded && !error) return;
   }, [fontsLoaded, error]);

  return (
   <GlobalProvider>
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* <Stack.Screen name="/search/[query]" options={{ headerShown: false }} /> */}
    </Stack>
    </GlobalProvider>
  );
}