import { Button, Modal, Pressable, Text, TextInput, View } from "react-native";
import Checkbox from "expo-checkbox";
import { useEffect, useRef, useState } from "react";
import { TodoType } from "./TodoList";
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
    const [isThreeDotOpen, setThreeDotOpen] = useState<boolean>(false);
    const [isRenameModalOpen, setRenameModalOpen] = useState<boolean>(false);
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
        <View
            style={{
                minWidth: 300,
                flexDirection: "row",
                gap: 20,
                alignItems: "center",
                justifyContent: "space-around",
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
            {/* Toggle todos and update todo data */}
            <Checkbox
                value={completed}
                onValueChange={() => {
                    setTodoData((currentTodos) =>
                        currentTodos.map((t) =>
                            t.id === id ? { ...t, completed: !t.completed } : t
                        )
                    );
                }}
            ></Checkbox>
            {/* Strikethrough todo label if todo have been checked */}
            <Text
                style={{
                    textDecorationLine: completed ? "line-through" : "none",
                    maxWidth: 100,
                }}
                onPress={() => setSeeMore(!seeMore)}
            >
                {label != "" && label != undefined
                    ? label.length > 8 && !seeMore
                        ? label.substring(0, 8) + "..."
                        : label
                    : null}

                {description != "" && description != undefined
                    ? description.length > 8 && !seeMore
                        ?  "\n"+description.substring(0, 8) + "..."
                        : "\n \n"+description
                    : null}
            </Text>

            {/* Option menu button */}
            <Button
                title={!isThreeDotOpen ? "Options" : "Close"}
                onPress={() => setThreeDotOpen(!isThreeDotOpen)}
            />

            {/* Option Menu */}
            {isThreeDotOpen ? (
                <View style={{ maxWidth: 100 }}>
                    <Button
                        title="Delete"
                        onPress={() =>
                            setTodoData((currentTodos) =>
                                currentTodos.filter((td) => td.label != label)
                            )
                        }
                    ></Button>
                    <Button
                        title="Rename"
                        onPress={() => {
                            setRenameModalOpen(true);
                            setNewName(label);
                            setNewDescription(description);
                        }}
                    ></Button>

                    {/* Rename Modal */}
                    <Modal
                        visible={isRenameModalOpen}
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
                                    padding: 30,
                                }}
                            >
                                <Text style={{fontWeight: "800", fontSize: 20}}>Rename Todo: {"\n"}</Text>

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
                                        setRenameModalOpen(false);
                                    }}
                                />
                                <Button
                                    title="Close"
                                    onPress={() => setRenameModalOpen(false)}
                                ></Button>
                            </View>
                        </View>
                    </Modal>
                </View>
            ) : null}
        </View>
    );
};
