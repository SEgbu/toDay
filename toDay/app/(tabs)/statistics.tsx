import { TodoType } from "@/components/TodoList";
import { useLogAsyncStorage } from "@/hooks/useLogAsyncStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function StatisticsPage() {        
        const [todoDataBase, setTodoDataBase] = useState<any>({});
        
        
        // Get Entire TodoData
        useEffect(() => {
            const getTodoDatabase = async () => {
                const keys = await AsyncStorage.getAllKeys();
                const keyValArray = await AsyncStorage.multiGet(keys);
                const finalStorage: any = {};
                
                keyValArray.forEach(([key, value]) => {
                    finalStorage[key] = value;
                });
                
                setTodoDataBase(finalStorage);
            }
            getTodoDatabase();
        }, []);
        
        console.log(todoDataBase);
        
        return (
            <View>
            <Text>Statistics</Text>
            {/* Highscore of consecutive days, Purpose: High Score of streaks */}
            <Text>Streaks: {todoDataBase["2025-04-15"]}</Text>
        </View>
    );
}
