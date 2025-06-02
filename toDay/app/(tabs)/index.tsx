import { TodoList, TodoType } from "@/components/TodoList";
import { useCurrentDate } from "@/hooks/useCurrentDate";

import { useSearchParams } from "expo-router/build/hooks";
import { useState } from "react";
import { Button, Pressable, Text, TextInput, View } from "react-native";

export default function Home() {
    const searchParams = useSearchParams();

    const [isSubmissionOpen, setSubmissionOpen] = useState<boolean>(false);
    const [isDescriptionsOpen, setDescriptionOpen] = useState<boolean>(false);

    const [label, setLabel] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const isEmpty = searchParams.toString().length === 0;
    // console.log("isEmpty: "+isEmpty+" searchParams:"+searchParams.toString());

    // get date
    let selectedDay = "";
    let currentDay = "";

    if (!isEmpty && searchParams)
        selectedDay = searchParams.get("dateNav") || "";
    else currentDay = useCurrentDate();

    // global todo data
    const [todoData, setTodoData] = useState<TodoType[]>([]);

    // logging todoData
    // useEffect(() => {
    // console.log(todoData);
    // }, [todoData])

    const addTodo = (label: string, description: string) => {
        setTodoData((td) => [
            ...td,
            {
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
    };

    return (
        <Pressable
            style={{
                flex: 1,
                justifyContent: "center",
                gap: 10,
            }}
            onPress={() => {
                if (isSubmissionOpen) setSubmissionOpen(false);
            }}
            // pressable on default make a sound, disable if submission window not open
            android_disableSound={isSubmissionOpen ? false : true}
        >
            {/* Date */}
            <Text style={{ fontSize: 30, textAlign: "center" }}>
                {!isEmpty ? selectedDay : currentDay}
            </Text>

            {/* Clear All Button */}
            <View style={{ display: "flex", alignItems: "center" }}>
                <Button
                    title={"Clear All"}
                    onPress={() => clearAllTodos()}
                ></Button>
            </View>

            <TodoList
                date={!isEmpty ? selectedDay : currentDay}
                todoData={todoData}
                setTodoData={setTodoData}
            ></TodoList>

            {/* Todo Submission Section */}
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 10,
                }}
            >
                <Button
                    title={!isSubmissionOpen ? "+" : "-"}
                    onPress={() => {
                        setSubmissionOpen(!isSubmissionOpen);
                        setLabel("");
                    }}
                />
                {isSubmissionOpen ? (
                    <View>
                        {/* Todo Label Input */}
                        <TextInput
                            placeholder="Enter Todo"
                            value={label}
                            onChangeText={setLabel}
                        ></TextInput>

                        {/* Todo Description Input */}
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
                        
                        {/* Submit Button */}
                        <Button
                            title="Submit"
                            onPress={() => {
                                if (label.length > 0) {
                                    addTodo(label, description);
                                    setLabel("");
                                    setDescription("");
                                }
                            }}
                        />
                    </View>
                ) : null}
            </View>
        </Pressable>
    );
}
