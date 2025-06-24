import { TodoList, TodoType } from "@/components/TodoList";
import { useCurrentDate } from "@/hooks/useCurrentDate";

import { useSearchParams } from "expo-router/build/hooks";
import { useRef, useState } from "react";
import { TouchableOpacity, Modal, Text, TextInput, View } from "react-native";

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
                {/* Clear All TouchableOpacity */}
                <TouchableOpacity onPress={() => clearAllTodos()}>
                    <Text>Clear All</Text>
                </TouchableOpacity>

                {/* Todo Submission Section Opener */}
                <TouchableOpacity
                    onPress={() => {
                        setSubmissionOpen(!isSubmissionOpen);
                        setLabel("");
                    }}
                >
                    <Text>{!isSubmissionOpen ? "+" : "-"}</Text>
                </TouchableOpacity>
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
                            <TouchableOpacity
                                onPress={() => {
                                    setDescriptionOpen(!isDescriptionsOpen);
                                    if (!isDescriptionsOpen) setDescription("");
                                }}
                            >
                                {!isDescriptionsOpen
                                    ? "Add Description"
                                    : "Close Description"}
                            </TouchableOpacity>
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
                                    justifyContent: "space-between",
                                }}
                            >
                                {/* Submit TouchableOpacity */}
                                <TouchableOpacity
                                    onPress={() => {
                                        if (label.length > 0) {
                                            addTodo(label, description);
                                            setLabel("");
                                            setDescription("");
                                            setSubmissionOpen(false);
                                        }
                                    }}
                                >
                                    <Text>Save</Text>
                                </TouchableOpacity>
                                {/* Close TouchableOpacity */}
                                <TouchableOpacity
                                    onPress={() => {
                                        setLabel("");
                                        setDescription("");
                                        setDescriptionOpen(false);
                                        setSubmissionOpen(false);
                                    }}
                                >
                                    <Text>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
}
