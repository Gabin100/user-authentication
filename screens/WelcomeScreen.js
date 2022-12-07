import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { AuthContext } from "../store/auth-context";

function WelcomeScreen() {
  const [fetchedMessage, setFetchedMessage] = useState("");
  const aunthenticateCtxToken = useContext(AuthContext).token;
  useEffect(() => {
    axios
      .get(
        "https://react-native-course-f0d16-default-rtdb.europe-west1.firebasedatabase.app/message.json?auth=" +
          aunthenticateCtxToken
      )
      .then((response) => {
        setFetchedMessage(response.data);
      });
  }, [aunthenticateCtxToken]);
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedMessage}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
