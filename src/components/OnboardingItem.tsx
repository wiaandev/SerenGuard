import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { GlobalStyles } from "../utils/globals";
import { OnboardingItemTypes } from "../types/OnboardingItemTypes";
import { colors } from "../utils/colors";

export default function OnboardingItem({ item }: OnboardingItemTypes) {
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, { width }]}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Image
        source={item.image}
        style={[styles.image, { width, resizeMode: "cover" }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 10,
  },
  title: {
    marginTop: 50,
    fontWeight: "800",
    marginBottom: 10,
    color: colors.orange,
    fontSize: 28,
    textAlign: "center",
  },
  description: {
    fontWeight: "400",
    fontSize: 16,
    color: colors.white,
    textAlign: "center",
    paddingHorizontal: 64,
  },
  image: {
    flex: 1,
    objectFit: "contain",
    justifyContent: "center",
  },
});
