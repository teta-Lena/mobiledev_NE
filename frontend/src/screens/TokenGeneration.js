import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Button, Icon } from "react-native-elements";
import { Formik } from "formik";
import * as yup from "yup";
import * as SecureStore from "expo-secure-store";
import API_URL from "../utils/requestHandling";

const validTokenGeneration = yup.object().shape({
  amount: yup.number().required("Enter your amount"),
  meter_number: yup
    .string("Meter number should be a string")
    .required("Enter the meter number"),
});

const TokenGeneration = ({ navigation }) => {
  const [error, setError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  return (
    <View>
      <View className="h-full bg-[#1a3788]">
        <Formik
          validationSchema={validTokenGeneration}
          initialValues={{
            amount: "",
            meter_number: "",
          }}
          onSubmit={async (values) => {
            try {
              setisLoading(true);
              const res = await fetch(`${API_URL}/api/v1/u/login`, {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                  "Content-Type": "application/json", // Set the content type header
                },
              });

              const result = await res.json();

              if (result.error) {
                setisLoading(false);
                console.log("Error");
                setError(result.error);
                return;
              } else {
                if (result.user.role != "voter") {
                  setError("You are not allowed to use our app");
                  // navigation.navigate("Welcome")
                  setisLoading(false);
                  return error;
                }
                await SecureStore.setItemAsync("token", result.token);
                setisLoading(false);
                const user = JSON.stringify(values);
                navigation.navigate("Dashboard", {
                  token: result.token,
                  user: result.user,
                });
              }
            } catch (e) {
              console.log(e);
              setError(e.message);
            }
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            touched,
            values,
            errors,
            isValid,
          }) => (
            <>
              <View className="container mt-28 h-full w-full bg-white rounded-t-3xl">
                <View className="items-center">
                  <Text className="text-xl font-bold mt-2">Login</Text>
                  <Text className="text-gray-400 mt-1">
                    Sign in to continue...
                  </Text>
                </View>
                <View className="mt-8">
                  <View className="mt-2 w-full h-full">
                    <View className="items-center w-full  my-1">
                      <TextInput
                        name="amount"
                        onBlur={handleBlur("amount")}
                        value={values.amount}
                        onChangeText={handleChange("amount")}
                        placeholder="Enter your amount(RWF)"
                        className="rounded border-2 border-gray-200 py-2 text-left px-4 w-[90%]"
                      />
                      {errors.amount && touched.amount && (
                        <Text className="text-red-700">{errors.amount}</Text>
                      )}
                    </View>

                    <View className="items-center w-full  my-1">
                      <TextInput
                        onBlur={handleBlur("meter_number")}
                        onChangeText={handleChange("meter_number")}
                        name="meter_number"
                        value={values.meter_number}
                        placeholder="Enter your meter number"
                        className="rounded border-2 border-gray-200 py-2 text-left px-4 w-[90%]"
                      />
                      {errors.meter_number && touched.meter_number && (
                        <Text className="text-red-700">
                          {errors.meter_number}
                        </Text>
                      )}
                    </View>

                    <View>
                      {error && (
                        <Text className="text-red-500 mt-2 mx-5 capitalize">
                          {error}
                        </Text>
                      )}
                    </View>

                    <View className="mx-5 mt-4 mb-2">
                      <Button
                        title={
                          isLoading ? (
                            <ActivityIndicator color={"#fff"} />
                          ) : (
                            "Log in"
                          )
                        }
                        buttonStyle={style.btn}
                        onPress={handleSubmit}
                        disabled={!isValid}
                      />
                    </View>

                    <View className="flex-row justify-center my-4">
                      <Text> Don't have an account ....</Text>
                      <Text
                        className="text-blue-800"
                        onPress={() => navigation.navigate("Register")}
                      >
                        Register
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              {/* </View> */}
            </>
          )}
        </Formik>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  btn: {
    backgroundColor: "#1a3788",
    color: "white",
    margin: 10,
  },
});

export default TokenGeneration;
