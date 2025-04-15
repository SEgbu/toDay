import { TodoList, TodoType } from "@/components/TodoList";
import { useCurrentDate } from "@/hooks/useCurrentDate";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, router } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import { useRef, useState } from "react";
import { Button, Pressable, Text, TextInput, View } from "react-native";
import { useEffect } from "react";

export default function Home() {
    const searchParams = useSearchParams();
    const [isSubmissionOpen, setSubmissionOpen] = useState<boolean>(false);
    const [isDescriptionsOpen, setDescriptionOpen] = useState<boolean>(false);
    const [text, setText] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const isEmpty = searchParams.toString().length === 0;
    // console.log("isEmpty: "+isEmpty+" searchParams:"+searchParams.toString());

    let selectedDay = "";
    let currentDay = "";

    useCurrentDate();

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

    const addTodo = (label: string, description: string) => {
        setTodoData((td) => [
            ...td,
            {
                // initial value is 0
                // array.reduce goes through an array and return the accumulated value
                // in this case, we compare whether the current id is great than previous id
                // if so then replace previous id, if not then continue.
                id:
                    td.length > 0
                        ? Math.max(...td.map((todo) => todo.id)) + 1
                        : 1,
                label: label,
                description: description,
                completed: false,
            },
        ]);
    };

    const clearAllTodos = () => {
        setTodoData([]);
    }

    return (
        <Pressable
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
            }}
            onPress={() => {
                if (isSubmissionOpen) setSubmissionOpen(false);
            }}
            // pressable on default make a sound, disable if submission window not open
            android_disableSound={isSubmissionOpen ? false : true}
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
                        title={
                            !isDescriptionsOpen
                                ? "Add Description"
                                : "Close Description"
                        }
                        onPress={() => {
                            setDescriptionOpen(!isDescriptionsOpen);
                            setDescription("");
                        }}
                    ></Button>
                    {isDescriptionsOpen ? (
                        <TextInput
                            placeholder="Enter Description"
                            value={description}
                            onChangeText={setDescription}
                        ></TextInput>
                    ) : null}
                    <Button
                        title="Submit"
                        onPress={() => {
                            if (text.length > 0){
                                addTodo(text, description);
                                setText("");
                                setDescription("");
                            }
                        }}
                    />
                </View>
            ) : null}

            <Button title={"Clear All"} onPress={() => clearAllTodos()}></Button>
        </Pressable>
    );
}
