import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator, Text } from "react-native";
import { Button } from "react-native-elements";
import API_URL from "../utils/requestHandling";
// import axios from "axios";

const AllUsers = ({ navigation }) => {
  const [error, setError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [user, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      setisLoading(true);
      const res = await axios.get(`${API_URL}/api/v1/u/users`);
      // const res = await fetch("http://192.168.0.2:3000/api/v1/u/users");
      const data = await res.json();
      setUsers(data.users);
      console.log(data);
      setisLoading(false);
    } catch (error) {
      setError("An error occurred while fetching users.");
      console.log(error);
      setisLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <View className="mt-10">
      {isLoading ? (
        <ActivityIndicator color={"#000"} />
      ) : (
        <FlatList
          data={user}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => {
            return (
              <View className="bg-blue-400 flex flex-col">
                <View className="mb-2 bg-black py-4 px-2">
                  <Text className="text-center text-white font-bold">
                    {item.firstname}
                  </Text>
                  <Text className="text-center text-white font-bold">
                    {item.lastname}
                  </Text>
                  <Text className="text-center text-white font-bold">
                    {item.email}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      )}
      <View>
        <Button
          title="Go to Voting screen"
          onPress={() => {
            navigation.navigate("Vote");
          }}
        />
      </View>
    </View>
  );
};

export default AllUsers;
