import { useEffect, useState } from "react";
import { Button, Pressable, Text, View } from "react-native";
import { Todo } from "./Todo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DraggableFlatList, {
    RenderItemParams,
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

    const [reorderState, setReorderState] = useState<boolean>(false);

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

    // reorder state is back to false once new day is opened
    useEffect(() => {
        setReorderState(false);
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
    const renderItem = ({
        item,
        drag,
        isActive,
    }: RenderItemParams<TodoType>) => {
        return (
            <Pressable
                style={{
                    height: 80,
                    backgroundColor: isActive ? "#ddd" : "white",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                onLongPress={drag}
            >
                <Text>{item.label}</Text>
                <Text>{item.description.length > 10 ? item.description.substring(0, 10) + "..." : item.description}</Text>
            </Pressable>
        );
    };

    return (
        <View style={{ display: "flex", flexDirection: "column", gap: 10, paddingLeft: 50}}>
            {!reorderState ? (
                <View>
                    {todoData.map((t) => {
                        return (
                            <Todo
                                key={t.id}
                                id={t.id}
                                label={t.label}
                                description={t.description}
                                completed={t.completed}
                                setTodoData={setTodoData}
                            />
                        );
                    })}
                </View>
            ) : (
                    <DraggableFlatList
                        data={todoData}
                        renderItem={renderItem}
                        keyExtractor={(td) => td.id.toString()}
                        onDragEnd={({data}) => setTodoData(data)}
                        
                        containerStyle={{height:400}}
                    />

            )}

            {todoData.length > 1 ? (
                <Button
                    title={reorderState ? "Stop Reorder" : "Reorder"}
                    onPress={() => setReorderState(!reorderState)}
                ></Button>
            ) : null}
        </View>
    );
};
