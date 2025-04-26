import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Pressable, Text, TouchableOpacity, View } from "react-native";
import { Todo } from "./Todo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    RenderItemParams,
    ScaleDecorator,
} from "react-native-draggable-flatlist";
import DragList, { DragListRenderItemInfo } from "react-native-draglist" 

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
    const renderItem = useCallback(
        ({ item, onDragEnd, onDragStart }: DragListRenderItemInfo<TodoType>) => {
            
            return (
                    <ScaleDecorator>
                        <Pressable
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            onPressIn={onDragStart}
                            onPressOut={onDragEnd}
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
                    </ScaleDecorator>
            );
        },
        []
    );

    const onReordered = (fromIndex: number, toIndex: number) => {
        const copy = [...todoData]; // Don't modify react data in-place
        const removed = copy.splice(fromIndex, 1);
    
        copy.splice(toIndex, 0, removed[0]); // Now insert at the new pos
        setTodoData(copy);
    }

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
            }}
        >
            <View>
                <DragList
                    data={todoData}
                    renderItem={renderItem}
                    keyExtractor={(td) => td.id.toString()}
                    onReordered={onReordered}
                    containerStyle={{ maxHeight: 200 }}
                />
            </View>
        </View>
    );
};
