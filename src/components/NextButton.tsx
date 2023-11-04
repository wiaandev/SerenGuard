import { StyleSheet, View, Animated } from "react-native";
import Svg, { G, Circle } from "react-native-svg";
import React, { useEffect, useRef } from "react";
import { colors } from "../utils/colors";
import { Button, IconButton } from "react-native-paper";

type ReactNativeSVGRef = React.RefObject<Circle>;

export default function NextButton({ percentage, scrollTo }: any) {
  const size: number = 128;
  const strokeWidth: number = 2;
  const center: number = size / 2;
  const radius: number = size / 2 - strokeWidth / 2;
  const circumference: number = 2 * Math.PI * radius;

  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef: ReactNativeSVGRef = useRef(null);

  const animation = (toValue: number) => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start;
  };

  useEffect(() => {
    animation(percentage);
  }, [percentage]);

  useEffect(() => {
    progressAnimation.addListener((value) => {
      const strokeDashoffset =
        circumference - (circumference * value.value) / 100;

      if (progressRef?.current) {
        const nativeProps: object = { strokeDashoffset };
        progressRef.current.setNativeProps(nativeProps);
      }
    });
  }, [percentage]);

  return (
    <>
      <Button
        onPress={scrollTo}
        mode="contained"
        style={{ padding: 5, marginBottom: 10, backgroundColor: colors.orange }}
      >
        {percentage === 100 ? "Get Started" : "Next"}
      </Button>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
