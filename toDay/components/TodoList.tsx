import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Todo } from "./Todo";
import AsyncStorage from '@react-native-async-storage/async-storage';

export type TodoType = {
    id: number;
    label: string;
    completed: boolean;
};

export const TodoList: React.FC = () => {
    // get all todos as a single object
    // on todo change, change the object state
    const [todoData, setTodoData] = useState<TodoType[]>([
        { id: 1, label: "todo today tada", completed: false },
        { id: 2, label: "todee, toduu", completed: false },
    ]);

    // logging todoData
    // useEffect(() => {
    // console.log(todoData);
    // }, [todoData])

	// setting todoData to their value once app opens
	useEffect(() => {
		const getData = async () => {
			try {
				const jsonValue = await AsyncStorage.getItem('20/12/2024');
				
				// make object format into array format
				if (jsonValue != null){
					const oldTodoData = Object.entries<TodoType>(JSON.parse(jsonValue)).map((e) => ({id: parseInt(e[0]) as number, label: e[1]["label"] as string, completed: e[1]["completed"]}));
					console.log(oldTodoData);
					setTodoData(oldTodoData as (TodoType[]))
					
				}

			} catch (e) {
				console.error(e);
			}
		};
		getData();
	}, [])

	// store todoData every change 
	useEffect(() => {
		let JSONTodoData : any = {};

		// make the array format to a object format
		todoData.map((t) => {
			JSONTodoData[t.id.toString()] = {label: t.label, completed: t.completed} 
		})

		const storeData = async () => {
			// store todoData at date
			try {
				const jsonValue = JSON.stringify(JSONTodoData);
				await AsyncStorage.setItem("20/12/2024", jsonValue); 
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
		}
		storeData();
	}, [todoData])

    return (
        <View style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {todoData.map((t) => {
                return (
                    <Todo
                        key={t.id}
                        id={t.id}
                        label={t.label}
                        completed={t.completed}
                        setTodoData={setTodoData}
                    />
                );
            })}
        </View>
    );
};
