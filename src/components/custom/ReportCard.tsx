import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { ReportCardType } from "../../types/ReportCardType";
import { colors } from "../../utils/colors";

export default function ReportCard({
  name,
  nanoseconds,
  img,
  labels,
  crimeType,
  address
}: ReportCardType) {
  return (
    <View style={{ padding: 20, backgroundColor: colors.orange_dark, borderRadius: 5, marginVertical: 10 }}>
      <Text style={{color: colors.white, fontSize: 20, fontWeight: 'bold'}}>{name}</Text>
      <Text style={{color: colors.black}}>{nanoseconds}</Text>
      <Image source={{ uri: img }} />
      {/* <Text>{labels}</Text> */}
      <Text style={{fontStyle: 'italic', color: colors.orange}}>{crimeType}</Text>
      <Text style={{fontStyle: 'italic', color: colors.orange_darker}}>{address}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  name: {
    color: "red",
  },
});
