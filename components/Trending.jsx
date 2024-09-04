import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ImageBackground } from "react-native";
import * as Animatable from 'react-native-animatable';
import { icons } from "../constants";
import { ResizeMode, Video } from 'expo-av';

const zoomIn = {
   0: { scale: 0.9 },
   1: { scale: 1 }
}

const zoomOut = {
   0: { scale: 1 },
   1: { scale: 0.9 }
}

const TrendingItem = ({ activeItem, item, onPress }) => {
  const [ play, setPlay ] = useState(false);

  return (
    <Animatable.View 
      className='mr-5' 
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      <TouchableOpacity 
        activeOpacity={0.7}
        onPress={() => {
          setPlay(!play);
          onPress(item.$id);
        }}
      >
        <View className="w-52 h-72 rounded-[35px] overflow-hidden">
          {play ? (
            <Video 
               source={{ uri: item.video }}
               className="w-52 h-72 rounded-[35px] mt-3 bg-white/10"
               resizeMode={ResizeMode.CONTAIN}
               shouldPlay
               useNativeControls
               onPlaybackStatusUpdate={(status) => {
                  if(status.didJustFinish)  {
                     setPlay(false);
                  }
               }}
            />
          ) : (
            <TouchableOpacity 
               className="relative justify-center items-center"
               onPress={() => setPlay(!play)}
               activeOpacity={0.7}
            >
               <ImageBackground
               source={{ uri: item.thumbnail }}
               className="w-full h-full"
               resizeMode="cover"
               />

               <Image
                  source={icons.play}
                  className="w-10 h-10 absolute"
                  resizeMode="contain"
               />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );
};

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[1]?.$id);
  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  }

  return (
    <View>
      <FlatList 
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <TrendingItem 
            activeItem={activeItem} 
            item={item} 
            onPress={(id) => setActiveItem(id)}
          />
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
        contentOffset={{ x: 170 }}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Trending;