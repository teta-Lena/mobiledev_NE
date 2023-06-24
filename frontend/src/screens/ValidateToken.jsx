import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Button } from "react-native-elements";
import { Field, Formik } from "formik";
import * as yup from "yup";
import CustomInput from "../components/CustomInput";

import API_URL from "../utils/requestHandling";

const validToken = yup.object().shape({
  token: yup.number().required(),
});
const ValidateToken = ({ navigation }) => {
  const [error, setError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [days, setDays] = useState("");
  return (
    <ScrollView className="mt-20">
      <SafeAreaView>
        <Formik
          validationSchema={validToken}
          initialValues={{
            token: "",
          }}
          onSubmit={async (values) => {
            try {
              setisLoading(true);
              const res = await fetch(`${API_URL}/api/tokens/validate-token`, {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                  "Content-Type": "application/json",
                },
              });
              const result = await res.json();
              console.log(result);
              if (result.error) {
                setError(result.error);
                return console.log(result.error);
              } else {
                setisLoading(false);
                setDays(result.days);
              }
            } catch (e) {
              console.log(e);
              setError(e.message);
            }
          }}
        >
          {({ handleSubmit, isValid }) => (
            <>
              <View className="items-center w-full mt-30">
                <Field
                  component={CustomInput}
                  name="token"
                  placeholder="Enter your token"
                />
              </View>
              <Button
                title="Validate Token"
                buttonStyle={styles.btn}
                onPress={handleSubmit}
                disabled={!isValid}
              />
              <Button
                title="View Tokens History"
                buttonStyle={styles.btns}
                onPress={() => navigation.navigate("ViewTokens")}
              />
              <View>
                {error && (
                  <Text className="text-red-500 mt-2 mx-5 capitalize">
                    {error}
                  </Text>
                )}
              </View>
              {days && (
                <View className="mt-20 w-full">
                  <Text className="text-center  font-bold">
                    Your token is valid for {days} days
                  </Text>
                </View>
              )}
            </>
          )}
        </Formik>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: "#1a3788",
    margin: 5,
  },
  btns: {
    width: "70%",
    borderRadius: 5,
    backgroundColor: "#1a3788",
    margin: 5,
  },
});
export default ValidateToken;
