import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/RootStackParamList';

type AlertScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Profile">;
};

export default function Alert({navigation}: AlertScreenProps) {
  return (
    <SafeAreaView>
      <Text onPress={() => navigation.goBack()}>Go Back</Text>
      <Text>Alerts</Text>
    </SafeAreaView>
  )
}