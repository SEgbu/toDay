import { TodoType } from "./TodoList";

import { Button, Modal, Pressable, Text, TextInput, View } from "react-native";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import { useReorderableDrag } from "react-native-reorderable-list";

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
                    paddingBottom: 20
                }}
            >
                {/* Drag area */}
                <Pressable
                    onPressIn={() => {
                        drag();
                    }}
                    style={{
                        backgroundColor: "grey",
                        height: 30,
                    }}
                >
                    <Text>Drag</Text>
                </Pressable>
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
                ></Checkbox>

                {/* Strikethrough todo label if todo have been checked */}
                <View
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: 100,
                        gap: (description != "" && description != undefined) ? 5 : 0
                    }}
                >
                    {/* Label (add "..." if they're too long) */}
                    <Text
                        style={{
                            textDecorationLine: completed
                                ? "line-through"
                                : "none",
                        }}
                        onPress={() => setSeeMore(!seeMore)}
                    >
                        {label != "" && label != undefined
                            ? label.length > 40 && !seeMore
                                ? label.substring(0, 40) + "..."
                                : label
                            : null}
                    </Text>
                    {/* Description (add "..." if they're too long) */}
                    <Text
                        style={{
                            textDecorationLine: completed
                                ? "line-through"
                                : "none",
                            display: (description != "" && description != undefined) ? "block" : "none"
                        }}
                        onPress={() => setSeeMore(!seeMore)}
                    >
                        {description != "" && description != undefined
                            ? description.length > 8 && !seeMore
                                ? "Description: " + description.substring(0, 8) + "..."
                                : "Description: " + description
                            : null}
                    </Text>
                </View>

                {/* Options Buttons */}
                <Button
                    title="Options"
                    onPress={() => {
                        setOptionMenuOpen(true);
                        setNewName(label);
                        setNewDescription(description);
                    }}
                ></Button>
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
                            }}
                        >
                            <Text style={{ fontWeight: "800", fontSize: 20 }}>
                                Options {"\n"}
                            </Text>

                            {/* Update Inputs */}
                            <Text>Enter New Name: </Text>
                            <TextInput
                                value={newName}
                                onChangeText={setNewName}
                            ></TextInput>
                            <Text>{"\n"}</Text>

                            <Text>Change/Add a description: </Text>
                            <TextInput
                                value={newDescription}
                                onChangeText={setNewDescription}
                            ></TextInput>
                            <Text>{"\n"}</Text>

                            <View
                                style={{
                                    display: "flex",
                                    gap: 10,
                                }}
                            >
                                {/* Submit */}
                                <Button
                                    title="Submit"
                                    onPress={() => {
                                        setTodoData((currentTodos) =>
                                            currentTodos.map((todo) =>
                                                todo.id === id
                                                    ? {
                                                          ...todo,
                                                          label: newName,
                                                      }
                                                    : todo
                                            )
                                        );
                                        setTodoData((currentTodos) =>
                                            currentTodos.map((todo) =>
                                                todo.id === id
                                                    ? {
                                                          ...todo,
                                                          description:
                                                              newDescription,
                                                      }
                                                    : todo
                                            )
                                        );
                                        setOptionMenuOpen(false);
                                    }}
                                />

                                <View
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    {/* Delete */}
                                    <Button
                                        title="Delete"
                                        onPress={() =>
                                            setTodoData((currentTodos) =>
                                                currentTodos.filter(
                                                    (td) => td.label != label
                                                )
                                            )
                                        }
                                    ></Button>
                                    {/* Close */}
                                    <Button
                                        title="Close"
                                        onPress={() => setOptionMenuOpen(false)}
                                    ></Button>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
};
