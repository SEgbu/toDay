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

        borderRadius: 8
    },
    
    smallText: {
        color: colours.text,
        fontSize: fontStyle.small,
        fontWeight: fontStyle.smallWeight,
        fontFamily: fontStyle.fontFamily
    },

    normalText: {
        color: colours.text,
        fontSize: fontStyle.normal,
        fontWeight: fontStyle.normalWeight,
        fontFamily: fontStyle.fontFamily
    }, 

    h1Text: {
        color: colours.text,
        fontSize: fontStyle.h1,
        fontWeight: fontStyle.h1Weight,
        fontFamily: fontStyle.fontFamily
    }, 

    h2Text: {
        color: colours.text,
        fontSize: fontStyle.h2,
        fontWeight: fontStyle.h2Weight,
        fontFamily: fontStyle.fontFamily
    }, 
});