import { Platform } from "react-native";

export const fontStyle = {
    h1: 23.61,
    h1Weight: "700" as "700", 
    h2: 22.13, 
    h2Weight: "600" as "600", 
    normal: 16, 
    normalWeight: "400" as "400", 
    small: 15, 
    smallWeight: "400" as "400", 
    fontFamily: Platform.select({
        android: "Montserrat_400Regular",
        ios: "Montserrat-Regular"
    })
}

