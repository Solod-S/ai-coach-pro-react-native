import { View, Text } from "react-native";
import React from "react";
import { Header, NoCourse } from "../../components/home";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "./../../constant/Colors";

export default function Home() {
  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, padding: 25, backgroundColor: Colors.WHITE }}
    >
      <Header />
      <NoCourse />
    </SafeAreaView>
  );
}
