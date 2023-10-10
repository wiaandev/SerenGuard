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

export default function OnboardingItem({ item }: OnboardingItemTypes) {
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, {width}]}>
      <Image
        source={item.image}
        style={[styles.image, { width, resizeMode: 'cover' }]}
      />

      <View style={{flex: 0.3} }>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontWeight: '800',
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 28
  },
  description: {
    fontWeight: '300',
    textAlign: 'center',
    paddingHorizontal: 64
  },
  image: {
    flex: 0.7,
    justifyContent: 'center'
  },
});
