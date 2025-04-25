import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Pressable, Text, TouchableOpacity, View } from "react-native";
import { Todo } from "./Todo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DraggableFlatList, {
    RenderItemParams,
    ScaleDecorator,
} from "react-native-draggable-flatlist";

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
        ({ item, drag }: RenderItemParams<TodoType>) => {
            
            return (
                    <ScaleDecorator>
                        <Pressable
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            onLongPress={() => {
                                drag()
                            }}
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
                <DraggableFlatList
                    data={todoData}
                    renderItem={renderItem}
                    keyExtractor={(td) => td.id.toString()}
                    onDragEnd={({ data, }) => updateTodosOnDragEnd(data)}
                    containerStyle={{ maxHeight: 200 }}
                    autoscrollThreshold={30}
                    animationConfig={{
                        duration: 1000,
                        dampingRatio: 0.5,
                    }}
                />
            </View>
        </View>
    );
};
