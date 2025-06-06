import { TodoList, TodoType } from "@/components/TodoList";
import { useCurrentDate } from "@/hooks/useCurrentDate";

import { useSearchParams } from "expo-router/build/hooks";
import { useState } from "react";
import { Button, Modal, Pressable, Text, TextInput, View } from "react-native";

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
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                gap: 10,
            }}
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
            </View>

            <View>
                <Modal
                    // style={{
                    //     justifyContent: "center",
                    //     alignItems: "center",
                    //     gap: 10,
                    // }}
                    visible={isSubmissionOpen}
                    animationType="fade"
                    transparent={true}
                    
                    onRequestClose={() => setSubmissionOpen(false)}

                >
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: "white",
                                width: 300,
                                padding: 30,
                                display: "flex",
                                gap: 3,
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 4,
                                elevation: 5,
                            }}
                        >
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
                                        setSubmissionOpen(false);
                                    }
                                }}
                            />

                            <Button
                                title="Close"
                                onPress={() => {
                                    setLabel("");
                                    setDescription("");
                                    setSubmissionOpen(false);
                                }}
                            ></Button>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
}
