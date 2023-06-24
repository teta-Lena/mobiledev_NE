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
import API_URL from "../utils/requestHandling";

const validTokenGeneration = yup.object().shape({
  amount: yup
    .number("Enter a valid value e.g:4000")
    .required("Enter your amount")
    .max(182500, "Amount is too large for a token"),
  meterNumber: yup
    .number()
    .required("Enter the meter number")
    .test(
      "length",
      "Meter number length must be equal to six",
      (value) => String(value).length === 6
    ),
});

const TokenGeneration = ({ navigation }) => {
  const [error, setError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [token, setToken] = useState("");
  const [success, setSuccess] = useState("");
  return (
    <View>
      <View className="h-full bg-[#1a3788]">
        <Formik
          validationSchema={validTokenGeneration}
          initialValues={{
            amount: "",
            meterNumber: "",
          }}
          onSubmit={async (values) => {
            try {
              setisLoading(true);

              const res = await fetch(`${API_URL}/api/tokens/generate-token`, {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                  "Content-Type": "application/json",
                },
              });

              const result = await res.json();
              console.log(result);

              if (result.error) {
                setisLoading(false);
                console.log("Error");
                setError(result.error);
                return error;
              } else {
                setisLoading(false);
                setToken(result.purchasedToken);
                navigation.navigate("ValidateToken");
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
                  <Text className="text-xl font-bold mt-2">Generate Token</Text>
                  <Text className="text-gray-400 mt-1">
                    Enter valid values to generate your token
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
                        onBlur={handleBlur("meterNumber")}
                        onChangeText={handleChange("meterNumber")}
                        name="meterNumber"
                        value={values.meterNumber}
                        placeholder="Enter your meter number"
                        className="rounded border-2 border-gray-200 py-2 text-left px-4 w-[90%]"
                      />
                      {errors.meterNumber && touched.meterNumber && (
                        <Text className="text-red-700">
                          {errors.meterNumber?.message}
                        </Text>
                      )}
                    </View>

                    <View>
                      {error ? (
                        <Text className="text-red-500 mt-2 mx-5 capitalize">
                          {error}
                        </Text>
                      ) : (
                        <View></View>
                      )}
                    </View>

                    <View className="mx-5 mt-4 mb-2">
                      <Button
                        title={
                          isLoading ? (
                            <ActivityIndicator color={"#fff"} />
                          ) : (
                            "GenerateToken"
                          )
                        }
                        buttonStyle={style.btn}
                        onPress={handleSubmit}
                        disabled={!isValid}
                      />
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
