import { TodoList } from "@/components/TodoList";
import { Link } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import { Text, View } from "react-native";

export default function Home() {
    const searchParams = useSearchParams();
    const isEmpty = searchParams.toString().length === 0;
    // console.log("isEmpty: "+isEmpty+" searchParams:"+searchParams.toString());

    let selectedDay = "";
    let currentDay = "";

    if (!isEmpty && searchParams) selectedDay = searchParams.get("dateNav") || "";
    else currentDay = new Date().toLocaleDateString();

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
            }}
        >
            <Text style={{fontSize: 30}}>{!isEmpty ? selectedDay : currentDay}</Text>
            <TodoList date={!isEmpty ? selectedDay : currentDay}></TodoList>
            <Link href="/calendar">Calendar</Link>
        </View>
    );
}
