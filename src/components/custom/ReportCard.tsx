import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import React from "react";
import { ReportCardType } from "../../types/ReportCardType";
import { colors } from "../../utils/colors";
import { Chip, Divider } from "react-native-paper";

export default function ReportCard({
  name,
  nanoseconds,
  img,
  labels,
  crimeType,
  address,
}: ReportCardType) {
  return (
    <View
      style={{
        padding: 20,
        backgroundColor: colors.orange_dark,
        borderRadius: 5,
        marginVertical: 10,
        gap: 5
      }}
    >
      <Text style={{ color: colors.white, fontSize: 20, fontWeight: "bold" }}>
        {name}
      </Text>
      <Text style={{ color: colors.black }}>{nanoseconds}</Text>
      <Image source={{ uri: img }} />
      {/* <Text>{labels}</Text> */}
      <Text style={{ fontStyle: "italic", color: colors.orange }}>
        {crimeType}
      </Text>
      <Text
        style={{ fontStyle: "italic", color: colors.black, fontWeight: "500" }}
      >
        {address}
      </Text>
      <Divider  style={{ marginTop: 30, borderColor: colors.orange, borderWidth: 0.5}}/>
      <Text style={{ marginTop: 20, color: colors.orange_darker, fontWeight: '700', fontSize: 16 }}>Labels</Text>
      <FlatList
        data={labels}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              flexWrap: "wrap",
              flexDirection: "row",
              gap: 10,
              marginVertical: 10,
            }}
          >
            <Chip>{item.description}</Chip>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  name: {
    color: "red",
  },
});
