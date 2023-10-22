import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/RootStackParamList';

type ProfileScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Profile">;
};

export default function Profile({navigation}: ProfileScreenProps) {
  return (
    <SafeAreaView>
      <Text onPress={() => navigation.goBack()}>Go Back</Text>
      <Text>Profile</Text>
    </SafeAreaView>
  )
}