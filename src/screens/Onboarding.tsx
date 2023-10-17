import { FlatList, StyleSheet, Animated } from "react-native";
import React, { useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import slides from "../constants/slides";
import OnboardingItem from "../components/OnboardingItem";
import Paginator from "../components/Paginator";
import NextButton from "../components/NextButton";
import { colors } from "../utils/colors";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/RootStackParamList";
import { Button } from "react-native-paper";

type onboardingProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Onboarding">;
};

export default function Onboarding({ navigation }: onboardingProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList | null>(null);

  const scrollTo = () => {
    if (slidesRef?.current && currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex((prevIndex) => {
        console.log(prevIndex + 1);
        return prevIndex + 1;
      });
    } else {
      console.log("last item");
      navigation.navigate("Auth");
    }
  };

  //const viewConfig = useRef({viewAreaConveragePercentThreshold: 50}).current //needs to be at least 50% on screen before changingto next slide

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={slides}
        renderItem={({ item }) => <OnboardingItem item={item} />}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          }
        )}
        scrollEventThrottle={32}
        ref={slidesRef}
      />
      <Paginator data={slides} scrollX={scrollX} />
      <NextButton
        percentage={(currentIndex + 1) * (100 / slides.length)}
        scrollTo={scrollTo}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.grey,
  },
});
