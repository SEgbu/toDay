import { CustomDay } from "@/components/CustomDay";

import { View } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { router } from "expo-router";
import { DayProps } from "react-native-calendars/src/calendar/day";
import { ComponentType } from "react";
import { CustomHeader } from "@/components/CustomHeader";

export default function CalendarPage() {
    return (
        <View>
            <Calendar
                onDayPress={(day: any) => {
                    // Navigate with selected date
                    router.navigate({
                        pathname: "/(tabs)",
                        params: { dateNav: day.dateString },
                    });
                }}
                dayComponent={
                    CustomDay as
                        | ComponentType<
                              DayProps & { date?: DateData | undefined }
                          >
                        | undefined
                }
                customHeader={CustomHeader}
                style={{height: "100%", display: "flex", justifyContent: "space-evenly"}}
            />
        </View>
    );
}
