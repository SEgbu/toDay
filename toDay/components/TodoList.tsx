import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Button, ListRenderItemInfo, Pressable, Text, TouchableOpacity, View } from "react-native";
import { Todo } from "./Todo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ReorderableList, { ReorderableListReorderEvent, reorderItems } from "react-native-reorderable-list";


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
    // setting todoData to their value once app opens or switching date
    useEffect(() => {
        const getData = async () => {
            try {

                setTodoData([]);
                const jsonValue = await AsyncStorage.getItem(date);

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

    const handleReorder = ({from, to}: ReorderableListReorderEvent) => {
        setTodoData(value => reorderItems(value, from, to));
    };   

    // dragging functionality
    const renderItem = useCallback(
        ({ item }: ListRenderItemInfo<TodoType>) => {
            
            return (
                <Todo
                    key={item.id}
                    id={item.id}
                    label={item.label}
                    description={item.description}
                    completed={item.completed}
                    setTodoData={setTodoData}
                />
            );
        },
        []
    );

    const updateTodosOnDragEnd = (data : TodoType[]) => {
        setTodoData(data);
    }

    return (
        <View
            style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                alignItems: "center",
                width: 400,
                height: todoData.length == 0 ? 0 : todoData.length * 30 + 100,
                maxHeight: 200 
            }}
        >
            <View>
                <ReorderableList
                    data={todoData}
                    renderItem={renderItem}
                    keyExtractor={(td : TodoType) => td.id.toString()}
                    onReorder={handleReorder}
                    autoscrollThreshold={30}

                />
            </View>
        </View>
    );
};
