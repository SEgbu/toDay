import { TodoType } from "./TodoList";

import {
    TouchableOpacity,
    Modal,
    Pressable,
    StyleProp,
    Text,
    TextInput,
    TextStyle,
    View,
} from "react-native";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import { useReorderableDrag } from "react-native-reorderable-list";
import { LinearGradient } from "expo-linear-gradient";
import { colours } from "@/constants/Colours";
import { globalStyle } from "@/styles/GlobalStyle";

import DeleteButton from "../assets/iconmonstr-trash-can-filled.svg";
import ThreeDots from "../assets/iconmonstr-menu-dot-horizontal-filled.svg";
import OptionDots from "../assets/iconmonstr-menu-dot-horizontal-filled-options.svg";
import React from "react";

type TodoProps = {
    id: number;
    label: string;
    description: string;
    completed: boolean;
    setTodoData: React.Dispatch<React.SetStateAction<TodoType[]>>;
};

export const Todo: React.FC<TodoProps> = ({
    label,
    completed,
    description,
    setTodoData,
    id,
}) => {
    const [isOptionMenuOpen, setOptionMenuOpen] = useState<boolean>(false);
    const [newName, setNewName] = useState<string>("");
    const [newDescription, setNewDescription] = useState<string>("");
    const [seeMore, setSeeMore] = useState<boolean>(false);
    const [canDrag, setCanDrag] = useState<boolean>(false);
    const drag = useReorderableDrag();

    // Logging canDrag state
    // useEffect(() => {
    //     console.log(id.toString() + ": " + (canDrag ? "True" : "False"));
    // }, [setCanDrag]);

    return (
        <View>
            <View
                style={{
                    width: 300,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingBottom: 20,
                    marginRight: 10,
                    marginLeft: 10,
                }}
            >
                {/* Drag area */}
                {seeMore ? (
                    <Pressable
                        onPressIn={() => {
                            drag();
                        }}
                    >
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 8,
                                transform: [{rotateZ: "90deg"}], 
                            }}
                        >
                            <OptionDots
                                width={24}
                                height={6}
                                fill={colours.text}
                            ></OptionDots>
                            <OptionDots
                                width={24}
                                height={6}
                                fill={colours.text}
                            ></OptionDots>
                        </View>
                    </Pressable>
                ) : null}
                {/* Check and uncheck todos and update todo data */}
                <Checkbox
                    value={completed}
                    onValueChange={() => {
                        setTodoData((currentTodos) =>
                            currentTodos.map((t) =>
                                t.id === id
                                    ? { ...t, completed: !t.completed }
                                    : t
                            )
                        );
                    }}
                    style={{
                        backgroundColor: colours.text,
                        // borderWidth: 0
                    }}
                    color={colours.accent}
                ></Checkbox>

                {/* Strikethrough todo label if todo have been checked */}
                <View
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: seeMore ? 100 : 200,
                        gap:
                            description != "" && description != undefined
                                ? 5
                                : 0,
                    }}
                >
                    {/* Label (add "..." if they're too long) */}
                    <Text
                        style={{
                            ...globalStyle.normalText,
                            textDecorationLine: completed
                                ? "line-through"
                                : "none",
                        }}
                        onPress={() => setSeeMore(!seeMore)}
                    >
                        {label != "" && label != undefined
                            ? label.length > 25 && !seeMore
                                ? label.substring(0, 25) + "..."
                                : label
                            : null}
                    </Text>
                    {/* Description (add "..." if they're too long) */}
                    <Text
                        style={
                            {
                                ...globalStyle.smallText,
                                color: colours.textDim, 
                                textDecorationLine: completed
                                    ? "line-through"
                                    : "none",
                                display:
                                    description != "" &&
                                    description != undefined
                                        ? "block"
                                        : "none",
                            } as StyleProp<TextStyle>
                        }
                        onPress={() => setSeeMore(!seeMore)}
                    >
                        {description != "" && description != undefined
                            ? description.length > 15 && !seeMore
                                ? 
                                  description.substring(0, 15) +
                                  "..."
                                : description
                            : null}
                    </Text>
                </View>

                {/* Options Buttons */}
                <TouchableOpacity
                    onPress={() => {
                        setOptionMenuOpen(true);
                        setNewName(label);
                        setNewDescription(description);
                    }}
                >
                    <ThreeDots
                        width={30}
                        height={30}
                        fill={colours.text}
                    ></ThreeDots>
                </TouchableOpacity>
            </View>

            {/* Option Menu */}
            <View>
                {/* Rename Modal */}
                <Modal
                    visible={isOptionMenuOpen}
                    transparent={true}
                    animationType="slide"
                >
                    <View
                        style={{
                            height: "100%",
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <LinearGradient
                            colors={[colours.text, colours.accent]}
                            start={{ x: 0.4, y: 0.3 }}
                            end={{ x: 0.05, y: 0.05 }}
                            style={{
                                width: 300,
                                height: 250,
                                borderRadius: 16,
                            }}
                        >
                            <View
                                style={{
                                    // borderRadius: 0,
                                    margin: 1,
                                    justifyContent: "center",
                                    flex: 1,
                                }}
                            >
                                <LinearGradient
                                    colors={[
                                        colours.primary,
                                        colours.background,
                                    ]}
                                    start={{ x: 1, y: 1 }}
                                    end={{ x: 0, y: 0 }}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: 16,
                                    }}
                                >
                                    <View
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            height: "100%",
                                            gap: 30,
                                            padding: 20,
                                        }}
                                    >
                                        <View
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                gap: 20,
                                            }}
                                        >
                                            {/* Update Inputs */}
                                            <TextInput
                                                value={newName}
                                                onChangeText={setNewName}
                                                placeholder="Enter a label"
                                                placeholderTextColor={
                                                    colours.textDim
                                                }
                                                style={{
                                                    borderWidth: 1,
                                                    borderRadius: 8,
                                                    borderColor: colours.text,
                                                    color: colours.text,
                                                }}
                                            ></TextInput>
                                            <TextInput
                                                value={newDescription}
                                                placeholderTextColor={
                                                    colours.textDim
                                                }
                                                style={{
                                                    borderWidth: 1,
                                                    borderRadius: 8,
                                                    borderColor: colours.text,
                                                    color: colours.text,
                                                }}
                                                onChangeText={setNewDescription}
                                                placeholder="Add a description?"
                                            ></TextInput>
                                        </View>

                                        <View
                                            style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            {/* Delete */}
                                            <TouchableOpacity
                                                onPress={() =>
                                                    setTodoData(
                                                        (currentTodos) =>
                                                            currentTodos.filter(
                                                                (td) =>
                                                                    td.label !=
                                                                    label
                                                            )
                                                    )
                                                }
                                            >
                                                <DeleteButton
                                                    width={30}
                                                    height={30}
                                                    fill={colours.text}
                                                ></DeleteButton>
                                            </TouchableOpacity>

                                            {/* Submit */}
                                            <TouchableOpacity
                                                onPress={() => {
                                                    if (!(newName === "")) {
                                                        setTodoData(
                                                            (currentTodos) =>
                                                                currentTodos.map(
                                                                    (todo) =>
                                                                        todo.id ===
                                                                        id
                                                                            ? {
                                                                                  ...todo,
                                                                                  label: newName,
                                                                              }
                                                                            : todo
                                                                )
                                                        );
                                                        setTodoData(
                                                            (currentTodos) =>
                                                                currentTodos.map(
                                                                    (todo) =>
                                                                        todo.id ===
                                                                        id
                                                                            ? {
                                                                                  ...todo,
                                                                                  description:
                                                                                      newDescription,
                                                                              }
                                                                            : todo
                                                                )
                                                        );
                                                    }
                                                    setOptionMenuOpen(false);
                                                }}
                                                style={{
                                                    ...globalStyle.buttonContainer,
                                                    backgroundColor:
                                                        "transparent",
                                                    borderWidth: 1,
                                                    borderColor: colours.text,
                                                    width: 120,
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        ...globalStyle.buttonText,
                                                    }}
                                                >
                                                    Save/Cancel
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </LinearGradient>
                            </View>
                        </LinearGradient>
                    </View>
                </Modal>
            </View>
        </View>
    );
};
