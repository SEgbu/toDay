import { colours } from "@/constants/Colours";
import { Tabs } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Calendar from "../../assets/iconmonstr-calendar-4.svg";
import Todos from "../../assets/iconmonstr-task-list-square-filled.svg";
import { globalStyle } from "@/styles/GlobalStyle";
import { fontStyle } from "@/constants/Text";
import React from "react";

export default function RootLayout() {
    return (
        <GestureHandlerRootView>
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: { backgroundColor: colours.primary, height: "8%", paddingTop: 6, borderTopWidth: 0,},
                    tabBarActiveTintColor: colours.text,
                    tabBarInactiveTintColor: colours.textDim,
                    tabBarLabelStyle: {
                        fontSize: fontStyle.small,
                        fontWeight: fontStyle.smallWeight,
                        fontFamily: fontStyle.fontFamily,
                    },
                    headerPressColor: "transparent", 
                    headerPressOpacity: 0,
                    animation: "none",
                }}
            >
                <Tabs.Screen
                    name="calendar"
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Calendar
                                width={30}
                                height={30}
                                fill={color}
                            ></Calendar>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="index"
                    options={{
                        title: "todos",
                        tabBarIcon: ({ color }) => (
                            <Todos width={30} height={30} fill={color}></Todos>
                        ),
                    }}
                />
            </Tabs>
        </GestureHandlerRootView>
    );
}
