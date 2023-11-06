import {
  View,
  Text,
  Modal,
  Alert,
  StyleSheet,
  Platform,
  Dimensions,
  Image,
} from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { Button } from "react-native-paper";
import { colors } from "../../utils/colors";

type modalProps = {
  modalVisible: boolean;
  vicinity: string | null;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  navigateToHome: () => void;
};

export default function ReportModal({
  modalVisible,
  vicinity,
  setModalVisible,
  navigateToHome,
}: modalProps) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={{ fontWeight: "700", fontSize: 24 }}>Report Added!</Text>
          <Image source={require("../../assets/report-add-success.png")} width={50} height={50} style={{margin: 20}}/>
          <Text
            style={{fontSize: 18, color: colors.black, textAlign: 'center' }}
          >
            Thank you for keeping {vicinity} safe!
          </Text>
          <Button onPress={navigateToHome} mode="contained" style={{backgroundColor: colors.orange}}>
            <Text style={{ color: colors.black }}>Go to report</Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    height: Dimensions.get("screen").height,
    justifyContent: "center",
    backgroundColor: "rgba(20,33,61,0.5)",
    alignItems: "center",
    padding: 30,
  },
  modalView: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 30,
    alignItems: "center",
  },
});
