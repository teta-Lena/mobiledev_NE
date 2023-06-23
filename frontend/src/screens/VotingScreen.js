import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
// import { Card } from "react-native-elements";
// import { Button } from "react-native-elements";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useIsFocused } from "@react-navigation/native";
import { Avatar, Card, Title, Paragraph, Button } from "react-native-paper";
import API_URL from "../utils/requestHandling";

const VotingScreen = ({ navigation }) => {
  const [user, setUser] = useState({});
  const [candidates, setCandidates] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const isFocused = useIsFocused();

  const getUserProfile = async () => {
    try {
      setisLoading(true);
      const token = await SecureStore.getItemAsync("token");
      //   console.log(token);
      if (!token) {
        return navigation.navigate("Login");
      }
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const res = await fetch(`${API_URL}/api/v1/u`, {
        headers: headers,
      });
      const candidateResults = await fetch(`${API_URL}/api/v1/c`, {
        headers: headers,
      });
      if (res.error || candidateResults.error) {
        setError(res.error || candidateResults.error);
        console.log(res.error);
        setisLoading(false);
        return;
      } else {
        const data = await res.json();
        const candidateData = await candidateResults.json();

        setCandidates(candidateData?.data?.docs || []);
        // console.log(candidates);
        setUser(data.user);
        setisLoading(false);
      }
    } catch (e) {
      setError(e.message);
    }
  };
  const handleVote = async (candidate) => {
    try {
      const token = await SecureStore.getItemAsync("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const body = JSON.stringify({ user: user._id, candidate });
      console.log(user._id);

      let response = await fetch(`${API_URL}/api/v1/v`, {
        method: "POST",
        body: body,
        headers: headers,
      });
      console.log(response);
      if (!response.ok) {
        const errorResponse = await response.json();
        setError(errorResponse.message || "Error occurred when voting");
        return error;
      }

      response = await fetch(`${API_URL}/api/v1/c`, {
        headers: headers,
      });

      const candidateData = await response.json();
      // console.log(candidateData);
      setCandidates(candidateData?.data?.docs || []);
    } catch (error) {
      setError(error.message || "Error occurred when voting");
    }
  };

  useEffect(() => {
    isFocused && getUserProfile();
  }, [isFocused]);

  return (
    <ScrollView>
      <View className="flex items-center mt-20">
        <Text className="text-md">Welcome to</Text>
        <Text className="text-blue-400 ">VMS</Text>
        {isLoading ? (
          <ActivityIndicator color="#000" />
        ) : (
          <Text className="font-bold my-2 text-md">
            {user.firstname + " " + user.lastname}
          </Text>
        )}
      </View>
      <SafeAreaView>
        {isLoading ? (
          <ActivityIndicator color="#000" className="mt-20" />
        ) : (
          <>
            {error && (
              <Text className="mt-4 text-red-500 text-center font-bold text-xl">
                {error}
              </Text>
            )}
            {candidates?.map((el) => (
              <View key={el._id}>
                <Card>
                  {el.profilePicture && el.profilePicture !== "" ? (
                    <Card.Cover source={{ uri: el.profilePicture }} />
                  ) : (
                    <View>
                      <Text>We are here</Text>
                    </View>
                  )}
                  <Card.Title
                    title={el.names}
                    subtitle={<Text>{el.total_votes || 0} votes</Text>}
                  />
                  <Card.Content>
                    <Paragraph>{el.missionStatement}</Paragraph>
                  </Card.Content>
                  <Card.Actions>
                    <Button
                      onPress={() => {
                        handleVote(el._id);
                      }}
                      style={styles.btn}
                    >
                      Vote
                    </Button>
                  </Card.Actions>
                </Card>
              </View>
            ))}
          </>
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: "30%",
    borderRadius: 5,
    backgroundColor: "#1a3788",
    margin: 5,
  },
});
export default VotingScreen;
