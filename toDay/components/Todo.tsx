import { Pressable, Text, View } from "react-native";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import { TodoType } from "./TodoList";

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
      <Text style={{ textDecorationLine: completed ? "line-through" : "none" }}>
        {label}
      </Text>
    </View>
  );
};
