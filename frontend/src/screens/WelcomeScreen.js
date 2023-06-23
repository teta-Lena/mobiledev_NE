import React from "react";
import { View, Text } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
const WelcomeScreen = ({ navigation }) => {
  const onSwipeRight = () => {
    navigation.navigate("Login");
  };
  return (
    <PanGestureHandler onGestureEvent={onSwipeRight}>
      <View className="container flex justify-center bg-white w-full h-full">
        <Text className="text-black font-bold  text-center text-2xl">
          Welcome to the EUCL app!
        </Text>
        <Text className="text-center text-blue-400 mt-3">
          Swipe right to get started
        </Text>
      </View>
    </PanGestureHandler>
  );
};

export default WelcomeScreen;
