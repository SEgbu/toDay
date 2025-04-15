import { Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { router } from "expo-router";


export default function CalendarPage() {
    return (
        <View>
            <Calendar
                onDayPress={(day : any) => {
                    // Navigate with selected date
                    router.navigate({
                        pathname: "/(tabs)",
                        params: { dateNav: day.dateString },
                    });
                }}
            />
        </View>
    );
}
