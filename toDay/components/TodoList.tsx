import { useEffect, useRef, useState } from "react";
import { Button, Pressable, Text, View } from "react-native";
import { Todo } from "./Todo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DraggableFlatList, {
    RenderItemParams,
} from "react-native-draggable-flatlist";
import { ScrollView } from "react-native-gesture-handler";

export type TodoType = {
    id: number;
    label: string;
    description: string;
    completed: boolean;
};

export type TodoListProps = {
    date: string;
    todoData: TodoType[];
    setTodoData: React.Dispatch<React.SetStateAction<TodoType[]>>;
};

export const TodoList: React.FC<TodoListProps> = ({
    date,
    todoData,
    setTodoData,
}) => {
    // format: [{ "id": 1, "label": "todo today tada", "completed": false }]

    // setting todoData to their value once app opens
    useEffect(() => {
        const getData = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem(date);
                setTodoData([]);

                // make object format into array format
                console.log(
                    date + " data: ",
                    JSON.parse(jsonValue == null ? "[]" : jsonValue)
                );
                if (jsonValue != null) {
                    setTodoData(JSON.parse(jsonValue) as TodoType[]);
                }
            } catch (e) {
                console.error(e);
            }
        };
        getData();
    }, [date]);

    // store todoData every change
    useEffect(() => {
        const storeData = async () => {
            // store todoData at date
            try {
                const jsonValue = JSON.stringify(todoData);
                await AsyncStorage.setItem(date, jsonValue);
            } catch (e) {
                console.error(e);
            }

            // testing to see if it was stored
            // const getData = async () => {
            // 	try {
            // 	  const jsonValue = await AsyncStorage.getItem('20/12/2024');
            // 	  console.log(jsonValue != null ? JSON.parse(jsonValue) : null);
            // 	} catch (e) {
            // 		console.error(e);
            // 	}
            // };
            // getData();
        };
        storeData();
    }, [todoData]);
    



    // dragging functionality
    const renderItem = ({ item, drag }: RenderItemParams<TodoType>) => {
        return (
            <Pressable
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                }}
                onLongPress={drag}
            >
                <Todo
                    key={item.id}
                    id={item.id}
                    label={item.label}
                    description={item.description}
                    completed={item.completed}
                    setTodoData={setTodoData}
                />
            </Pressable>
        );
    };

    return (
        <View
            style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                alignItems: "center",
                width: 400,
            }}
        >
            <View>
                <DraggableFlatList
                    data={todoData}
                    renderItem={renderItem}
                    keyExtractor={(td) => td.id.toString()}
                    onDragEnd={({ data }) => setTodoData(data)}
                    containerStyle={{ maxHeight: 200 }}
                />

            </View>
        </View>
    );
};
