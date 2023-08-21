import React from "react";
import { StyleSheet } from "react-native";
import Header from "../components/home/Header";
import { SafeAreaView } from "react-native";
import SubHeader from "../components/home/SubHeader";
import Feeds from "../subcomponents/Home/Feeds";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <SubHeader/>
      <Feeds/>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
});
export default HomeScreen;
