import { TodoList } from "@/components/TodoList";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Home() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
            }}
        >
            <TodoList />
            <Link href="/calendar">Calendar</Link>
        </View>
    );
}
