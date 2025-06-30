import { colours } from "@/constants/Colours";
import { Tabs } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
    return (
        <GestureHandlerRootView>
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: { backgroundColor: colours.primary },
                }}
            >
                <Tabs.Screen name="calendar" />
                <Tabs.Screen name="index" options={{ title: "todos" }} />
            </Tabs>
        </GestureHandlerRootView>
    );
}
