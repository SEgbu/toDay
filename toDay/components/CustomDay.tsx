import { PieSlice } from "@/components/PieSlice";
import { useCurrentDate } from "@/hooks/useCurrentDate";
import { useTodoData } from "@/hooks/useTodoData";

import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { StyleProp, ViewStyle, TextStyle } from "react-native";
import { globalStyle } from "@/styles/GlobalStyle";
import { fontStyle } from "@/constants/Text";
import { colours } from "@/constants/Colours";

interface DayComponentProps {
    date: {
        dateString: string;
        day: number;
        month: number;
        year: number;
        timestamp: number;
    };
}

// Styling for each day on the calendar
export const CustomDay: React.FC<DayComponentProps> = ({ date }) => {
    const currentDate = useCurrentDate();
    const todoData = useTodoData();

    const pieContainerStyle: StyleProp<ViewStyle> = {
        position: "absolute",
        right: date.dateString[8] == "0" ? 4 : 8,
        top: 20,
    };

    return (
        <Pressable
            onPress={() => {
                router.navigate({
                    pathname: "/(tabs)",
                    params: { dateNav: date.dateString },
                });
            }}
        >
            <View style={pieContainerStyle}>
                <View
                    style={{
                        position: "absolute",
                    }}
                >
                    {todoData[date.dateString] != undefined &&
                    todoData[date.dateString].length > 0 ? (
                        <PieSlice
                            size={40}
                            color={colours.secondary}
                            percentage={100}
                        />
                    ) : null}
                </View>

                <PieSlice
                    size={40}
                    color={colours.primary}
                    // calculates the fraction of the pie based on the percentage of todos completed
                    percentage={
                        todoData[date.dateString] == undefined ||
                        todoData[date.dateString].length < 1
                            ? 0
                            : (todoData[date.dateString].reduce(
                                  (amountOfCompleted, td) =>
                                      td.completed == true
                                          ? (amountOfCompleted += 1)
                                          : amountOfCompleted,
                                  0
                              ) /
                                  todoData[date.dateString].length) *
                              100
                    }
                />
            </View>

            {/* Text styling of the day on the calendar */}
            <View
                style={
                    {
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "20",
                        height: "40",
                    } as Object
                }
            >
                <Text
                    // style={{
                    //     textAlign: "center",
                    //     color:
                    //         date.dateString == currentDate ? "blue" : "black",
                    //     fontWeight:
                    //         todoData[date.dateString]?.length > 0 ? "800" : "normal"
                    // }}
                    style={{
                        ...globalStyle.smallText,
                        fontWeight:
                            date.dateString == currentDate
                                ? fontStyle.h1Weight
                                : fontStyle.smallWeight,
                        color:
                            date.dateString == currentDate
                                ? colours.accent
                                : (todoData[date.dateString] != undefined && todoData[date.dateString].length > 0)
                                    ? colours.text
                                    : colours.textDim,
                    }}
                >
                    {date.day}
                </Text>
            </View>
        </Pressable>
    );
};
