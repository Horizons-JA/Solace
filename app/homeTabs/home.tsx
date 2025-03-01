import React from "react";
import { Text, View, StyleSheet, ScrollView, Platform } from "react-native";
import Wrapper from "../components/Wrapper";
import Constants from "expo-constants";

const Home = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        justifyContent: "center",
      }}
    >
      <Wrapper />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#272727",
  },
});

export default Home;

