import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const GlobalStyles = StyleSheet.create({
  container: {
    padding: 20,
    display: 'flex',
    gap: 20,
    backgroundColor: colors.black,
    flex: 1 
  },
  // buttonPrimary: {
  //     backgroundColor: colors.orange,
  //     borderRadius: 5,
  //     width: "100%",
  //     height: 70,
  //     alignSelf: 'center',
  //     justifyContent: 'center'
  //   },
  //   buttonSecondary: {
  //     backgroundColor: colors.white,
  //     borderRadius: 5,
  //     width: "100%",
  //     height: 70,
  //     alignSelf: 'center',
  //     justifyContent: 'center'
  //   },
  //   buttonTitle: {
  //     fontFamily: "epilogueBold",
  //   },
  //   input: {
  //     fontFamily: "epilogueRegular",
  //     backgroundColor: colors.white,
  //     borderBottomColor: colors.white,
  //     padding: 10,
  //     borderWidth: 0,
  //     borderColor: colors.white,
  //     borderRadius: 10,
  //     marginTop: 5,
  //   },
  //   heading: {
  //     fontFamily: "epilogueBold",
  //     fontSize: 24,
  //   },
  //   body: {
  //     fontFamily: 'epilogueRegular',
  //     fontSize: 14
  //   }
  flexCol: {
    display: 'flex',
    flexDirection: 'column'
  }
});
