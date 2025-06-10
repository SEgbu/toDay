import { Todo } from "./Todo";

import { useCallback, useEffect } from "react";
import { ListRenderItemInfo, View } from "react-native";
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
    // once day is selected, set associated todos
    useEffect(() => {
        const getData = async () => {
            try {
                setTodoData([]);

                const jsonValue = await AsyncStorage.getItem(date);

                // set to todoData
                if (jsonValue != null) {
                    setTodoData(JSON.parse(jsonValue) as TodoType[]);
                }
                console.log(
                    date + " data: ",
                    JSON.parse(jsonValue == null ? "[]" : jsonValue)
                );
            } catch (err : any) {
                throw new Error("Todolist error, issue with getting todoData: " + err);
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
            } catch (err : any) {
                throw new Error("Todolist error, issue with updating todos on change: "+ err);
            }

            // testing to see if it was stored
            // const getData = async () => {
            // 	try {
            // 	  const jsonValue = await AsyncStorage.getItem(date);
            // 	  console.log(jsonValue != null ? JSON.parse(jsonValue) : null);
            // 	} catch (err : any) {
            // 		throw new Error("Todolist testing error, issue with checking todo change: "+ err);
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

    return (
        <View
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: 400,
                height: todoData.length == 0 ? 0 : todoData.length * 30 + 200,
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
