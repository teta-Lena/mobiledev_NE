import React from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
const Dashboard = ({ navigation }) => {
  const token = navigation.getParam("token");
  const user = navigation.getParam("user");
  const handleLogout = async (e) => {
    await SecureStore.deleteItemAsync("token");
    navigation.navigate("Login");
  };
  return (
    <View className="my-auto">
      <Text className=" text-center font-bold text-xl">
        Welcome {"  "}
        <Text className="text-[#1a3788]">
          {user.firstname + " " + user.lastname}
        </Text>
      </Text>

      <View className="w-full items-center">
        <Button
          title="See your token history"
          onPress={() => navigation.navigate("VotingScreen")}
          buttonStyle={styles.btn}
        />
        <Button
          title="Generate New Token"
          onPress={() => navigation.navigate("GenerateToken")}
          buttonStyle={styles.btn}
        />
        <Button
          title="Logout"
          onPress={handleLogout}
          buttonStyle={styles.btn}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#1a3788",
    color: "white",
    margin: 10,
  },
});

export default Dashboard;
