import { Text, View } from "react-native";
import Calendar from "react-calendar";
import { router } from "expo-router";

export default function CalendarPage() {
    return (
        <View>
            <Calendar
                // redirect to index with tododata for the todolist to render
                onClickDay={(props) => {
                    // console.log(props.toLocaleDateString());
                    router.navigate({pathname: "/", params: {dateNav: props.toLocaleDateString()}})
                }}
            />
        </View>
    );
}
