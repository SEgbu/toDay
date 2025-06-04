import { PieSlice } from "@/components/PieSlice";
import { useCurrentDate } from "@/hooks/useCurrentDate";
import { useTodoData } from "@/hooks/useTodoData";

import {
    Pressable,
    Text,
    View,
} from "react-native";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { StyleProp, ViewStyle, TextStyle } from "react-native";

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
                <PieSlice
                    size={40}
                    color="rgba(44, 172, 65, 0.34)"
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
                        height: "40" 
                    } as Object
                } 
            >
                <Text
                    style={{
                        textAlign: "center",
                        color:
                            date.dateString == currentDate ? "blue" : "black",
                        fontWeight:
                            todoData[date.dateString]?.length > 0 ? "800" : "normal"
                    }}
                >
                    {date.day}
                </Text>
            </View>
        </Pressable>
    );
};
