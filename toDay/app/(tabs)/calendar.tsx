import { ColorValue, DimensionValue, Pressable, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { router } from "expo-router";
import { CustomDay } from "@/components/CustomDay";



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
                dayComponent={CustomDay}
            />
        </View>
    );
}
