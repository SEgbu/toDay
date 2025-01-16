import { TodoList, TodoType } from "@/components/TodoList";
import { useCurrentDate } from "@/hooks/useCurrentDate";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import { useRef, useState } from "react";
import { Button, Pressable, Text, TextInput, View } from "react-native";

export default function Home() {
    const searchParams = useSearchParams();
    const [isSubmissionOpen, setSubmissionOpen] = useState<boolean>(false);
    const [text, setText] = useState<string>("");

    const isEmpty = searchParams.toString().length === 0;
    // console.log("isEmpty: "+isEmpty+" searchParams:"+searchParams.toString());

    let selectedDay = "";
    let currentDay = "";

    if (!isEmpty && searchParams)
        selectedDay = searchParams.get("dateNav") || "";
    else currentDay = useCurrentDate();

    // get all todos as a single object
    // on todo change, change the object state
    const [todoData, setTodoData] = useState<TodoType[]>([]);

    // logging todoData
    // useEffect(() => {
    // console.log(todoData);
    // }, [todoData])

    const addTodo = (label: string) => {
        setTodoData((td) => [
            ...td,
            { id: todoData.length + 1, label: label, completed: false },
        ]);
    };

    return (
        <Pressable
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
            }}
            onPress={() => {
                if (isSubmissionOpen) setSubmissionOpen(false)
            }}
        
            // pressable on default make a sound, disable if submission window not open
            android_disableSound={(isSubmissionOpen) ? false : true}
        >
                <Text style={{ fontSize: 30 }}>
                    {!isEmpty ? selectedDay : currentDay}
                </Text>
                <TodoList
                    date={!isEmpty ? selectedDay : currentDay}
                    todoData={todoData}
                    setTodoData={setTodoData}
                ></TodoList>
                <Button
                    title={!isSubmissionOpen ? "+" : "-"}
                    onPress={() => {
                        setSubmissionOpen(!isSubmissionOpen);
                        setText("");
                    }}
                />
                {isSubmissionOpen ? (
                    <View>
                        <TextInput
                            placeholder="Enter Todo"
                            value={text}
                            onChangeText={setText}
                        ></TextInput>
                        <Button
                            title="Submit"
                            onPress={() => {
                                addTodo(text);
                                setText("");
                            }}
                        />
                    </View>
                ) : null}
                <Link style={{margin: 20}} href="/calendar">Calendar</Link>
        </Pressable>
    );
}
