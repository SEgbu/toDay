import { StyleSheet } from "react-native";
import { colours } from "@/constants/Colours"
import { fontStyle } from "@/constants/Text";

export const globalStyle = StyleSheet.create({
    buttonContainer: {
        alignItems: "center", 
        justifyContent: "center",

        width: 75, 
        height: 30, 

        backgroundColor: colours.primary,
    },
    
    smallText: {
        color: colours.text,
        fontSize: fontStyle.small,
        fontWeight: fontStyle.smallWeight,
        fontFamily: fontStyle.fontFamily
    }
});