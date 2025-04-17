import { Button, Modal, Pressable, Text, TextInput, View } from "react-native";
import Checkbox from "expo-checkbox";
import { useRef, useState } from "react";
import { TodoType } from "./TodoList";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

    return (
        <View style={{ width: 300, flexDirection: "row", gap: 20, alignItems: "center", justifyContent: "space-around" }}>
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
                    {label}
                    {"\n"}
                    {description != "" && description != undefined
                        ? description.length > 8 && !seeMore
                            ? description.substring(0, 8) + "..."
                            : description
                        : null}
                </Text>

            {/* Option menu button */}
            <Button
                title={!isThreeDotOpen ? "Options" : "Close"}
                onPress={() => setThreeDotOpen(!isThreeDotOpen)}
            />

            {/* Option Menu */}
            {isThreeDotOpen ? (
                <View style={{maxWidth: 100}}>
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
                    <Modal visible={isRenameModalOpen}>
                        <Text>Enter New Name: </Text>
                        <TextInput
                            value={newName}
                            onChangeText={setNewName}
                        ></TextInput>
                        <Text>Change/Add a description: </Text>
                        <TextInput
                            value={newDescription}
                            onChangeText={setNewDescription}
                        ></TextInput>
                        <Button
                            title="Submit"
                            onPress={() => {
                                setTodoData((currentTodos) =>
                                    currentTodos.map((todo) =>
                                        todo.id === id
                                            ? { ...todo, label: newName }
                                            : todo
                                    )
                                );
                                setTodoData((currentTodos) =>
                                    currentTodos.map((todo) =>
                                        todo.id === id
                                            ? {
                                                  ...todo,
                                                  description: newDescription,
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
                    </Modal>
                </View>
            ) : null}
        </View>
    );
};
