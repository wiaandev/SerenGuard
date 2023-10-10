import { ImageSourcePropType } from "react-native";

export type OnboardingItemTypes = {
    item: {
        image: ImageSourcePropType;
        title: string;
        description: string;
    }
}