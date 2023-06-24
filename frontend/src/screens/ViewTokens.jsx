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
  meterNumber: yup
    .number()
    .required("Enter the meter number")
    .test(
      "length",
      "Meter number length must be equal to six",
      (value) => String(value).length === 6
    ),
});
const ViewTokens = () => {
  const [tokens, setTokens] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  return (
    <ScrollView className="mt-20">
      <SafeAreaView>
        <Formik
          validationSchema={validToken}
          initialValues={{
            meterNumber: "",
          }}
          onSubmit={async (values) => {
            try {
              setisLoading(true);
              const res = await fetch(
                `${API_URL}/api/tokens/?meterNumber=${JSON.stringify(values)}`
              );
              const result = await res.json();
              console.log(result, "the result");
              if (result.error) {
                setError(result.error);
                return console.log(result.error);
              } else {
                setisLoading(false);
                setTokens(result.data);
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
                  name="meterNumber"
                  placeholder="Enter your meter number"
                />
              </View>
              <Button
                title="View tokens history"
                buttonStyle={styles.btn}
                onPress={handleSubmit}
                disabled={!isValid}
              />
              {/* {tokens.map((el) => {
                <View className="mt-8">
                  <Text>{el.token_value_days}</Text>
                  <Text>{el.token_status}</Text>
                  <Text>{el.amount}</Text>
                  <Text>{el.token}</Text>
                </View>;
              })} */}
              <View>
                {error && (
                  <Text className="text-red-500 mt-2 mx-5 capitalize">
                    {error}
                  </Text>
                )}
              </View>
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
});

export default ViewTokens;
