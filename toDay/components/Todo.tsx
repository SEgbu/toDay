import { Button, Modal, Pressable, Text, View } from "react-native";
import Checkbox from "expo-checkbox";
import { useState } from "react";
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

            {isThreeDotOpen ? (
                <View>
                    <Button title="Delete" onPress={() => setTodoData(currentTodos => currentTodos.filter(td => td.label != label))}></Button>
                    <Button title="Rename" onPress={() => setRenameModalOpen(true)}></Button>
                    <Modal
                        visible={isRenameModalOpen}

                    >
                        <Text>Rename Modal</Text>
                        <Button title="Close" onPress={() => setRenameModalOpen(false)}></Button>
                    </Modal>
                </View>
            ) : null}
        </View>
    );
};
