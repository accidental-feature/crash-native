import { View, Text, Image, TouchableOpacity } from "react-native";
import { icons } from "../constants";
import { useState } from "react";
import { Video, ResizeMode } from "expo-av";

const VideoCard = ({ 
   post: { title, thumbnail, video, 
   creator: { username, avatar }}
}) => {
   const [ playing, setPlaying ] = useState(false);
  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
         <View className="justify-center items-center flex-row flex-1">
            <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
               <Image
                  source={{ uri: avatar }}
                  className="w-full h-full rounded-lg"
                  resizeMode="cover"
               />
            </View>
            <View className="flex-1 ml-3 gap-y-1 justify-center">
               <Text className="text-white text-sm" numberOfLines={1}>
                  {title}
               </Text>
               <Text className="text-gray-100 text-xs font-pregular" numberOfLines={1}>
                  {username}
               </Text>
            </View>
         </View>
         
         <View className="pt-2">
            <Image
               source={icons.menu}
               className="w-5 h-5"
               resizeMode="contain"
            />
         </View>
      </View>

      {playing ? (
         <Video 
            source={{ uri: video }}
            className="w-full h-60 rounded-xl mt-3"
            resizeMode={ResizeMode.CONTAIN}
            shouldPlay
            useNativeControls
            onPlaybackStatusUpdate={(status) => {
               if(status.didJustFinish)  {
                  setPlay(false);
               }
            }}
         />
      ): (
         <TouchableOpacity 
            className="w-full max-h-72 rounded-xl relative justify-center items-center"
            activeOpacity={0.7}
            onPress={() => setPlaying(true)}
         >
            <Image
               source={{ uri: thumbnail }}
               className="w-full h-full mt-3"
               resizeMode="cover"
            />
            <Image
               source={icons.play}
               className="w-12 h-12 absolute"
               resizeMode="contain"
            />
         </TouchableOpacity>
      )}
    </View>
  );
};
export default VideoCard;