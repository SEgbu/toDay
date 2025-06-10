import { TodoList, TodoType } from "@/components/TodoList";
import { useCurrentDate } from "@/hooks/useCurrentDate";

import { useSearchParams } from "expo-router/build/hooks";
import { useRef, useState } from "react";
import { Button, Modal, Text, TextInput, View } from "react-native";

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

    // reference to description input in todo submission modal
    const descRef = useRef<TextInput>(null);

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
                display: "flex",
                gap: 35,
            }}
        >
            {/* Date */}
            <Text style={{ fontSize: 30, textAlign: "center" }}>
                {new Date(!isEmpty ? selectedDay : currentDay).toDateString()}
            </Text>

            <TodoList
                date={!isEmpty ? selectedDay : currentDay}
                todoData={todoData}
                setTodoData={setTodoData}
            ></TodoList>

            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                }}
            >
                {/* Clear All Button */}
                <Button
                    title={"Clear All"}
                    onPress={() => clearAllTodos()}
                ></Button>

                {/* Todo Submission Section Opener */}
                <Button
                    title={!isSubmissionOpen ? "+" : "-"}
                    onPress={() => {
                        setSubmissionOpen(!isSubmissionOpen);
                        setLabel("");
                    }}
                />
            </View>

            {/* Todo Submission Section */}
            <View>
                <Modal
                    visible={isSubmissionOpen}
                    animationType="fade"
                    // transparent={true}

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
                                gap: 30,
                                // shadowColor: "#000",
                                // shadowOffset: {
                                //     width: 0,
                                //     height: 2,
                                // },
                                // shadowOpacity: 0.25,
                                // shadowRadius: 4,
                                // elevation: 5,
                            }}
                        >
                            {/* Todo Label Input */}
                            <TextInput
                                placeholder="Enter Todo"
                                value={label}
                                onChangeText={setLabel}
                                autoFocus={true}
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
                                    if (!isDescriptionsOpen) setDescription("");
                                }}
                            ></Button>
                            {isDescriptionsOpen ? (
                                <TextInput
                                    ref={descRef}
                                    placeholder="Enter Description"
                                    value={description}
                                    onChangeText={setDescription}
                                    autoFocus={true}
                                ></TextInput>
                            ) : null}

                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row", 
                                    justifyContent: "space-between"
                                }}
                            >
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
                                {/* Close Button */}
                                <Button
                                    title="Close"
                                    onPress={() => {
                                        setLabel("");
                                        setDescription("");
                                        setDescriptionOpen(false);
                                        setSubmissionOpen(false);
                                    }}
                                ></Button>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
}
