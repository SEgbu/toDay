import { Button, Modal, Pressable, Text, TextInput, View } from "react-native";
import Checkbox from "expo-checkbox";
import { useRef, useState } from "react";
import { TodoType } from "./TodoList";
import { useLogAsyncStorage } from "@/hooks/useLogAsyncStorage";

type TodoProps = {
    id: number;
    label: string;
    completed: boolean;
    setTodoData: React.Dispatch<React.SetStateAction<TodoType[]>>;
};

export const Todo: React.FC<TodoProps> = ({
    label,
    completed,
    setTodoData,
    id,
}) => {
    const [isThreeDotOpen, setThreeDotOpen] = useState<boolean>(false);
    const [isRenameModalOpen, setRenameModalOpen] = useState<boolean>(false);
    const [newName, setNewName] = useState<string>("");

    return (
        <View style={{ flexDirection: "row", gap: 10 }}>
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
                }}
            >
                {label}
            </Text>

            {/* Three dot menu */}
            <Button
                title="Options"
                onPress={() => setThreeDotOpen(!isThreeDotOpen)}
            />

            {/* Three Dot Menu */}
            {isThreeDotOpen ? (
                <View>
                    <Button title="Delete" onPress={() => setTodoData(currentTodos => currentTodos.filter(td => td.label != label))}></Button>
                    <Button title="Rename" onPress={() => {
                        setRenameModalOpen(true)
                        setNewName(label)
                    }}></Button>
                    
                    {/* Rename Modal */}
                    <Modal
                        visible={isRenameModalOpen}
                    >
                        <Text>Enter New Name: </Text>
                        <TextInput value={newName} onChangeText={setNewName}></TextInput>
                        <Button title="Submit" onPress={() => {
                            setTodoData(currentTodos => currentTodos.map(todo => todo.id === id ? {...todo, label: newName} : todo))
                            setRenameModalOpen(false);
                        }}/>
                        <Button title="Close" onPress={() => setRenameModalOpen(false)}></Button>
                    </Modal>
                </View>
            ) : null}
        </View>
    );
};
