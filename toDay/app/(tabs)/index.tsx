import { TodoList, TodoType } from "@/components/TodoList";
import { useCurrentDate } from "@/hooks/useCurrentDate";

import { useSearchParams } from "expo-router/build/hooks";
import { useRef, useState } from "react";
import { TouchableOpacity, Modal, Text, TextInput, View } from "react-native";
import { globalStyle } from "@/styles/GlobalStyle";
import { colours } from "@/constants/Colours";
import { LinearGradient } from "expo-linear-gradient";

import OpenTodoModal from "../../assets/iconmonstr-plus-circle-filled.svg";
import ThreeDots from "../../assets/iconmonstr-menu-dot-horizontal-filled.svg"
import React from "react";

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
                height: "100%",
            }}
        >
            <LinearGradient
                colors={[colours.primary, colours.background]}
                start={{ x: 0.5, y: 1 }}
                end={{ x: 0.5, y: 0.9 }}
                style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", gap: 20 }}
            >
                {/* Date */}
                <Text style={{...globalStyle.h1Text, textAlign: "center"}}>
                    {new Date(
                        !isEmpty ? selectedDay : currentDay
                    ).toDateString()}
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
                    <TouchableOpacity onPress={() => clearAllTodos()} style={globalStyle.buttonContainer}>
                        <Text style={globalStyle.buttonText}>Clear All</Text>
                    </TouchableOpacity>

                    {/* Todo Submission Section Opener */}
                    <TouchableOpacity
                        onPress={() => {
                            setSubmissionOpen(!isSubmissionOpen);
                            setDescriptionOpen(false);
                            console.log(isDescriptionsOpen);
                            setLabel("");
                        }}
                    >
                        <OpenTodoModal width={30} height={30} fill={colours.text}></OpenTodoModal>
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
                        <LinearGradient
                            colors={[colours.background, colours.accent]}
                            start={{ x: 0.5, y: 0.5 }}
                            end={{ x: 0, y: 1 }}
                            // end={}
                            style={{
                                height: "100%",
                                flex: 1,
                                justifyContent: "center",
                            }}
                        >
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    padding: 60,
                                    gap: 30,
                                }}
                            >
                                {/* Todo Label Input */}
                                <TextInput
                                    placeholder="Enter Todo"
                                    placeholderTextColor={colours.textDim}
                                    style={{
                                        borderWidth: 1,
                                        borderRadius: 8,
                                        borderColor: colours.text,
                                        color: colours.text,
                                    }}
                                    value={label}
                                    onChangeText={setLabel}
                                    autoFocus={true}
                                ></TextInput>

                                {/* Todo Description Input */}
                                <TouchableOpacity
                                    onPress={() => {
                                        setDescriptionOpen(!isDescriptionsOpen);
                                    }}
                                >
                                    <Text
                                        style={{
                                            ...globalStyle.normalText,
                                            color: colours.textDim,
                                        }}
                                    >
                                        {!isDescriptionsOpen
                                            ? "Add Description"
                                            : "Close Description"}
                                    </Text>
                                </TouchableOpacity>

                                {isDescriptionsOpen ? (
                                    <TextInput
                                        ref={descRef}
                                        placeholder="Enter Description"
                                        placeholderTextColor={colours.textDim}
                                        style={{
                                            borderWidth: 1,
                                            borderRadius: 8,
                                            borderColor: colours.text,
                                            color: colours.text,
                                        }}
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
                                        style={globalStyle.buttonContainer}
                                    >
                                        <Text style={globalStyle.buttonText}>
                                            Save
                                        </Text>
                                    </TouchableOpacity>
                                    {/* Close TouchableOpacity */}
                                    <TouchableOpacity
                                        onPress={() => {
                                            setLabel("");
                                            setDescription("");
                                            setDescriptionOpen(false);
                                            setSubmissionOpen(false);
                                        }}
                                        style={globalStyle.buttonContainer}
                                    >
                                        <Text style={globalStyle.buttonText}>
                                            Cancel
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </LinearGradient>
                    </Modal>
                </View>
            </LinearGradient>
        </View>
    );
}
