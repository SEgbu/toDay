import { TodoType } from "@/components/TodoList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export const useTodoData = () => {
    

    const [storage, setStorage] = useState<{[key:string] : TodoType[]}>({});

    AsyncStorage.getAllKeys().then((keyArray) => {
        AsyncStorage.multiGet(keyArray).then((keyValArray) => {
            let myStorage: any = {};
            for (let keyVal of keyValArray) {
                myStorage[keyVal[0]] = JSON.parse(keyVal[1] ? keyVal[1] : "")
            }
    
            setStorage(myStorage);
        })
    });

    return storage;
}