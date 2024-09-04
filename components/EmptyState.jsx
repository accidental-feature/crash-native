import { View, Text, Image } from "react-native";
import { router } from "expo-router";
import { images } from "../constants";
import CustomButton from "./CustomButton";

const EmptyState = ({ title, subTitle }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image 
        source={images.empty}
        className="w-[270px] h-[250px]"
        resizeMode="contain"
      />

      <Text className="text-xl font-psemibold text-white mt-2 text-center">
        {title}
      </Text>
      <Text className="text-sm text-gray-100 font-pmedium">
        {subTitle}
      </Text>

      <CustomButton 
        title="Create Video"
        handlePress={() => router.push('/create')}
        containerStyles="my-5 w-full"
      />
    </View>
  );
};
export default EmptyState;